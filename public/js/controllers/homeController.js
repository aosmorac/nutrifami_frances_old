/*global angular*/
nutrifamiApp.controller('HomeController', ['$scope', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', function ($scope, $anchorScroll, bsLoadingOverlayService, $timeout) {
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
        $scope.modulos = [];
        /* Obtenemos los ids de los modulos de la capacitación 3 */
        $scope.mids = nutrifami.training.getModulosId(3);
        /*Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas */
        for (var mid in $scope.mids) {
            $scope.modulos.push(nutrifami.training.getModulo($scope.mids[mid]));
        }
    }]);

nutrifamiApp.directive('modulosInfo', ['$location', function ($location) {
        return {
            restrict: 'E',
            scope: {
                info: '=',
                avance: '='
            },
            templateUrl: 'views/directives/modulosInfo.html',
            link: function ($scope, $element, $attrs) {
                $scope.cargando = false;
                $scope.totalLecciones = function () {
                    return (Object.keys($scope.info.lecciones).length);
                };
                $scope.porcentajeAvance = function () {
                    return(100 / $scope.totalLecciones() * $scope.avance.leccionesTerminadas);
                };
                $scope.irAlModulo = function () {
                    $scope.cargando = true;
                    $location.path('/m/' + $scope.info.id);
                };
            }
        };
    }]);
