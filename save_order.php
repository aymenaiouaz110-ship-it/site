<?php
// save_order.php
// Endpoint to receive purchase data and insert it into the database

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST is accepted.'
    ]);
    exit;
}

require_once 'db.php';

// Get raw POST input (JSON format)
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true);

if (!$inputData) {
    // Try standard $_POST if JSON decode fails
    $inputData = $_POST;
}

// Extract fields
$customer_name = isset($inputData['name']) ? trim($inputData['name']) : (isset($inputData['fullname']) ? trim($inputData['fullname']) : '');
$phone = isset($inputData['phone']) ? trim($inputData['phone']) : '';
$wilaya = isset($inputData['wilaya']) ? trim($inputData['wilaya']) : '';

// Encode delivery type and payment method in delivery_type column
// Format: deliveryType|paymentMethod|transactionNumber
$deliveryTypeVal = isset($inputData['deliveryType']) ? trim($inputData['deliveryType']) : 'home';
$paymentMethodVal = isset($inputData['paymentMethod']) ? trim($inputData['paymentMethod']) : 'cod';
$transactionNumberVal = isset($inputData['transactionNumber']) ? trim($inputData['transactionNumber']) : '';
$delivery_type = $deliveryTypeVal . '|' . $paymentMethodVal . '|' . $transactionNumberVal;

// Handle product name or serialized items
if (isset($inputData['items']) && is_array($inputData['items'])) {
    $product_name = json_encode($inputData['items'], JSON_UNESCAPED_UNICODE);
} else {
    $product_name = isset($inputData['productName']) ? trim($inputData['productName']) : '';
}

$total_price = isset($inputData['total']) ? intval($inputData['total']) : 0;
$status = isset($inputData['status']) ? trim($inputData['status']) : 'pending';

// Validate required fields
if (empty($customer_name) || empty($phone) || empty($wilaya) || empty($product_name)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed. Required fields are missing.'
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO orders (customer_name, phone, wilaya, delivery_type, product_name, total_price, status) VALUES (:customer_name, :phone, :wilaya, :delivery_type, :product_name, :total_price, :status)");
    
    $stmt->execute([
        ':customer_name' => $customer_name,
        ':phone'         => $phone,
        ':wilaya'        => $wilaya,
        ':delivery_type' => $delivery_type,
        ':product_name'  => $product_name,
        ':total_price'   => $total_price,
        ':status'        => $status
    ]);
    
    $orderId = $pdo->lastInsertId();
    
    echo json_encode([
        'success' => true,
        'message' => 'Order saved successfully.',
        'order_id' => $orderId
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
