/*global angular*/
angular.module('NutrifamiWeb')
    .controller('UnidadController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
        'use strict';
        var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.usuarioActivo = usuarioActivo;
        $scope.mensaje = "Mensaje enviado desde el controlador";
    }]);
