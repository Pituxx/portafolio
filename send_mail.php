<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $subject = trim($_POST["subject"] ?? "");
    $message = trim($_POST["message"] ?? "");

    // Validación básica
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Por favor completa todos los campos."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "El correo electrónico no es válido."]);
        exit;
    }

    // Destinatario
    $to = "cristobal.andradeq5@gmail.com";

    // Asunto según tipo de consulta
    $subject_types = [
        "proyecto" => "[PituxxDEV] Nuevo Proyecto",
        "trabajo" => "[PituxxDEV] Oferta de Trabajo",
        "consulta" => "[PituxxDEV] Consulta",
        "otro" => "[PituxxDEV] Mensaje de Contacto"
    ];
    $email_subject = $subject_types[$subject] ?? "[PituxxDEV] Mensaje de Contacto";

    // Construir el cuerpo del email
    $email_content = "=== NUEVO MENSAJE DE PORTFOLIO ===\n\n";
    $email_content .= "Nombre: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Tipo: $subject\n\n";
    $email_content .= "Mensaje:\n$message\n";
    $email_content .= "\n============================\n";
    $email_content .= "Enviado desde pituxxdev.com";

    // Headers
    $headers = "From: noreply@pituxxdev.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Enviar email
    $sent = mail($to, $email_subject, $email_content, $headers);

    if ($sent) {
        echo json_encode(["success" => true, "message" => "Mensaje enviado correctamente."]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al enviar el mensaje. Intenta más tarde."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}