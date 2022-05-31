<?php
    session_start();
    $teams = json_decode(file_get_contents('teams.json'), true);
    uasort($teams, function($a, $b){
        return strcmp($a['id'], $b['id']);
    });

    $matches = json_decode(file_get_contents('matches.json'), true);

    function sortFunction( $a, $b ) {
        return strtotime($b["date"]) - strtotime($a["date"]);
    }
    usort($matches, "sortFunction");

    $i = 0;
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
    <?php if (!isset($_SESSION["userid"])): ?>
        <a href="log.php">Bejelentkezés</a>
        <a href="reg.php">Regisztráció</a>
    <?php else: ?>
        <a href="logout.php">Kijelentkezés</a>
    <?php endif; ?> 

    <h1>Üdv az ország No.1 eredményeket közvetítő egyetemi honlapján!</h1>

    <h2>Egyetemi klubjaink:</h2>

    <ul>
        <?php foreach($teams as $r): ?>
            <li><a href="show.php?id=<?= $r['id'] ?>"> <?= $r['name'] ?> </a></li>
        <?php endforeach; ?>
    </ul>
    
    <h2>Legutóbbi mérkőzések:</h2>
    <?php foreach($matches as $match): ?>
         
        <?php
            $today = date("Y-m-d");
            if($today > $match["date"]){
                $i++;
                $home = $match["home"];
                $away = $match["away"];
                $homeId = $home["id"];
                $awayId = $away["id"];
                $r1 = $teams[$homeId];
                $r2 = $teams[$awayId];

                $date = $match["date"];                
            }
            

        ?>
        <?php if($i <= 5 && $today > $match["date"]): ?>
            <?= $r1["name"] ?> <?= $home["score"] ?></span> : <?= $away["score"] ?> <?= $r2["name"]?>  <?=$date?> <br>
        <?php endif; ?>
        
                
    <?php endforeach; ?>
      
</body>
</html>