<?php
    session_start(); // $_SESSION
    $err = "";

    
    if (isset($_SESSION["loginerror"])){
        if ($_SESSION["loginerror"] == 1) $err = "Nem létező felhasználó!";
        if ($_SESSION["loginerror"] == 2) $err = "Helytelen jelszó!";
        unset($_SESSION["loginerror"]);
    }
    if (isset($_SESSION["userid"])){
        $id = $_SESSION['userid'];
        $users = json_decode(file_get_contents('users.json'), true);
        $user = $users[$id] ?? null;
        header("Location: index.php");
    }
       
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Secular+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <h1>Bejelentkezés</h1>
    <form action="login.php" method="post">
        <a href="index.php">Vissza a kezdőlapra</a><br>

        Felhasználó: <input type="text" name="user"><br>
        Jelszó: <input type="password" name="password" ><br>
        <button class="gomb" type="submit">Bejelentkezés</button>
        
    </form>
    <span style="color: red"> <?= $err ?> </span> 


</body>
</html>