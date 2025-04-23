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
        Update();
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
}
//OK
function get() {
    global $conn;
    try {
        $result = $conn->query("SELECT pe.id AS id_pedido, u.nombre AS usuario_pedido, n.logo AS logo_pedido, n.nombre AS nombre_negocio,pe.estado, pe.total, n.usuario_id FROM pedidos pe LEFT JOIN usuarios u ON pe.cliente_id = u.id LEFT JOIN negocios n ON pe.negocio_id = n.id ORDER BY pe.id DESC");
     
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

        $pedido_id = $conn->insert_id;

        // Insertar productos y descontar stock
        $stmt_detalle = $conn->prepare("INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)");
        $stmt_stock = $conn->prepare("UPDATE productos SET stock = stock - ? WHERE id = ? AND negocio_id = ? AND stock >= ?");

        foreach ($data["productos"] as $producto) {
            if (!isset($producto["producto_id"], $producto["cantidad"], $producto["precio_unitario"], $producto["subtotal"])) {
                throw new Exception("Datos incompletos en productos: " . json_encode($producto));
            }

            // Insertar en detalle_pedidos
            $stmt_detalle->bind_param("iiidd", $pedido_id, $producto["producto_id"], $producto["cantidad"], $producto["precio_unitario"], $producto["subtotal"]);

            if (!$stmt_detalle->execute()) {
                throw new Exception("Error al insertar detalle del pedido: " . $stmt_detalle->error);
            }

            // Descontar stock del producto
            $stmt_stock->bind_param("iiii", $producto["cantidad"], $producto["producto_id"], $data["negocio_id"], $producto["cantidad"]);

            if (!$stmt_stock->execute()) {
                throw new Exception("Error al actualizar el stock: " . $stmt_stock->error);
            }

            if ($stmt_stock->affected_rows === 0) {
                throw new Exception("Stock insuficiente para el producto ID: " . $producto["producto_id"]);
            }
        }

        // Obtener teléfono del usuario asociado al negocio
        $stmt_telefono = $conn->prepare("SELECT u.telefono, u.ApiKey FROM negocios n LEFT JOIN usuarios u ON n.usuario_id = u.id WHERE n.id = ?");
        $stmt_telefono->bind_param("i", $data["negocio_id"]);
        $stmt_telefono->execute();
        $result_telefono = $stmt_telefono->get_result();

        $telefono = null;
        $ApiKey = null;
        if ($row = $result_telefono->fetch_assoc()) {
            $telefono = $row["telefono"];
            $ApiKey = $row["ApiKey"];
        }

        // Confirmar todo
        $conn->commit();

        echo json_encode([
            "message" => "Pedido y detalle insertados correctamente",
            "pedido_id" => $pedido_id,
            "telefono" => $telefono,
            "ApiKey" => $ApiKey
        ]);

    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function Update(){
    global $conn;
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data["estado"], $data["id"])) {
            throw new Exception("Datos incompletos");
        }

        $id = $data["id"];
        $estado = $data["estado"];
        $sql = "UPDATE pedidos SET estado = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $estado,$id);

        if (!$stmt->execute()) {
            throw new Exception("Error al actualizar estado: " . $stmt->error);
        }

        echo json_encode(["message" => "Estado No actualizado"]);
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


/* function post() {
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
} */
?>