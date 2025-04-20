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
    $result = $conn->query("SELECT * FROM negocios n LEFT JOIN ( SELECT * FROM negocios_imagenes WHERE id_Negocios IN ( SELECT MAX(id_Negocios) FROM negocios_imagenes GROUP BY negocios_id ) ) i ON i.negocios_id = n.id ORDER BY n.id DESC;");

    $empresas = [];

    while ($row = $result->fetch_assoc()) {
        // Convertir la imagen a Base64 si existe
        if (!empty($row['logo'])) {
            $row['logo'] = "data:image/jpeg;base64," . base64_encode($row['logo']);
            $row['img'] = "data:image/jpeg;base64," . base64_encode($row['img']);
        } else {
            $row['logo'] = null; // Si no hay imagen, devuelve nullimg
            $row['img'] = null; // Si no hay imagen, devuelve nullimg
        }
        $empresas[] = $row;
    }

    echo json_encode($empresas);
}

?>
