
<?php
    include('storage.php');
    session_start();
    $users = json_decode(file_get_contents('users.json'), true);

    if (isset($_GET['id'])){
        $id = $_GET['id'];
        $reg = json_decode(file_get_contents('teams.json'), true);
        if (isset($reg[$id])){
            $r = $reg[$id];
        } else header('location: index.php');
    } else header('location: index.php');

    if (isset($_SESSION["userid"])){
        $id = $_SESSION['userid'];
        //$users = json_decode(file_get_contents('users.json'), true);
        $u = $users[$id] ?? null;
        $user = $u;
    }

    $matches = json_decode(file_get_contents('matches.json'), true);
    $teamId = $r['id'];
    $color = "black";
    //$matchStorage = new Storage(new JSonIO('matches.json'));
    $comments = json_decode(file_get_contents('comments.json'), true);
    
     
    
    if (isset($_SESSION["userid"])){
        $author = $u['id']; 
    }
    

    $notes = $_POST['notes'] ?? '';
    $randId = uniqid();
    //$date = $_POST['date'] ?? '';
    $date = date("Y-m-d");
    
        
    if (count($_POST) > 0){
        $errors = [];
        if(trim($notes) === '')
            $errors['notes'] = 'Üresen nem lehet beküldeni!';
        
        $errors = array_map(fn($e) => "<span style='color: red'>$e</span>", $errors);

        if (count($errors) == 0){
            $comments[$randId] = [
                'id'        => $randId,
                'author'    => $author,
                'text'      => $notes,
                'teamid'    => $teamId,
                'date'      => $date
            ];
        }
        
        file_put_contents('comments.json', json_encode($comments, JSON_PRETTY_PRINT));
    }
    
?>


<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adatok</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Secular+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
    
</head>
<body>
    <h1><?= $r['name'] ?> eredményei:</h1> <br>
    
    <?php foreach($matches as $match): ?>
        <?php $home = $match["home"];
            $away = $match["away"];
            $date = $match["date"]?>
        <?php if($home["id"] == $teamId || $away["id"] == $teamId): ?>
            <?php 
                if(($home["id"] == $teamId && $home["score"] > $away["score"]) || ($away["id"] == $teamId && $home["score"] < $away["score"])){
                    $color = "green";
                } else if(($home["id"] == $teamId && $home["score"] == $away["score"]) || ($away["id"] == $teamId && $home["score"] == $away["score"])) {
                    $color = "orange";
                } else if(($home["id"] == $teamId && $home["score"] < $away["score"]) || ($away["id"] == $teamId && $home["score"] > $away["score"])) {
                    $color = "red";
                }
                $homeId = $home["id"];
                $awayId = $away["id"];
                $r1 = $reg[$homeId];
                $r2 = $reg[$awayId];
                
            ?>
            
            <?= $r1["name"] ?> <span style='color: <?=$color?>'><?= $home["score"] ?></span>  : <span style='color: <?=$color?>'><?= $away["score"] ?></span> <?= $r2["name"]?>  <?=$date?> <br>
        <?php endif; ?>
    <?php endforeach; ?>

    <br><b>Kommentek:</b>

    <?php foreach($comments as $comment): ?>
        <?php if($comment['teamid'] == $teamId): ?>
            <?php 
                $nev=$users[$comment['author']];    
            ?>
            <br><?=$nev['username']?>: <br> <?=$comment['text']?> <br>
            <?=$comment['date']?> <br>
            <?php if (isset($_SESSION["userid"])): ?> 
                <?php if($u["isAdmin"]): ?> 
                    <br><a href="delete.php?id=<?= $comment['id'] ?>">Törlés</a> <br>
                <?php endif; ?> 
            <?php endif; ?>  

        <?php endif; ?>
       
    <?php endforeach; ?>  

    <br>
    <?php if (!isset($_SESSION["userid"])): ?> 
      Hozzászólás írásához kérem jelentkezzen be!  
    <?php endif; ?>

    <?php if (isset($_SESSION["userid"])): ?>    
    
    <form action="" method="post" novalidate>
        <textarea name="notes"><?= $notes ?></textarea><?= $errors['notes'] ?? '' ?>
        
        <br><button class="gomb" type="submit">Megjegyzés</button>

    </form>
    <?php endif; ?> 
    
    <a href="index.php">Vissza a kezdőlapra</a>
</body>
</html>