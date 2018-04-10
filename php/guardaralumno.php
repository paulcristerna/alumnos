<?php
    file_get_contents("php://input");
    $objDatos = json_decode(file_get_contents("php://input"));

    include('conexion.php');

    $result = $conn->query("insert into alumnos (nombre, apellidopaterno, apellidomaterno) values ('$objDatos->nombre','$objDatos->apellidopaterno','$objDatos->apellidomaterno');");

    $conn->close();
?>