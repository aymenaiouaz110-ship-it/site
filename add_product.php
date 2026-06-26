<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 0); // نخبوا الأخطاء العشوائية باش ما نفسدوش الـ JSON

try {
    require_once 'db.php';
    
    // معرفة المتغير المستخدم للاتصال تلقائياً
    $db = null;
    if (isset($pdo)) { $db = $pdo; }
    else if (isset($conn)) { $db = $conn; }
    
    if (!$db) {
        throw new Exception("لم يتم العثور على متغير الاتصال بقاعدة البيانات (\$pdo أو \$conn) في ملف db.php");
    }

    // استقبال البيانات القادمة من الفورميلار
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        throw new Exception("لم يتم استلام أي بيانات من النموذج.");
    }

    // تجهيز المتغيرات بأمان
    $slug = $data['slug'] ?? ($data['id'] ?? '');
    $name = $data['name'] ?? '';
    $size = $data['size'] ?? '';
    $brand = $data['brand'] ?? '';
    $old_price = $data['old_price'] ?? '';
    $current_price = $data['current_price'] ?? '';
    $category = $data['category'] ?? '';
    $tag = $data['tag'] ?? '';
    $rating = $data['rating'] ?? '';
    $image_url = $data['image_url'] ?? '';

    // إذا كان الاتصال بـ PDO (طريقة الـ Agent)
    if (isset($pdo)) {
        $sql = "INSERT INTO products (slug, name, size, brand, old_price, current_price, category, tag, rating, image_url) 
                VALUES (:slug, :name, :size, :brand, :old_price, :current_price, :category, :tag, :rating, :image_url)";
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':slug' => $slug,
            ':name' => $name,
            ':size' => $size,
            ':brand' => $brand,
            ':old_price' => $old_price,
            ':current_price' => $current_price,
            ':category' => $category,
            ':tag' => $tag,
            ':rating' => $rating,
            ':image_url' => $image_url
        ]);
    } 
    // إذا كان الاتصال بـ MySQLi العادي
    else {
        $slug = $db->real_escape_string($slug);
        $name = $db->real_escape_string($name);
        $size = $db->real_escape_string($size);
        $brand = $db->real_escape_string($brand);
        $old_price = $db->real_escape_string($old_price);
        $current_price = $db->real_escape_string($current_price);
        $category = $db->real_escape_string($category);
        $tag = $db->real_escape_string($tag);
        $rating = $db->real_escape_string($rating);
        $image_url = $db->real_escape_string($image_url);

        $sql = "INSERT INTO products (slug, name, size, brand, old_price, current_price, category, tag, rating, image_url) 
                VALUES ('$slug', '$name', '$size', '$brand', '$old_price', '$current_price', '$category', '$tag', '$rating', '$image_url')";
        $db->query($sql);
    }

    // إرجاع جواب النجاح
    echo json_encode(["success" => true, "message" => "تمت إضافة المنتج بنجاح في قاعدة البيانات!"]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "خطأ في السيرفر: " . $e->getMessage()]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "خطأ في قاعدة البيانات (MySQL): " . $e->getMessage()]);
}
?>