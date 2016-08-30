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
                if (typeof $scope.avanceUsuario['3'] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo] !== 'undefined') {
                    $scope.modulo.leccionesFinalizadas = Object.keys($scope.avanceUsuario['3'][$routeParams.modulo]).length;
                } else {
                    $scope.modulo.leccionesFinalizadas = 0;
                }

                $scope.lids = nutrifami.training.getLeccionesId($routeParams.modulo);
                console.log($scope.lids);
                for (var lid in $scope.lids) {
                    var tempLecciones = nutrifami.training.getLeccion($scope.lids[lid]);
                    tempLecciones.avance = {};
                    if (typeof $scope.avanceUsuario['3'] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo][$scope.lids[lid]] !== 'undefined') {
                        tempLecciones.avance.terminada = true;
                    }
                    else {
                        tempLecciones.avance.terminada = false;
                    }
                    $scope.lecciones.push(tempLecciones);
                }
                } catch (err) {
                 console.log(err);
                 //$location.path('/');
                 }

                console.log($scope.lecciones);
                console.log($scope.modulo);

                $scope.porcentajeAvance = function () {
                    return(100 / $scope.modulo.totalLecciones * $scope.modulo.leccionesFinalizadas);
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
                    $scope.paso = parseInt($scope.index) + 1;
                    $scope.porcentajeAvance = function () {
                        return(100 / $scope.totalLecciones() * $scope.avance.leccionesTerminadas);
                    };
                    $scope.click = function () {
                        $scope.$parent.irALeccion($scope.index);
                    };
                }
            };
        });