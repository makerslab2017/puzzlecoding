<?php 
// echo '<pre>';
// print_r($_POST);

$filepath= "js/count.json";

$arr= $_POST;
// print_r($arr);
$current= json_encode($arr, false);
// print_r($current);
file_put_contents($filepath, $current);
?>