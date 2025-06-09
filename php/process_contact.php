<?php
// Enable detailed error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set up error logging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

// Set JSON content type
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['status' => 'error', 'message' => 'Method not allowed']));
}

try {
    // Log the incoming request
    error_log("Received form submission: " . print_r($_POST, true));

    // Get POST data
    $data = $_POST;
    
    if (empty($data)) {
        throw new Exception('No data received');
    }

    // Validate required fields
    $requiredFields = ['name', 'email', 'message'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            throw new Exception("$field is required");
        }
    }

    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }

    // Check if Composer autoload exists
    $autoloadPath = __DIR__ . '/../vendor/autoload.php';
    if (!file_exists($autoloadPath)) {
        throw new Exception('Composer dependencies not installed. Please run composer install.');
    }

    // Include Composer autoload
    require $autoloadPath;

    // Create the Transport with Zoho SMTP settings
    $transport = (new Swift_SmtpTransport('smtp.zoho.com', 465, 'ssl'))
        ->setUsername('booking@privecleaning.com')  // Your Zoho email
        ->setPassword('crmrSMybx9qd')  // Your Zoho password
        ->setStreamOptions([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ]);

    // Test the connection with detailed error logging
    try {
        $transport->start();
    } catch (Swift_TransportException $e) {
        error_log("SMTP Connection Error: " . $e->getMessage());
        throw new Exception('Failed to connect to email server. Please try again later.');
    }

    // Create the Mailer
    $mailer = new Swift_Mailer($transport);

    // Create message for business
    $businessMessage = (new Swift_Message())
        ->setSubject('New Website Inquiry from ' . $data['name'])
        ->setFrom(['booking@privecleaning.com' => 'CodeX Safari'])
        ->setTo(['booking@privecleaning.com'])  // Your business email
        ->setReplyTo([$data['email'] => $data['name']])
        ->setBody(
            "Name: " . $data['name'] . "\n" .
            "Email: " . $data['email'] . "\n" .
            "Company: " . ($data['company'] ?? 'Not provided') . "\n" .
            "Service: " . ($data['service'] ?? 'Not specified') . "\n" .
            "Message: " . $data['message'],
            'text/plain'
        );

    // Create confirmation message for client
    $clientMessage = (new Swift_Message())
        ->setSubject('Thank You for Contacting CodeX Safari')
        ->setFrom(['booking@privecleaning.com' => 'CodeX Safari'])
        ->setTo([$data['email'] => $data['name']])
        ->setBody(
            "Dear " . $data['name'] . ",\n\n" .
            "Thank you for contacting CodeX Safari. We have received your inquiry and our team will get back to you shortly.\n\n" .
            "Here's a summary of your request:\n" .
            "Service Type: " . ($data['service'] ?? 'Not specified') . "\n" .
            "Company: " . ($data['company'] ?? 'Not provided') . "\n" .
            "Message: " . $data['message'] . "\n\n" .
            "Best regards,\n" .
            "CodeX Safari Team",
            'text/plain'
        );

    // Send both messages
    try {
        $businessResult = $mailer->send($businessMessage);
        $clientResult = $mailer->send($clientMessage);
        
        if (!$businessResult || !$clientResult) {
            throw new Exception('Failed to send one or more emails');
        }
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Thank you for your message. We will get back to you shortly!'
        ]);
        
    } catch (Exception $e) {
        error_log("Email Sending Error: " . $e->getMessage());
        throw new Exception('Failed to send email. Please try again later.');
    }

} catch (Exception $e) {
    error_log("Form Processing Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} 