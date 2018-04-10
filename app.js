//MI APLICACION
var angularRoutingApp = angular.module('myApp', ['ngRoute']);

//FILTRO POR ID DE LOS ALUMNOS
angularRoutingApp.filter('getById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  }
});

//CONFIGUARACION DE LAS RUTAS
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            title: 'Listado de Alumnos',
            templateUrl : 'listadoalumnos.html',
            controller  : 'listadoalumnosCtrl'
        })
        .when('/guardar', {
            title: 'Guardar Alumno',
            templateUrl : 'guardaralumnos.html',
            controller  : 'guardaralumnosCtrl'
        })
        .when('/editar/:id', {
            title: 'Editar Alumno',
            templateUrl : 'editaralumnos.html',
            controller  : 'editaralumnosCtrl'
        })
        .when('/eliminar/:id', {
            title: 'Editar Alumno',
            templateUrl : 'eliminaralumnos.html',
            controller  : 'eliminaralumnosCtrl'
        })
});

//CONTROLADOR DEL LISTADO DE LOS ALUMNOS
angularRoutingApp.controller('listadoalumnosCtrl', function($scope, $http, $routeParams, $location) {

    //FUNCION PARA CARGAR LOS DATOS DE LOS ALUMNOS
    $scope.cargarlistadoalumnos = function()
    {
        $http.get("php/listadoalumnos.php")
        .success(function(response) {$scope.alumnos = response.records;});
    }
    
    $scope.cargarlistadoalumnos();
});

//CONTROLADOR DEL GUARDADO DE LOS ALUMNOS
angularRoutingApp.controller('guardaralumnosCtrl', function($scope, $http, $routeParams, $location) {

    //FUNCION PARA GUARDAR AL ALUMNO
    $scope.guardaralumno = function()
    { 
        //VALIDAR QUE LOS CAMPOS ESTEN LLENADOS CORRECTAMENTE
        if(!$scope.agregaralumnofrm.nombre.$valid ||
           !$scope.agregaralumnofrm.apellidopaterno.$valid ||
           !$scope.agregaralumnofrm.apellidomaterno.$valid)
        {
            $scope.mensajeerrorvalidacion = true;
        }
        else
        {   
            $scope.mensajeerrorvalidacion = false;
     
            //DATOS QUE SE MANDARAN EN LA CONSULTA
            $http.post("php/guardaralumno.php", {nombre:          $scope.nombre,
                                                 apellidopaterno: $scope.apellidopaterno,
                                                 apellidomaterno: $scope.apellidomaterno})
            .success(function(res)
            {
                //SE GUARDO AL ALUMNO CON  EXITO
                $scope.mensajeexito = !$scope.mensajeexito;
                $location.path('/');
            }).error(function(data, status, headers, config)
            {
                //NO SE GUARDO AL ALUMNO 
                $scope.mensajeerror = !$scope.mensajeerror;
            });
        }        
    }
});

//CONTROLADOR DE EDICION DE LOS ALUMNOS
angularRoutingApp.controller('editaralumnosCtrl', function($scope, $http, $routeParams, $location, $filter) {

    //FUNCION PARA TRAER DATOS DEL ALUMNO
    $scope.datosalumno = function()
    {
        $http.get("php/listadoalumnos.php").success(function(response) 
        {
            $scope.alumnos = response.records;
            var alumno = $filter('getById')($scope.alumnos, $routeParams.id);

            $scope.nombre = alumno.nombre;
            $scope.apellidopaterno = alumno.apellidopaterno;
            $scope.apellidomaterno = alumno.apellidomaterno;
        });
    }     

    $scope.datosalumno();

    //FUNCION PARA EDITAR AL ALUMNO
    $scope.editaralumno = function()
    { 
        //VALIDAR QUE LOS CAMPOS ESTEN LLENADOS CORRECTAMENTE
        if(!$scope.agregaralumnofrm.nombre.$valid ||
           !$scope.agregaralumnofrm.apellidopaterno.$valid ||
           !$scope.agregaralumnofrm.apellidomaterno.$valid)
        {
            $scope.mensajeerrorvalidacion = true;
        }
        else
        {        
            //DATOS QUE SE MANDARAN EN LA CONSULTA
            $http.post("php/editaralumno.php", {id:              $routeParams.id,
                                                nombre:          $scope.nombre,
                                                apellidopaterno: $scope.apellidopaterno,
                                                apellidomaterno: $scope.apellidomaterno})
            .success(function(res)
            {
                //SE EDITO AL ALUMNO CON  EXITO
                $location.path('/');
            }).error(function(data, status, headers, config)
            {
                //NO SE EDITO AL ALUMNO 
                $scope.mensajeerror = !$scope.mensajeerror;
            });
        }        
    }
});

//CONTROLADOR DE ELIMINACION DE LOS ALUMNOS
angularRoutingApp.controller('eliminaralumnosCtrl', function($scope, $http, $routeParams, $location, $filter) {

    //FUNCION PARA TRAER DATOS DEL ALUMNO
    $scope.datosalumno = function()
    {
        $http.get("php/listadoalumnos.php").success(function(response) 
        {
            $scope.alumnos = response.records;
            var alumno = $filter('getById')($scope.alumnos, $routeParams.id);

            $scope.nombre = alumno.nombre;
            $scope.apellidopaterno = alumno.apellidopaterno;
            $scope.apellidomaterno = alumno.apellidomaterno;
        });
    }     

    $scope.datosalumno();

    //FUNCION PARA EDITAR AL ALUMNO
    $scope.eliminaralumno = function()
    {         
        //DATOS QUE SE MANDARAN EN LA CONSULTA
        $http.post("php/eliminaralumno.php", {id: $routeParams.id})
        .success(function(res)
        {
            //SE ELIMINO AL ALUMNO CON  EXITO
            $location.path('/');
        }).error(function(data, status, headers, config)
        {
            //NO SE ELIMINO AL ALUMNO 
            $scope.mensajeerror = !$scope.mensajeerror;
        });     
    }
});