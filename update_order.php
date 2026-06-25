<?php
// update_order.php
// Endpoint to update order status in MySQL database

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

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

// Get raw POST input
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true);

if (!$inputData) {
    $inputData = $_POST;
}

$orderId = isset($inputData['orderId']) ? intval($inputData['orderId']) : 0;
$status = isset($inputData['status']) ? trim($inputData['status']) : '';

if (!$orderId || empty($status)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed. orderId and status are required.'
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE orders SET status = :status WHERE id = :id");
    $stmt->execute([
        ':status' => $status,
        ':id' => $orderId
    ]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Order status updated successfully.'
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
