<?php
    $randId = uniqid();
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';

    $passwordOne = $_POST['passwordOne'] ?? '';
    $passwordTwo = $_POST['passwordTwo'] ?? '';
    $isAdmin = false;

    $users = json_decode(file_get_contents('users.json'), true);

    if (count($_POST) > 0){
        $errors = [];

        if (trim($username) === '')
            $errors['username'] = 'Felhasználónév megadása kötelező!';

        if (trim($email) === '')
            $errors['email'] = 'E-mail cím megadása kötelező!';
        else if (!filter_var($email, FILTER_VALIDATE_EMAIL))
            $errors['email'] = 'Érvényes e-mail címed adj meg!';

        if(trim($passwordOne) === '')
            $errors['passwordOne'] = 'Kötelező a jelszó megadása';

        if($passwordOne != $passwordTwo)
            $errors['passwordTwo'] = 'A két jelszó nem egyezik meg!';


        $password = password_hash($passwordOne, PASSWORD_DEFAULT);
        $errors = array_map(fn($e) => "<span style='color: red'>$e</span>", $errors);

        if (count($errors) == 0){
            $users[$randId] = [
                'id'        =>  $randId,
                'username'  =>  $username,
                'email'     =>  $email,
                'password'  =>  $password,
                'isAdmin'   =>  $isAdmin
            ];            
        }
        file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));
        
    }


     /*
     "id" : "userid2",
     "username" : "Jozsika",
     "email" : "email2@gmail.com",
     "password" : "abc123",
     "isAdmin" : false*/
?>


<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regisztráció</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Secular+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body>
<h1>Regisztráció</h1>
<?php if (count($_POST) > 0 && count($errors) == 0): ?>
    <span style="color: green;">Regisztráció sikeres</span><br>
    <a href="index.php">Vissza a kezdőlapra</a>
<?php endif; ?>

<form action="" method="post" novalidate>
        Felhasználónév: <input type="text" name="username" value="<?= $username ?>"> <?= $errors['username'] ?? '' ?> <br>
        E-mail: <input type="text" name="email" value="<?= $email ?>"> <?= $errors['email'] ?? '' ?>  <br>
        Jelszó: <input type="password" name="passwordOne"> <?= $errors['passwordOne'] ?? '' ?> <br>
        Jelszó még egyszer: <input type="password" name="passwordTwo"> <?= $errors['passwordTwo'] ?? '' ?> <br>
        <button class="gomb" type="submit">Regisztráció</button>
    </form>

    
</body>
</html>