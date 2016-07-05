/*global angular*/
angular.module('NutrifamiWeb').controller('PerfilController', ['$scope','$rootScope',function ($scope,$rootScope) {
    'use strict';
    
    var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    $scope.usuarioActivo = usuarioActivo;
    $scope.informacion="active";
   console.log(usuarioActivo.genero);
    if (usuarioActivo.genero === 'F' || usuarioActivo.genero === 'f') {
        $scope.usuarioActivo.genero = 'femenino';
    } else {
        $scope.usuarioActivo.genero = 'masculino';
    }
    $scope.usuarioActivo.miembrosFamilia = (usuarioActivo.rango_0a2 + usuarioActivo.rango_2a5 + usuarioActivo.rango_6a17 + usuarioActivo.rango_18a60 + usuarioActivo.rango_60mas) + " miembros";
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

