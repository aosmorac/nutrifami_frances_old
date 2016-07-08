/*global angular*/
angular.module('NutrifamiWeb')
        .controller('UnidadController', ['$rootScope', '$scope', '$location', '$routeParams', function ($rootScope, $scope, $location, $routeParams) {
                'use strict';
                var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.usuarioActivo = usuarioActivo;
                $scope.estadoUnidad = 'espera';
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

                var unidades = [
                    {
                        id: 1,
                        tipo: {
                            id: 1,
                            alias: 'tipo1',
                            nombre: 'Opción multiple única respuesta',
                            descripcion: 'Lea y seleccione la respuesta correcta.'
                        },
                        titulo: 'La alimentación es...',
                        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante a lorem laoreet facilisis.',
                        imagen: {
                            nombre: '201651175223151.jpg',
                            content: Object,
                            loaded: false
                        },
                        fecha: '',
                        activo: true,
                        from: 0,
                        cantidadOpciones: 3,
                        colspan: function () {
                            return (12 / this.cantidadOpciones);
                        },
                        opciones: [{
                                correcta: true,
                                texto: 'Una actividad básica de todos los seres vivos para vivir.'
                            }, {
                                correcta: false,
                                texto: 'Un alimento para crecer y estar sano.'
                            }, {
                                correcta: false,
                                texto: 'Comprar alimentos'
                            }]
                    },
                    {
                        id: 2,
                        tipo: {
                            id: 2,
                            alias: 'tipo2',
                            nombre: 'Opción multiple, multiple respuesta',
                            descripcion: 'Seleccione las opciones verdaderas'
                        },
                        titulo: 'Para lograr una alimentación saludable debemos…',
                        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante a lorem laoreet facilisis.',
                        imagen: {
                            nombre: '201651175223151.jpg',
                            content: Object,
                            loaded: false
                        },
                        fecha: '',
                        activo: true,
                        from: 0,
                        cantidadOpciones: 4,
                        colspan: function () {
                            return (12 / this.cantidadOpciones);
                        },
                        opciones: [{
                                correcta: true,
                                texto: 'Consumir los alimentos con los nutrientes y la energía necesarios para'
                            }, {
                                correcta: false,
                                texto: 'Comer solo grasas y azúcares para tener energía y estar activos'
                            }, {
                                correcta: false,
                                texto: 'Comer grandes cantidades de comidas.'
                            }, {
                                correcta: true,
                                texto: 'Comer cantidades de comida acorde a la edad y necesidades '
                            }]
                    }];
                /*Verifica que el enruamiento este bien, si no redirecciona a la pagina principal del modulo*/
                if (unidades[$routeParams.unidad - 1] == null || $routeParams.leccion != 1) {
                    $location.path('/m/' + $routeParams.modulo);
                }

                $scope.unidad = unidades[$routeParams.unidad - 1];
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