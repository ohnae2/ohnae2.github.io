<?php
$name = $_POST['sender'];
$sender = $_POST['email'];
$msg = $_POST['message'];
$recipient = "7083620@hanmail.net";
$subject = '
name: ' . $name
. ', email: ' . $email;
mail($recipient, $subject, $msg, $email);
?>