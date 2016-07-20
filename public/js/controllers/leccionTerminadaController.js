/*global angular*/
nutrifamiApp.controller('LeccionTerminadaController', ['$rootScope', '$scope', '$location', '$routeParams', 'bsLoadingOverlayService', '$timeout', function ($rootScope, $scope, $location, $routeParams, $anchorScroll, bsLoadingOverlayService, $timeout) {
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

        $scope.mensaje = "Ha finalizado la leccion";

    }]);
        