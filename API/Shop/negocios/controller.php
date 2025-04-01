<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include($_SERVER['DOCUMENT_ROOT'] . '/API/config/db.php');
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
function utf8_encode_array($array) {
    array_walk_recursive($array, function (&$item) {
        if (is_string($item)) {
            $item = utf8_encode($item);
        }
    });
    return $array;
}

function get() {
    global $conn;

    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    $result = $conn->query("SELECT * FROM negocios");
    
    if (!$result) {
        echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
        return;
    }

    $empresas = $result->fetch_all(MYSQLI_ASSOC);
    
    // Convertir a UTF-8
    $empresas = utf8_encode_array($empresas);

    echo json_encode($empresas);
}



?>
