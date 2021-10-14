<?php
include 'db.inc.php';

if (isset($_POST["submit"])) {
    // get info, make sure injections aren't possible
    $email = mysqli_real_escape_string($connect, $_POST["email"]);
    $username = mysqli_real_escape_string($connect, $_POST["username"]);
    $password = mysqli_real_escape_string($connect, $_POST["password"]);
    $password_confirm = mysqli_real_escape_string($connect, $_POST["password_confirm"]);
    
    // send info to database
    $query = "INSERT INTO users (username, password, email) VALUES ('$username', '$password', '$email');"; 
    mysqli_query($connect, $query);

    //notify success
    header("Location: ../index.php?signup=success");
    
} else {
    header("Location: ../index.php?signup=error");
}