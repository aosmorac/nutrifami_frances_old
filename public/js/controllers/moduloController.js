/*global angular*/
angular.module('NutrifamiWeb')
        .controller('ModuloController', ['$rootScope', '$scope', '$location', '$routeParams', function ($rootScope, $scope, $location, $routeParams) {
                'use strict';

                $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
                $scope.modulo = {};
                $scope.lids = {};
                $scope.lecciones = [];

                if (JSON.parse(localStorage.getItem('modulo'+$routeParams.modulo)) === null) {
                    $scope.modulo = nutrifami.training.getModulo($routeParams.modulo);
                    $scope.lids = nutrifami.training.getLeccionesId($routeParams.modulo);
                    var lid;
                    for (lid in $scope.lids) {
                        $scope.lecciones.push(nutrifami.training.getLeccion($scope.lids[lid]));
                    }
                    localStorage.setItem("modulo"+$routeParams.modulo, JSON.stringify($scope.modulo));
                    localStorage.setItem("lids"+$routeParams.modulo, JSON.stringify($scope.lids));
                    localStorage.setItem("lecciones"+$routeParams.modulo, JSON.stringify($scope.lecciones));
                } else {
                    $scope.modulo = JSON.parse(localStorage.getItem('modulo'+$routeParams.modulo));
                    $scope.lids = JSON.parse(localStorage.getItem('lids'+$routeParams.modulo));
                    $scope.lecciones = JSON.parse(localStorage.getItem('lecciones'+$routeParams.modulo));
                }

                if (!$scope.modulo) {
                    $location.path('/');
                }

                for (var i = 0; i < $scope.avanceUsuario.lecciones.length; i++) {
                    if ($scope.avanceUsuario.lecciones[i] == 1) {
                        $scope.lecciones[i].class = 'leccion-terminada';
                        $scope.lecciones[i].terminada = true;
                    } else {
                        $scope.lecciones[i].terminada = false;
                    }
                }
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