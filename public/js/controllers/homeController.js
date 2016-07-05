/*global angular*/
angular.module('NutrifamiWeb')
    .controller('HomeController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
        'use strict';
        var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.usuarioActivo = usuarioActivo;
        $scope.home="active";
        $scope.mensaje = "Mensaje enviado desde el controlador";
    }]);
