/*global angular*/
nutrifamiApp.controller('PerfilController', ['$scope', '$rootScope', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', function ($scope, $rootScope, $anchorScroll, bsLoadingOverlayService, $timeout) {
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

        /* Verifica si viene un mensaje, lo muestra cierta cantidad de tiempo y lo elimina*/
        if ($rootScope.mensaje.estado !== null) {
            $timeout(function () {
                $rootScope.mensaje.estado = false;
            }, $rootScope.mensaje.tiempo);
        }

        $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.informacion = "active";

        $scope.usuarioActivo.miembrosFamilia = (
                parseInt($scope.usuarioActivo.rango_0a2) +
                parseInt($scope.usuarioActivo.rango_2a5) +
                parseInt($scope.usuarioActivo.rango_6a17) +
                parseInt($scope.usuarioActivo.rango_18a60) +
                parseInt($scope.usuarioActivo.rango_60mas)) + " miembros";
    }]);
