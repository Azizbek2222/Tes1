<?php
set_time_limit(0); // Scriptni to'xtatmaslik

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $bot_code = $_POST['bot_code'] ?? '';

    if (!empty($bot_code)) {
        // Kiritilgan PHP kodni ishga tushurish
        // xavfsizlik uchun sandbox tavsiya qilinadi, lekin minimal test uchun:
        eval($bot_code);
        echo "Bot ishga tushdi!";
    } else {
        echo "Iltimos, PHP kodini kiriting.";
    }
} else {
    echo "No direct access allowed!";
}