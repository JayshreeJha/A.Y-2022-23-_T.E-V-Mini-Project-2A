<?php
$to_email = "mahadiksampada44@gmail.com";
$subject = "for verifying to your account";
$body = "this is test email";
$headers = "From: mahadiksampada120@gmail.com";

if(mail($to_email,$subject,$body,$headers)){
    echo "email suucessfully send to  $to_email..."
}else{
echo "email sending failed"
}
?>


