/*global angular*/
angular.module('NutrifamiWeb').controller('PerfilController', function ($scope) {
    'use strict';

    var usuarioA = JSON.parse(localStorage.getItem('usuarioActivo'));
    console.log(usuarioA);
    $scope.nombre = usuarioA.nombre;
    $scope.apellido = usuarioA.apellido;
    $scope.documento = usuarioA.login_documento;
    if (usuarioA.genero === 'F') {
        $scope.genero = 'femenino';
    } else {
        $scope.genero = 'masculino';
    }
    $scope.etnia = usuarioA.etnia;
    $scope.nacimiento = usuarioA.nacimiento;
    $scope.departamento = usuarioA.departamento;
    $scope.municipio = usuarioA.municipio;
    $scope.comunidad = usuarioA.comunidad;

   $scope.miembrosFamilia = (usuarioA.rango_0a2 + usuarioA.rango_2a5 + usuarioA.rango_6a17 + usuarioA.rango_18a60 + usuarioA.rango_60mas) + " miembros";
   
   $scope.rango_0a2 = usuarioA.rango_0a2;
   $scope.rango_2a5 = usuarioA.rango_2a5;
   $scope.rango_6a17 = usuarioA.rango_6a17;
   $scope.rango_18a60 = usuarioA.rango_18a60;
   $scope.rango_60mas = usuarioA.rango_60mas;

}).filter('capitalize', function () {
    'use strict';
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
}).filter('esVacio', function () {
    'use strict';
    return function (input) {
        if (input === "") {
            input = 'Dato no ingresado';
        }
        return input;
    };
}).filter('estilo', function () {
    'use strict';
    return function (input) {
        if (input === undefined) {
            input = 'sin-registro';
        }
        return input;
    };
});

