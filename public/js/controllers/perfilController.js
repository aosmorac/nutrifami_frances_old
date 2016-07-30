/*global angular*/
nutrifamiApp.controller('PerfilController', ['$scope', '$rootScope', '$anchorScroll', 'PerfilService', 'bsLoadingOverlayService', '$timeout', '$uibModal', function ($scope, $rootScope, $anchorScroll, PerfilService, bsLoadingOverlayService, $timeout, $uibModal) {
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

        /* Creamos un arreglo para mostrar los miembros de la familia de forma dinamica */

        console.log($scope.usuarioActivo);

        $scope.usuarioActivo.miembrosPorRango = [
            {
                rango: '0 a 2 años',
                cantidad: parseInt($scope.usuarioActivo.rango_0a2)
            },
            {
                rango: '2 a 5 años',
                cantidad: parseInt($scope.usuarioActivo.rango_2a5)
            },
            {
                rango: '6 a 17 años',
                cantidad: parseInt($scope.usuarioActivo.rango_6a17)
            },
            {
                rango: '18 a 60 años',
                cantidad: parseInt($scope.usuarioActivo.rango_18a60)
            },
            {
                rango: '60 0 más años',
                cantidad: parseInt($scope.usuarioActivo.rango_60mas)
            }
        ];

        $scope.usuarioActivo.totalMiembros = 0;
        for (var i in $scope.usuarioActivo.miembrosPorRango) {
            $scope.usuarioActivo.totalMiembros = $scope.usuarioActivo.totalMiembros + $scope.usuarioActivo.miembrosPorRango[i].cantidad;
        }

        $scope.agregarFamiliar = function (familiar) {
            PerfilService.agregarFamiliar(familiar, function (response) {

                var feedbackModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modals/actualizacionUsuario.html',
                    controller: 'ActualizarUsuarioModalController',
                    backdrop: 'static',
                    keyboard: false,
                    size: 'lg',
                    resolve: {
                        data: function () {
                            return response;
                        }
                    }
                });
                feedbackModal.result.then(function (estado) {
                });

            });
        };
    }]);

nutrifamiApp.directive('agregarFamiliar', [function (PerfilService) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directives/agregarFamiliar.html',
            link: function ($scope, $element, $attrs) {
                $scope.familiar = {};
                $scope.familiar.nombre = '';
                $scope.familiar.apellido = '';
                $scope.familiar.parentescos = {
                    availableOptions: [
                        {id: 'hijo', name: 'Hijo'},
                        {id: 'conyuge', name: 'Conyuge'},
                        {id: 'padre', name: 'Padre'},
                        {id: 'otros', name: 'Otros'}
                    ]
                };
                $scope.update = function () {
                    var familiar = $scope.familiar;
                    var tempMonth = familiar.birthdate.getMonth() + 1;
                    if (tempMonth < 10) {
                        tempMonth = "0" + tempMonth;
                    }

                    familiar.birthdate = familiar.birthdate.getFullYear() + "-" + tempMonth + "-" + familiar.birthdate.getDate();
                    familiar.parentesco = familiar.parentescos.selectedOption.id;
                    familiar.jefe = $scope.$parent.usuarioActivo.id;
                    familiar.codigo = $scope.$parent.usuarioActivo.login_codigo;
                    familiar.documento_jefe = $scope.$parent.usuarioActivo.login_documento;

                    $scope.$parent.agregarFamiliar(familiar);

                };
            }
        };
    }]);

nutrifamiApp.controller('ActualizarUsuarioModalController', function ($scope, $uibModalInstance, data) {
    $scope.data = data;
    $scope.clickBoton = function () {
        $uibModalInstance.close();
    };
});