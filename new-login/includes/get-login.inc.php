<?php

include 'db.inc.php';

if (isset($_POST["submit"])){
    $username = mysqli_real_escape_string($connect, $_POST["username"]);
    $password = mysqli_real_escape_string($connect, $_POST["password"]);

    // retrieve info from database
    $sql = "SELECT password FROM users WHERE username = '$username'";
    $result = mysqli_query($connect, $sql);
    $result_password = mysqli_fetch_assoc($result);
    

    if ($result_password["password"] == $password) {
        header("Location: ../index.php?login=success");
    } else {
        header("Location: ../index.php?login=fail");
    }
}