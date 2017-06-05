<?php
$msg = '';
if (array_key_exists('email', $_POST)) {
    require './vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

    $mail = new PHPMailer;

    $mail->SMTPDebug = 0;                               // Enable verbose debug output
    $mail->Debugoutput = 'html';

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'ssl0.ovh.net';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'contact@refuge-plan-aiguille.com';                 // SMTP username
    $mail->Password = 'DEF1878mbt';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    $mail->setFrom('from@example.com', 'John Doe');
    $mail->addAddress('claudius74@hotmail.fr', 'Claude Quenot');     // Add a recipient
    if ($mail->addReplyTo($_POST['email'], $_POST['name'])) {
        $mail->CharSet = 'UTF-8';

        $mail->Subject = $_POST['name'] . ' <' . $_POST['email'] . '> a envoyé un message depuis le formulaire de refuge-plan-aiguille.com';
        //Keep it simple - don't use HTML
        $mail->isHTML(false);
        //Build a simple message body
        $mail->Body = $_POST['message'];
        //Send the message, check for errors
        if (!$mail->send()) {
            //The reason for failing to send will be in $mail->ErrorInfo
            //but you shouldn't display errors to users - process the error, log it on your server.
//            $msg = '<p>Désolé, votre message n\'a pas été envoyé, veuillez envoyer votre message directement à mon adresse email ou réessayer plus tard. Vous allez être redirigé automatiquement. Si vous n\'êtes pas redirigé dans 5 secondes, cliquez <a href="http://refuge-plan-aiguille.com">ici</a></p>';
            $msg = '<p>Désolé, nous rencontrons actuellement des soucis avec notre formulaire de contact, veuillez envoyer votre message directement à l\'adresse "claudius74@hotmail.fr". Vous allez être redirigé automatiquement. Si vous n\'êtes pas redirigé dans 5 secondes, cliquez <a href="http://refuge-plan-aiguille.com">ici</a></p>'
                    . '<p>We apologize, we are encountering some problems with the contact form, please send your message to the address "claudius74@hotmail.fr". You will be redirected to the wesite. If you are not redirected within 5 seconds , click <a href = "http://refuge-plan-aiguille.com">here</a></p>';
        } else {
            $msg = '<p>Message envoyé, vous allez être redirigé automatiquement. Si vous n\'êtes pas redirigé dans 5 secondes, cliquez <a href="http://refuge-plan-aiguille.com">ici</a></p>';
        }
    } else {
        $msg = 'Invalid email address, message ignored.';
    }
    echo $msg;
    header("refresh:5;url=http://refuge-plan-aiguille.com");
}