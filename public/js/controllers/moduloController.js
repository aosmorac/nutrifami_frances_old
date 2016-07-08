/*global angular*/
angular.module('NutrifamiWeb')
        .controller('ModuloController', ['$rootScope', '$scope', '$location', '$routeParams', function ($rootScope, $scope, $location, $routeParams) {
                'use strict';

                $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));

                if (!nutrifami.training.getModulo($routeParams.modulo)) {
                    $location.path('/');
                }

                $scope.modulo = nutrifami.training.getModulo($routeParams.modulo);
                var lids = nutrifami.training.getLeccionesId($routeParams.modulo);
                $scope.lecciones = [];

                var lid;
                for (lid in lids) {
                    $scope.lecciones.push(nutrifami.training.getLeccion(lids[lid]));
                }
                

                for (var i = 0; i<$scope.avanceUsuario.lecciones.length; i++){
                    if ($scope.avanceUsuario.lecciones[i] == 1){
                        $scope.lecciones[i].class = 'leccion-terminada';
                        $scope.lecciones[i].terminada = true;
                    }else{
                        $scope.lecciones[i].terminada = false;
                    }
                }
                
                console.log($scope.lecciones);
                
                $scope.totalLecciones = function () {
                    return (Object.keys($scope.modulo.lecciones).length);
                };
                $scope.porcentajeAvance = function () {
                    return(100 / $scope.totalLecciones() * $scope.avanceUsuario.leccionesTerminadas);
                };
            }]).directive('leccionesInfo', function () {
    return {
        restrict: 'E',
        scope: {
            leccion: '=',
            modulo: '=',
            index: '@'
        },
        templateUrl: 'views/directives/leccionesInfo.html',
        link: function ($scope, $element, $attrs) {
            $scope.porcentajeAvance = function () {
                return(100 / $scope.totalLecciones() * $scope.avance.leccionesTerminadas);
            };
        }
    };
});