<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include($_SERVER['DOCUMENT_ROOT'] . '/API/config/db.php');
$request_method = $_SERVER["REQUEST_METHOD"];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($request_method) {
    case 'GET':
        get();
        break;
    case 'POST':
        if ($action === 'update') {
            update();
        } else {
            post();
        }
        break;
    case 'DELETE':
        delete();
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}
//OK
function get() {
    global $conn;
    $result = $conn->query("SELECT n.nombre AS Negocio, t.nombre AS Tipo,
                    p.nombre AS nombre_producto,
                    p.descripcion AS descripcion_productos,
                    p.id AS id_producto,
                    p.negocio_id AS id_negocio,
                    p.precio AS precio_producto,
                    p.stock AS stock_producto,
                    p.created_at AS fecha_producto
                    FROM productos p
                    JOIN negocios n ON p.negocio_id = n.id
                    JOIN tipos_productos t ON p.tipo_id = t.id;");
    $empresas = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($empresas);
}
//OK
function post() {
    global $conn;

    $negocio_id = intval($_POST['negocio_id']);
    $tipo_id = intval($_POST['tipo_id']);
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = floatval($_POST['precio']);
    $stock = intval($_POST['stock']);

    if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
        $img = file_get_contents($_FILES['img']['tmp_name']); // Leer imagen binaria
        
        $stmt = $conn->prepare("INSERT INTO productos (negocio_id, tipo_id, nombre, descripcion, precio, stock, img) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iissdib", $negocio_id, $tipo_id, $nombre, $descripcion, $precio, $stock, $null);
        $stmt->send_long_data(6, $img); // Enviar datos binarios de la imagen

        if ($stmt->execute()) {
            echo json_encode(["success" => "Producto guardado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al guardar el producto", "mysqli_error" => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Error al subir la imagen", "file_error" => $_FILES['img']['error']]);
    }
}


//FALTA

function update() {
    global $conn;

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["error" => "Método no permitido"]);
        return;
    }

    // Verificar que los campos obligatorios están presentes
    if (!isset($_POST['id'], $_POST['nombre'], $_POST['descripcion'], $_POST['precio'], $_POST['stock'])) {
        echo json_encode(["error" => "Faltan datos"]);
        return;
    }

    // Convertir datos a los tipos correctos
    $id = intval($_POST['id']);
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = floatval($_POST['precio']);
    $stock = intval($_POST['stock']);

    // Verificar si el producto existe antes de actualizar
    $stmt = $conn->prepare("SELECT * FROM productos WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $producto = $result->fetch_assoc();

    if (!$producto) {
        echo json_encode(["error" => "El producto con ID $id no existe"]);
        return;
    }

    // Comenzar actualización de datos
    if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
        $img = file_get_contents($_FILES['img']['tmp_name']);

        $stmt = $conn->prepare("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, img = ? WHERE id = ?");
        $stmt->bind_param("ssdibi", $nombre, $descripcion, $precio, $stock, $img, $id);
    } else {
        $stmt = $conn->prepare("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?");
        $stmt->bind_param("ssdii", $nombre, $descripcion, $precio, $stock, $id);
    }

    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode(["message" => "Producto actualizado correctamente"]);
    } else {
        echo json_encode(["warning" => "No se realizaron cambios"]);
    }
}





//FALTA
function delete() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("DELETE FROM empresa WHERE id = ?");
    $stmt->bind_param("i", $data["id"]);
    $stmt->execute();
    echo json_encode(["message" => "Empresa eliminada"]);
}
?>
