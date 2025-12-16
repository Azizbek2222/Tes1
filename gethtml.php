<?php
if (!isset($_GET['url'])) {
    http_response_code(400);
    echo "URL yo‘q";
    exit;
}

$url = $_GET['url'];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Android)");
curl_setopt($ch, CURLOPT_TIMEOUT, 20);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$html = curl_exec($ch);

if ($html === false) {
    echo "cURL xato: " . curl_error($ch);
    curl_close($ch);
    exit;
}

curl_close($ch);

header("Content-Type: text/plain; charset=utf-8");
echo $html;