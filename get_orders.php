<?php
// get_orders.php
// API endpoint to retrieve all orders for the dashboard

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'db.php';

try {
    // Fetch orders ordered by created_at descending (newest first)
    $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC");
    $rows = $stmt->fetchAll();
    
    $orders = [];
    foreach ($rows as $row) {
        // Parse delivery_type: deliveryType|paymentMethod|transactionNumber
        $delTypeParts = explode('|', $row['delivery_type']);
        $deliveryType = isset($delTypeParts[0]) ? $delTypeParts[0] : 'home';
        $paymentMethod = isset($delTypeParts[1]) ? $delTypeParts[1] : 'cod';
        $transactionNumber = isset($delTypeParts[2]) ? $delTypeParts[2] : '';
        
        // Parse product_name if it is JSON array of items
        $productNameVal = $row['product_name'];
        $items = json_decode($productNameVal, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($items)) {
            // It's a JSON array of items
            $names = [];
            foreach ($items as $item) {
                $names[] = $item['name'];
            }
            $productName = implode(', ', $names);
        } else {
            $items = null;
            $productName = $productNameVal;
        }
        
        // Map status value (ensure English fallback values for frontend selectors)
        $status = $row['status'];
        if ($status === 'قيد المعالجة') $status = 'pending';
        if ($status === 'تم الشحن') $status = 'shipped';
        if ($status === 'تم التوصيل') $status = 'delivered';
        
        $orders[] = [
            'id' => (string)$row['id'],
            'name' => $row['customer_name'],
            'fullname' => $row['customer_name'],
            'phone' => $row['phone'],
            'wilaya' => $row['wilaya'],
            'address' => $deliveryType === 'home' ? '🏠 للمنزل / Domicile' : '🏢 من المكتب / Bureau',
            'deliveryType' => $deliveryType,
            'paymentMethod' => $paymentMethod,
            'isBaridi' => ($paymentMethod === 'baridimob'),
            'transactionNumber' => $transactionNumber,
            'productName' => $productName,
            'items' => $items,
            'total' => intval($row['total_price']),
            'status' => $status,
            'createdAt' => [
                'seconds' => strtotime($row['created_at'])
            ]
        ];
    }
    
    echo json_encode($orders);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
