/*global angular*/
angular.module('NutrifamiWeb')
        .controller('HomeController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
                'use strict';
                $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
                $scope.home = "active";

                var mids = nutrifami.training.getModulosId(3);
                $scope.modulos = [];
                var mid;
                for (mid in mids) {
                    $scope.modulos.push(nutrifami.training.getModulo(mids[mid]));
                }

            }])
        .directive('modulosInfo', ['$location',function ($location) {
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
                        nutrifami.training.loadModulo($scope.info.id, function () {
                            $scope.cargando = false;
                            $location.path('/m/'+$scope.info.id);
                        });
                    };
                }
            };
        }]);
