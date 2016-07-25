/*global angular*/
angular.module('NutrifamiWeb')
        .controller('ModuloController', ['$rootScope', '$scope', '$location', '$routeParams', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', function ($rootScope, $scope, $location, $routeParams, $anchorScroll, bsLoadingOverlayService, $timeout) {
                'use strict';

                $anchorScroll();

                /* Overloading*/
                bsLoadingOverlayService.start();
                /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
                $scope.$on('$viewContentLoaded', function () {
                    /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
                     * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
                    $timeout(function () {
                        bsLoadingOverlayService.stop();
                    }, 300);
                });

                $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
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