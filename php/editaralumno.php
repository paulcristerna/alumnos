<?php
    file_get_contents("php://input");
    $objDatos = json_decode(file_get_contents("php://input"));

    include('conexion.php');

    $result = $conn->query("update alumnos set nombre = '$objDatos->nombre', apellidopaterno = '$objDatos->apellidopaterno', apellidomaterno = '$objDatos->apellidomaterno' where id = $objDatos->id;");

    $conn->close();
?>