/*global angular*/
angular.module('NutrifamiWeb')
    .controller('HomeController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
        'use strict';
        $scope.mensaje = "Mensaje enviado desde el controlador"
    }]);
