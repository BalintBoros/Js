<?php
    if (isset($_GET['id'])){
        $id = $_GET['id'];
        $comments = json_decode(file_get_contents('comments.json'), true);
        unset($comments[$id]);
        file_put_contents('comments.json', json_encode($comments, JSON_PRETTY_PRINT));
        /*if (isset($comments[$id])){
            unset($comments[$id]);
            file_put_contents('comments.json', json_encode($comments, JSON_PRETTY_PRINT));
        }*/
    }
    header('location: show.php');
?>