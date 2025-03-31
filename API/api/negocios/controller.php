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
function get() {
    global $conn;
    $result = $conn->query("SELECT n.id as idnegocio, n.nombre AS Negocio, c.nombre AS Categoria,direccion,n.telefono,n.email,n.created_at,u.nombre AS usuario, u.id AS iduser,n.logo AS logo_negocio FROM negocios n JOIN categorias_negocios c ON n.categoria_id = c.id JOIN usuarios u ON usuario_id=u.id;");

    $empresas = [];

    while ($row = $result->fetch_assoc()) {
        // Convertir la imagen a Base64 si existe
        if (!empty($row['logo_negocio'])) {
            $row['logo_negocio'] = "data:image/jpeg;base64," . base64_encode($row['logo_negocio']);
        } else {
            $row['logo_negocio'] = null; // Si no hay imagen, devuelve null
        }
        $empresas[] = $row;
    }

    echo json_encode($empresas);
}
//OK
function post() {
    global $conn;

    // 📌 Verificar si se enviaron todos los datos necesarios
    $usuario_id = $_POST["usuario_id"] ?? null;
    $categoria_id = $_POST["categoria_id"] ?? null;
    $nombre = $_POST["nombre"] ?? null;
    $direccion = $_POST["direccion"] ?? null;
    $telefono = $_POST["telefono"] ?? null;
    $email = $_POST["email"] ?? null;
    $horario_inicial = $_POST["Horario_inicial"] ?? null;
    $horario_final = $_POST["Horario_final"] ?? null;

    // Validación de datos obligatorios
    if (!$usuario_id || !$categoria_id || !$nombre || !$direccion || !$telefono || !$email || !$horario_inicial || !$horario_final) {
        echo json_encode(["error" => "Faltan datos obligatorios"]);
        return;
    }

    // 📂 Validar si se envió una imagen
    if (isset($_FILES["logo"]) && $_FILES["logo"]["error"] === UPLOAD_ERR_OK) {
        $logo = file_get_contents($_FILES["logo"]["tmp_name"]); // Leer imagen binaria
    } else {
        echo json_encode(["error" => "Error al subir la imagen", "file_error" => $_FILES["logo"]["error"] ?? "Archivo no enviado"]);
        return;
    }

    // 🔥 Preparar la consulta SQL
    $stmt = $conn->prepare("INSERT INTO negocios (usuario_id, categoria_id, nombre, direccion, telefono, email, Horario_inicial, Horario_final, logo) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if (!$stmt) {
        echo json_encode(["error" => "Error en la consulta", "mysqli_error" => $conn->error]);
        return;
    }

    // 🔗 Vincular parámetros correctamente
    // 'i' para integer (usuario_id, categoria_id), 's' para string (resto de los campos), 'b' para binario (logo)
    $stmt->bind_param("iisssssss", 
        $usuario_id, 
        $categoria_id, 
        $nombre, 
        $direccion, 
        $telefono, 
        $email, 
        $horario_inicial, 
        $horario_final, 
        $logo
    );

    // 📌 Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode(["message" => "Registro creado con imagen"]);
    } else {
        echo json_encode(["error" => "Error al insertar datos", "mysqli_error" => $stmt->error]);
    }

    $stmt->close();
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
