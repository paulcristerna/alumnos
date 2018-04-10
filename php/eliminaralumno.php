<?php
    file_get_contents("php://input");
    $objDatos = json_decode(file_get_contents("php://input"));

    include('conexion.php');

    $result = $conn->query("delete from alumnos where id = $objDatos->id;");

    $conn->close();
?>