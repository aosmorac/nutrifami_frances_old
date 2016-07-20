/*global angular*/
angular.module('NutrifamiWeb')
        .controller('ModuloController', ['$rootScope', '$scope', '$location', '$routeParams', '$anchorScroll', function ($rootScope, $scope, $location, $routeParams, $anchorScroll) {
                'use strict';
                $anchorScroll();
                $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
                console.log($scope.avanceUsuario);
                $scope.lecciones = [];

                /* Se hace un try por si el usuario intenta ingresar a la URL a otro modulo que lo lleve al home */
                try {
                    $scope.modulo = nutrifami.training.getModulo($routeParams.modulo);
                    $scope.modulo.totalLecciones = Object.keys($scope.modulo.lecciones).length;
                    $scope.lids = nutrifami.training.getLeccionesId($routeParams.modulo);
                    for (var lid in $scope.lids) {
                        $scope.lecciones.push(nutrifami.training.getLeccion($scope.lids[lid]));
                    }
                } catch (err) {
                    $location.path('/');
                }

                for (var i = 0; i < $scope.avanceUsuario.lecciones.length; i++) {
                    if ($scope.avanceUsuario.lecciones[i] == 1) {
                        $scope.lecciones[i].class = 'leccion-terminada';
                        $scope.lecciones[i].terminada = true;
                    } else {
                        $scope.lecciones[i].terminada = false;
                    }
                    console.log($scope.lecciones[i].terminada);
                }
                $scope.porcentajeAvance = function () {
                    return(100 / $scope.modulo.totalLecciones * $scope.avanceUsuario.leccionesTerminadas);
                };
                $scope.irALeccion = function (index) {
                    $location.path('/m/' + $routeParams.modulo + "/" + $scope.lids[index] + "/1");
                };
            }])
        .directive('leccionesInfo', function () {
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
                    $scope.click = function () {
                        $scope.$parent.irALeccion($scope.index);
                    };
                }
            };
        });