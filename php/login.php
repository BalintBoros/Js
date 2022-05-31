<?php
    session_start();
    if (!isset($_SESSION["userid"]) && count($_POST) > 0){
        $un = $_POST["user"];
        $pw = $_POST["password"];
        $users = json_decode(file_get_contents('users.json'), true);
        $match = array_keys(array_filter($users, fn($u) => $u['username'] == $un));
        $id = $match[0] ?? null;
        if ($id !== null){
            if (password_verify($pw, $users[$id]["password"]))
                $_SESSION["userid"] = $id;
            else {
                $_SESSION["loginerror"] = 2;
                header("Location: log.php");
            }
        } else {
            $_SESSION["loginerror"] = 1;
            header("Location: log.php");
        }
        header("Location: log.php");
    }
    
?>