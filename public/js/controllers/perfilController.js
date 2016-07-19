/*global angular*/
angular.module('NutrifamiWeb').controller('PerfilController', ['$scope', '$rootScope', '$anchorScroll', '$timeout', function ($scope, $rootScope, $anchorScroll, $timeout) {
        'use strict';
        $anchorScroll();

        /* Verifica si viene un mensaje, lo muestra cierta cantidad de tiempo y lo elimina*/
        if ($rootScope.mensaje.estado!== null) {
            $timeout(function () {
                $rootScope.mensaje.estado = false;
            }, $rootScope.mensaje.tiempo);
        }
        
        $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.informacion = "active";

        console.log($rootScope.mensaje);

        if ($scope.usuarioActivo.genero.toUpperCase() === 'F') {
            $scope.usuarioActivo.genero = 'Femenino';
        } else {
            $scope.usuarioActivo.genero = 'Masculino';
        }

        $scope.usuarioActivo.miembrosFamilia = (
                parseInt($scope.usuarioActivo.rango_0a2) +
                parseInt($scope.usuarioActivo.rango_2a5) +
                parseInt($scope.usuarioActivo.rango_6a17) +
                parseInt($scope.usuarioActivo.rango_18a60) +
                parseInt($scope.usuarioActivo.rango_60mas)) + " miembros";
    }])
        .filter('esVacio', function () {
            'use strict';
            return function (input) {
                if (input === "" || input === null) {
                    input = 'Dato no ingresado';
                }
                return input;
            };
        })
        .filter('estilo', function () {
            'use strict';
            return function (input) {
                if (input === undefined || input === null) {
                    input = 'sin-registro';
                }
                return input;
            };
        });

