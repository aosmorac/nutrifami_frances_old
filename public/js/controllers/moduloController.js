/*global angular*/
angular.module('NutrifamiWeb')
    .controller('ModuloController', ['$rootScope', '$scope', '$location' ,'$routeParams', function($rootScope, $scope, $location, $routeParams) {
        'use strict';
        var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.usuarioActivo = usuarioActivo;
        $scope.modulo = $routeParams.modulo;
        
    }]);
