/*global angular*/
angular.module('NutrifamiWeb')
        .controller('HomeController', ['$scope', '$anchorScroll', function ($scope, $anchorScroll) {
                'use strict';
                $anchorScroll();
                $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
                $scope.home = "active";
                $scope.modulos = [];
                /* Obtenemos los ids de los modulos de la capacitación 3 */
                $scope.mids = nutrifami.training.getModulosId(3);
                /*Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas */
                for (var mid in $scope.mids) {
                    $scope.modulos.push(nutrifami.training.getModulo($scope.mids[mid]));
                }
            }])
        .directive('modulosInfo', ['$location', function ($location) {
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
