/*global angular*/
angular.module('NutrifamiWeb')
        .controller('UnidadController', ['$rootScope', '$scope', '$location', '$routeParams', function ($rootScope, $scope, $location, $routeParams) {
                'use strict';
                var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.usuarioActivo = usuarioActivo;
                $scope.estadoUnidad = 'espera';
                $scope.uids = {};
                $scope.unidades = [];

                if (JSON.parse(localStorage.getItem('uids' + $routeParams.leccion)) === null) {
                    $scope.uids = nutrifami.training.getUnidadesId($routeParams.leccion);
                    var temp = [];
                    for (var i in $scope.uids) {
                        temp.push($scope.uids[i]);
                    }
                    $scope.unidad = nutrifami.training.getUnidad(temp[$routeParams.unidad - 1]);
                    localStorage.setItem("uids" + $routeParams.leccion, JSON.stringify(temp));
                    localStorage.setItem("unidad" + $routeParams.unidad, JSON.stringify($scope.unidad));
                    console.log($scope.unidad);
                } else {
                    $scope.uids = JSON.parse(localStorage.getItem('uids' + $routeParams.leccion));
                    $scope.unidad = JSON.parse(localStorage.getItem('unidad' + $routeParams.unidad));
                }

                var opciones = [{
                        id: 9,
                        correcta: false,
                        orden: 0,
                        fecha: '',
                        visible: true,
                        texto: 'Consumir los alimentos con los nutrientes y la energía necesarios para',
                        audio: {
                            nombre: '',
                            content: Object,
                            loaded: false
                        },
                        media: {
                            nombre: '',
                            content: Object,
                            loaded: false
                        }

                    },{
                        id: 10,
                        correcta: false,
                        orden: 0,
                        fecha: '',
                        visible: true,
                        texto: 'Consumir los texto 2',
                        audio: {
                            nombre: '',
                            content: Object,
                            loaded: false
                        },
                        media: {
                            nombre: '',
                            content: Object,
                            loaded: false
                        }

                    },{
                        id: 11,
                        correcta: false,
                        orden: 0,
                        fecha: '',
                        visible: true,
                        texto: 'Consumir los alimentos texto 3',
                        audio: {
                            nombre: '',
                            content: Object,
                            loaded: false
                        },
                        media: {
                            nombre: '',
                            content: Object,
                            loaded: false
                        }

                    },
                ];
                
                $scope.unidad.opciones = opciones;                
                $scope.unidad.colspan = 12/$scope.unidad.opciones.length;
                $scope.botonCalificar = {
                    estilo: 'no-activo',
                    disabled: 'disabled'
                };
                $scope.irASiguienteUnidad = function () {
                    $scope.siguienteUnidad = parseInt($routeParams.unidad) + 1;
                    if (false) {
                        /* Validar si es la ultima función para enviar la pagina de exito */
                    } else {
                        $location.path('/m/' + $routeParams.modulo + "/" + $routeParams.leccion + "/" + $scope.siguienteUnidad);
                    }
                };
                $scope.reiniciarLeccion = function () {
                    $scope.estadoUnidad = 'espera';
                    $scope.botonCalificar.estilo = 'no-activo';
                    $scope.botonCalificar.disabled = 'disabled';
                };

                $scope.seleccionarOpcion = function (estado) {
                    if (estado) {
                        $scope.botonCalificar.estilo = 'activo';
                        $scope.botonCalificar.disabled = '';
                    } else {
                        $scope.botonCalificar.estilo = 'no-activo';
                        $scope.botonCalificar.disabled = 'disabled';
                    }
                };

                $scope.calificarUnidad = function () {
                    /* Validar si acerto o fallo*/
                    if (false) {
                        $scope.estadoUnidad = 'acierto';
                    } else {
                        $scope.estadoUnidad = 'fallo';
                    }
                };
            }])
        .directive('opcionesUnidadInfo', function () {
            return {
                restrict: 'E',
                scope: {
                    info: '=',
                    colspan: '='
                },
                templateUrl: 'views/directives/opcionesUnidadInfo.html',
                link: function ($scope, $element, $attrs) {
                    $scope.estilo = '';
                    $scope.selected = false;
                    $scope.click = function () {
                        if ($scope.selected) {
                            $scope.estilo = '';
                            $scope.selected = false;
                            $scope.$parent.seleccionarOpcion(false);
                        } else {
                            $scope.estilo = 'selected';
                            $scope.selected = true;
                            $scope.$parent.seleccionarOpcion(true);
                        }

                    };
                }

            };
        })
        .directive('calificarUnidad', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'views/directives/calificarUnidad.html',
                link: function ($scope, $element, $attrs) {
                    $scope.calificar = function () {
                        $scope.$parent.calificarUnidad();
                    };
                }
            };
        })
        .directive('reiniciarUnidad', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'views/directives/reiniciarUnidad.html',
                link: function ($scope, $element, $attrs) {
                    $scope.reiniciar = function () {
                        $scope.$parent.reiniciarLeccion();
                    };
                }
            };
        })
        .directive('siguienteUnidad', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'views/directives/siguienteUnidad.html',
                link: function ($scope, $element, $attrs) {
                    $scope.click = function () {
                        $scope.$parent.irASiguienteUnidad();
                    };
                }
            };
        })

        ;