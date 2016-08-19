/*global angular*/
nutrifamiApp.controller('PerfilController', ['$scope', '$rootScope', '$anchorScroll', 'PerfilService', 'bsLoadingOverlayService', '$timeout', '$uibModal', '$route', function ($scope, $rootScope, $anchorScroll, PerfilService, bsLoadingOverlayService, $timeout, $uibModal, $route) {
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
                cantidad: parseInt($scope.usuarioActivo.rango_0a2),
                rango_alias: '0a2'
            },
            {
                rango: '2 a 5 años',
                cantidad: parseInt($scope.usuarioActivo.rango_2a5),
                rango_alias: '2a5'
            },
            {
                rango: '6 a 17 años',
                cantidad: parseInt($scope.usuarioActivo.rango_6a17),
                rango_alias: '6a17'
            },
            {
                rango: '18 a 60 años',
                cantidad: parseInt($scope.usuarioActivo.rango_18a60),
                rango_alias: '18a60'
            },
            {
                rango: '60 0 más años',
                cantidad: parseInt($scope.usuarioActivo.rango_60mas),
                rango_alias: '60mas'
            }
        ];
        
        $scope.usuarioActivo.totalMiembrosPorInscribir = 0;
        for (var i in $scope.usuarioActivo.miembrosPorRango) {
            $scope.usuarioActivo.totalMiembrosPorInscribir = $scope.usuarioActivo.totalMiembrosPorInscribir + $scope.usuarioActivo.miembrosPorRango[i].cantidad;
        }
        
        $scope.usuarioActivo.totalMiembrosInscritos = $scope.usuarioActivo.familia.length;

        $scope.agregarFamiliar = function (familiar, index) {
            PerfilService.agregarFamiliar(familiar, function (response) {
                
                console.log(familiar);

                if (response.success) {
                    /* Restarle el familiar agregado al rango */
                    if (familiar.rango !== false) {
                        $scope.usuarioActivo.miembrosPorRango[index].cantidad--;
                        $scope.usuarioActivo['rango_' + familiar.rango] = familiar.cantidad;
                    }
                    
                    /* Agregar el miembro de la familia a los familiares incritos */
                    
                    $scope.usuarioActivo.familia.push(familiar);
                    
                    console.log($scope.UsuarioActivo);
                    
                    
                    localStorage.setItem("usuarioActivo", JSON.stringify($scope.usuarioActivo));
                }
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
                    $route.reload();
                });

            });
        };
    }]);

nutrifamiApp.directive('agregarFamiliar', function () {
    return {
        restrict: 'E',
        scope: {
            miembro: "=",
            index: '@',
        },
        templateUrl: 'views/directives/agregarFamiliar.html',
        link: function ($scope, $element, $attrs) {
            $scope.familiar = {};
            $scope.familiar.FAM_PER_NOMBRE = '';
            $scope.familiar.FAM_PER_APELLIDO = '';
            $scope.familiar.birthdate = new Date();
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

                familiar.FAM_PER_BIRTHDATE = familiar.birthdate.getFullYear() + "-" + tempMonth + "-" + familiar.birthdate.getDate();
                familiar.FAM_PER_PARENTESCO = familiar.parentescos.selectedOption.id;
                familiar.FAM_PER_JEFE = $scope.$parent.usuarioActivo.id;
                familiar.FAM_PER_CODIGO = $scope.$parent.usuarioActivo.login_codigo;
                familiar.documento_jefe = $scope.$parent.usuarioActivo.login_documento;

                /* If para verificar si es usuario nuevo o miembro de la familia */
                if (typeof $scope.miembro === 'undefined') {
                    familiar.rango = false;
                    familiar.cantidad = 0;
                } else {
                    familiar.rango = $scope.miembro.rango_alias;
                    familiar.cantidad = $scope.miembro.cantidad - 1;
                }

                delete familiar["parentescos"];

                $scope.$parent.agregarFamiliar(familiar, $scope.index);
            };
        }
    };
});

nutrifamiApp.controller('ActualizarUsuarioModalController', function ($scope, $uibModalInstance, data) {
    $scope.data = data;
    $scope.clickBoton = function () {
        $uibModalInstance.close();
    };
});