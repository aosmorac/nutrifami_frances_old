/*global angular*/
angular.module('NutrifamiWeb').controller('PerfilController', ['$scope','$rootScope',function ($scope,$rootScope) {
    'use strict';
    
    var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    $scope.nombre = usuarioActivo.nombre;
    $scope.apellido = usuarioActivo.apellido;
    $scope.documento = usuarioActivo.login_documento;
    if (usuarioActivo.genero === 'F') {
        $scope.genero = 'femenino';
    } else {
        $scope.genero = 'masculino';
    }
    $scope.etnia = usuarioActivo.etnia;
    $scope.nacimiento = usuarioActivo.nacimiento;
    $scope.departamento = usuarioActivo.departamento;
    $scope.municipio = usuarioActivo.municipio;
    $scope.comunidad = usuarioActivo.comunidad;

   $scope.miembrosFamilia = (usuarioActivo.rango_0a2 + usuarioActivo.rango_2a5 + usuarioActivo.rango_6a17 + usuarioActivo.rango_18a60 + usuarioActivo.rango_60mas) + " miembros";
   
   $scope.rango_0a2 = usuarioActivo.rango_0a2;
   $scope.rango_2a5 = usuarioActivo.rango_2a5;
   $scope.rango_6a17 = usuarioActivo.rango_6a17;
   $scope.rango_18a60 = usuarioActivo.rango_18a60;
   $scope.rango_60mas = usuarioActivo.rango_60mas;

}]).filter('capitalize', function () {
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

