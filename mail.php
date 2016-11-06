<?php
/**
 * This example shows settings to use when sending via Google's Gmail servers.
 */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Europe/Paris');
ini_set('display_errors', 'on');

require 'PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail->Host = 'ssl0.ovh.net';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 465;

//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'ssl';

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "contact@refuge-plan-aiguille.com";

//Password to use for SMTP authentication
$mail->Password = "DEF1878mbt";

//Set who the message is to be sent from
$mail->setFrom($_POST["email"], $_POST["name"]);

//Set an alternative reply-to address
$mail->addReplyTo($_POST["email"], $_POST["name"]);

//Set who the message is to be sent to
$mail->addAddress('claudius74@hotmail.fr', 'Claude Quenot');

$mail->CharSet = 'UTF-8';

//Set the subject line
$mail->Subject = 'Message via contact@refuge-plan-aiguille.com de ' . $_POST["name"] . ' ' . $_POST["email"];

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
//$mail->Body($_POST["message"]);

//Replace the plain text body with one created manually
$mail->Body = $_POST["message"];

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo '<p>Message envoyé, vous allez être redirigé automatiquement. Si vous n\'êtes pas redirigé dans 5 secondes, cliquez <a href="http://refuge-plan-aiguille.com">ici</a></p>';
    echo '<p>Message sent, your are going to be redirected automaticaly. If your browser does not redirect you after 5 seconds, click <a href="http://refuge-plan-aiguille.com/en">here</a></p>';
    header("refresh:5;url=http://refuge-plan-aiguille.com");
}
?>