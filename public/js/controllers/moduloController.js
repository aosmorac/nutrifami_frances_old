/*global angular*/
angular.module('NutrifamiWeb')
        .controller('ModuloController', ['$rootScope', '$scope', '$location', '$routeParams', function ($rootScope, $scope, $location, $routeParams) {
                'use strict';

                $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
                $scope.modulo = {};
                $scope.lids = {};
                $scope.lecciones = [];

                /* Verificamos si los modulos están guardados en el local estorage */
                if (JSON.parse(localStorage.getItem('modulo' + $routeParams.modulo)) === null) {
                    var temp = nutrifami.training.getModulo($routeParams.modulo);
                    $scope.modulo.id = temp.id;
                    $scope.modulo.titulo = temp.titulo;
                    $scope.modulo.descripcion = temp.descripcion;
                    $scope.modulo.totalLecciones = Object.keys(temp.lecciones).length;
                    $scope.lids = nutrifami.training.getLeccionesId($routeParams.modulo);
                    var lid;
                    for (lid in $scope.lids) {
                        $scope.lecciones.push(nutrifami.training.getLeccion($scope.lids[lid]));
                    }
                    localStorage.setItem("modulo" + $routeParams.modulo, JSON.stringify($scope.modulo));
                    localStorage.setItem("lids" + $routeParams.modulo, JSON.stringify($scope.lids));
                    localStorage.setItem("lecciones" + $routeParams.modulo, JSON.stringify($scope.lecciones));
                } else {
                    $scope.modulo = JSON.parse(localStorage.getItem('modulo' + $routeParams.modulo));
                    $scope.lids = JSON.parse(localStorage.getItem('lids' + $routeParams.modulo));
                    $scope.lecciones = JSON.parse(localStorage.getItem('lecciones' + $routeParams.modulo));
                }

                if (!$scope.modulo) {
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
                    console.log(index);
                    console.log($scope.lids[index]);
                    try {
                        nutrifami.training.loadLeccion($scope.lids[index], function () {
                            /* Acciones en el callback */
                            console.log("Pasa algo");
                            $location.path('/m/' + $routeParams.modulo + "/" + $scope.lids[index] + "/1");
                        });
                    } catch (err) {
                        $location.path('/');
                    }


                };
            }]).directive('leccionesInfo', function () {
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