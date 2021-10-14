<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css">
    <title>Welcome</title>
</head>
<body>
    <section class="account">
        <div class="account-create">
            <h1>CREATE ACCOUNT</h1>
            <p>Enter your new details below</p>
            <form action="includes/get-sign-up.inc.php" method="post">
                <input type="email" name="email" placeholder="E-Mail">
                <input type="text" name="username" placeholder="Username">
                <input type="password" name="password" placeholder="Password">
                <input type="password" name="password_confirm" placeholder="Confirm password">
                <br>
                <button type="submit" name="submit">CREATE ACCOUNT</button>
            </form>
        </div>
        <div class="account-login">
            <h1>LOG IN</h1>
            <p>Log into an existing account</p>
            <form action="includes/get-login.inc.php" method="post">
                <input type="text" name="username" placeholder="Username">
                <input type="password" name="password" placeholder="Password">
                <br>
                <button type="submit" name="submit">LOG IN</button>
            </form>
        </div>
    </section>
</body>
</html>