<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include('conexion.php');

    $result = $conn->query("SELECT id, nombre, apellidopaterno, apellidomaterno FROM alumnos");

    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"id":"'.$rs["id"].'",';
        $outp .= '"nombre":"'.$rs["nombre"].'",';
        $outp .= '"apellidopaterno":"'.$rs["apellidopaterno"]. '",';
        $outp .= '"apellidomaterno":"'.$rs["apellidomaterno"]. '"}'; 
    }
    $outp ='{"records":['.$outp.']}';

    $conn->close();

    echo($outp);
?>