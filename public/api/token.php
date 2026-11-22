<?php
/**
 * CyberNote - Transparent OAuth Token Relay (Open Source Bridge)
 * 
 * Zero-Knowledge Security Notice:
 * 1. This script ONLY acts as a direct bridge between your browser and Google OAuth servers
 *    to overcome browser CORS restrictions for Google token endpoints.
 * 2. NO user notes, credentials, or encryption keys ever touch or are stored by this script.
 * 3. All notes remain 100% private and stored exclusively in the user's own Google Drive
 *    and local browser IndexedDB.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);
if (!$input) {
    $input = $_POST;
}

$clientId = $input['client_id'] ?? '';
$grantType = $input['grant_type'] ?? '';

if (empty($clientId) || empty($grantType)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters: client_id and grant_type are required.']);
    exit;
}

$postFields = [
    'client_id' => $clientId,
    'grant_type' => $grantType
];

if (!empty($input['client_secret'])) {
    $postFields['client_secret'] = $input['client_secret'];
}

if ($grantType === 'authorization_code') {
    $postFields['code'] = $input['code'] ?? '';
    $postFields['redirect_uri'] = $input['redirect_uri'] ?? 'postmessage';
} else if ($grantType === 'refresh_token') {
    $postFields['refresh_token'] = $input['refresh_token'] ?? '';
}

$ch = curl_init('https://oauth2.googleapis.com/token');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postFields));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode ?: 200);
echo $response;
