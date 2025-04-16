<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../../config/db.php'; // Ajustar si es necesario
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        get();
        break;
    case 'POST':
        post();
        break;
    case 'PUT':
        update();
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
    try {
        $result = $conn->query("SELECT pe.id AS id_pedido, u.nombre AS usuario_pedido, n.logo AS logo_pedido, n.nombre AS nombre_negocio,pe.estado, pe.total, n.usuario_id FROM pedidos pe LEFT JOIN usuarios u ON pe.cliente_id = u.id LEFT JOIN negocios n ON pe.negocio_id = n.id;");
     
        $data = [];
        while ($row = $result->fetch_assoc()) {
            // Convertir la imagen a Base64 si existe
            if (!empty($row['logo_pedido'])) {
                $row['logo_pedido'] = "data:image/jpeg;base64," . base64_encode($row['logo_pedido']);
            } else {
                $row['logo_pedido'] = null; // Si no hay imagen, devuelve null
            }
            $data[] = $row;
        }
    
    
        echo json_encode($data);
    } catch (Exception $e) {
        $error = [
            "error" => $e->getMessage(),
            "linea" => $e->getLine(),
            "archivo" => $e->getFile()
        ];
        http_response_code(500);
        echo json_encode($error);
    }
}
//OK
function post() {
    global $conn;
    
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["cliente_id"], $data["negocio_id"], $data["total"], $data["estado"], $data["productos"]) || !is_array($data["productos"])) {
        echo json_encode(["error" => "Faltan datos o formato incorrecto"]);
        return;
    }

    // Iniciar transacción
    $conn->begin_transaction();

    try {
        // Insertar el pedido
        $stmt = $conn->prepare("INSERT INTO pedidos (cliente_id, negocio_id, domiciliario_id, total, estado) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iiids", $data["cliente_id"], $data["negocio_id"], $data["domiciliario_id"], $data["total"], $data["estado"]);

        if (!$stmt->execute()) {
            throw new Exception("Error al crear el pedido: " . $stmt->error);
        }

        // Obtener el ID del pedido recién creado
        $pedido_id = $conn->insert_id;

        // Insertar los detalles del pedido
        $stmt_detalle = $conn->prepare("INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)");

        foreach ($data["productos"] as $producto) {
            if (!isset($producto["producto_id"], $producto["cantidad"], $producto["precio_unitario"], $producto["subtotal"])) {
                throw new Exception("Datos incompletos en productos: " . json_encode($producto));
            }

            $stmt_detalle->bind_param("iiidd", $pedido_id, $producto["producto_id"], $producto["cantidad"], $producto["precio_unitario"], $producto["subtotal"]);

            if (!$stmt_detalle->execute()) {
                throw new Exception("Error al insertar detalle del pedido: " . $stmt_detalle->error);
            }
        }

        // Confirmar la transacción
        $conn->commit();

        echo json_encode(["message" => "Pedido y detalle insertados correctamente", "pedido_id" => $pedido_id]);
    } catch (Exception $e) {
        // Si algo falla, revertir la transacción
        $conn->rollback();
        echo json_encode(["error" => $e->getMessage()]);
    }
}
//FALTA
function update() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data["id"], $data["nombre"], $data["email"])) {
        echo json_encode(["error" => "Faltan datos"]);
        return;
    }

    $stmt = $conn->prepare("UPDATE empresa SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $data["nombre"], $data["direccion"], $data["telefono"], $data["email"], $data["id"]);
    $stmt->execute();
    echo json_encode(["message" => "Empresa actualizada"]);
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