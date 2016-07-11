/*global angular*/
angular.module('NutrifamiWeb')
        .controller('UnidadController', ['$rootScope', '$scope', '$location', '$routeParams', function ($rootScope, $scope, $location, $routeParams) {
                'use strict';
                var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.usuarioActivo = usuarioActivo;
                $scope.estadoUnidad = 'espera';
                $scope.uids = {};
                $scope.unidades = [];

                var tempUnidad = JSON.parse(localStorage.getItem('unidad'));
                var cargarUnidad = true;
                if (tempUnidad !== null) {
                    if (tempUnidad.id === $routeParams.unidad) {
                        cargarUnidad = false;
                    }
                }

                if (cargarUnidad) {

                    try {

                        $scope.uids = nutrifami.training.getUnidadesId($routeParams.leccion);
                        var temp = [];
                        for (var i in $scope.uids) {
                            temp.push($scope.uids[i]);
                        }
                        $scope.unidad = nutrifami.training.getUnidad(temp[$routeParams.unidad - 1]);
                        $scope.unidad.avanceLeccion = (100 / temp.length) * (parseInt($routeParams.unidad) - 1);
                        $scope.unidad.totalUnidades = temp.length;
                        var tempOpciones = [];
                        for (var i in $scope.unidad.opciones) {
                            tempOpciones.push($scope.unidad.opciones[i]);
                        }
                        $scope.unidad.opciones = tempOpciones;

                        if ($scope.unidad.imagen.loaded === "loaded") {
                            $scope.unidad.imagen.mostrar = true;
                        } else {
                            $scope.unidad.imagen.mostrar = false;
                        }

                        localStorage.setItem("uids" + $routeParams.leccion, JSON.stringify(temp));
                        localStorage.setItem("unidad", JSON.stringify($scope.unidad));
                    } catch (err) {
                        alert("Error");
                        $location.path('/');
                    }
                } else {
                    $scope.uids = JSON.parse(localStorage.getItem('uids' + $routeParams.leccion));
                    $scope.unidad = JSON.parse(localStorage.getItem('unidad'));
                }

                if ($scope.unidad.opciones.length == 3 || $scope.unidad.opciones.length == 6) {
                    $scope.unidad.colspan = 4;
                } else if ($scope.unidad.opciones.length == 2) {
                    $scope.unidad.opciones.colspan == 6;
                } else {
                    $scope.unidad.colspan = 3;
                }

                /*
                 * Se define el tipo de pregunta para adaptar el funcionamiento
                 * id = 1; Opción multiple con única respuesta, y verdadero o falso.
                 * id = 2; Opción multiple con multiple respuesta
                 * id = 3; Parejas
                 * 
                 */
                var tipoPregunta = $scope.unidad.tipo.id;

                /* Obtenemos la cantidad de preguntas correctas*/
                var respuestasCorrectas = 0;
                var respuestasSeleccionadas = 0;



                for (var i in $scope.unidad.opciones) {
                    if ($scope.unidad.opciones[i].correcta == 1) {
                        respuestasCorrectas++;
                    }
                    $scope.unidad.opciones[i].estilo = '';
                    $scope.unidad.opciones[i].selected = false;
                    $scope.unidad.opciones[i].evaluacion = false;
                    $scope.unidad.opciones[i].sticker = 'remove mal';
                }



                $scope.botonCalificar = {
                    estilo: 'no-activo',
                    disabled: 'disabled'
                };


                $scope.seleccionarOpcion = function (index) {
                    if ($scope.unidad.opciones[index].selected) {
                        $scope.unidad.opciones[index].estilo = '';
                        $scope.unidad.opciones[index].selected = false;
                        respuestasSeleccionadas--;
                    } else {
                        $scope.unidad.opciones[index].estilo = 'selected';
                        $scope.unidad.opciones[index].selected = true;
                        respuestasSeleccionadas++;
                    }

                    if (respuestasCorrectas === 1) {
                        for (var i in $scope.unidad.opciones) {
                            if (i !== index) {
                                if ($scope.unidad.opciones[i].selected) {
                                    $scope.unidad.opciones[i].estilo = '';
                                    $scope.unidad.opciones[i].selected = false;
                                    respuestasSeleccionadas--;
                                }
                            }
                        }
                    }

                    if (respuestasSeleccionadas === respuestasCorrectas) {
                        $scope.botonCalificar.estilo = 'activo';
                        $scope.botonCalificar.disabled = '';
                    } else {
                        $scope.botonCalificar.estilo = 'no-activo';
                        $scope.botonCalificar.disabled = 'disabled';
                    }

                };

                $scope.calificarUnidad = function () {
                    /* Validar si acerto o fallo*/
                    var respuestasAcertadas = 0;
                    for (var i in $scope.unidad.opciones) {
                        if ($scope.unidad.opciones[i].selected) {
                            $scope.unidad.opciones[i].evaluacion = true;
                            if ($scope.unidad.opciones[i].selected == $scope.unidad.opciones[i].correcta) {
                                $scope.unidad.opciones[i].sticker = 'ok bien';
                                respuestasAcertadas++;
                            }
                        }

                    }
                    if (respuestasAcertadas === respuestasCorrectas) {
                        $scope.estadoUnidad = 'acierto';
                    } else {
                        $scope.estadoUnidad = 'fallo';
                    }
                };

                $scope.irASiguienteUnidad = function () {
                    $scope.siguienteUnidad = parseInt($routeParams.unidad) + 1;
                    console.log(parseInt($routeParams.unidad) + 1);
                    console.log($scope.unidad.totalUnidades);
                    console.log($scope.siguienteUnidad > $scope.unidad.totalUnidades);
                    if ($scope.siguienteUnidad > $scope.unidad.totalUnidades) {
                        var avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
                        var lids = JSON.parse(localStorage.getItem('lids' + $routeParams.modulo));
                        var indice = 0;
                        
                        /*Busca el indice basado en el id de la lección para actualizar e avance*/
                        for (var i in lids) {
                            if (lids[i] == $routeParams.leccion) {
                                indice = i;
                            }
                        }
                        avanceUsuario.lecciones[indice - 1] = 1;
                        
                        /* Mira cuantas lecciones se han terminaddo para dar un resultado final */
                        var contador = 0;
                        for (var i in avanceUsuario.lecciones) {
                            if (avanceUsuario.lecciones[i] == 1) {
                                contador++;
                            }
                        }
                        avanceUsuario.leccionesTerminadas = contador;
                        localStorage.setItem("avanceUsuario", JSON.stringify(avanceUsuario));

                        $location.path('/m/' + $routeParams.modulo + "/" + $routeParams.leccion + "/" + $routeParams.unidad + "/leccion-terminada");
                    } else {
                        $location.path('/m/' + $routeParams.modulo + "/" + $routeParams.leccion + "/" + $scope.siguienteUnidad);
                    }
                };

                $scope.reiniciarUnidad = function () {
                    for (var i in $scope.unidad.opciones) {
                        if ($scope.unidad.opciones[i].selected) {
                            $scope.unidad.opciones[i].estilo = '';
                            $scope.unidad.opciones[i].selected = false;
                            $scope.unidad.opciones[i].evaluacion = false;
                            $scope.unidad.opciones[i].sticker = 'remove mal';
                            respuestasSeleccionadas = 0;
                        }
                    }

                    $scope.estadoUnidad = 'espera';
                    $scope.botonCalificar.estilo = 'no-activo';
                    $scope.botonCalificar.disabled = 'disabled';
                };
            }])
        .directive('opcionesUnidadInfo', function () {
            return {
                restrict: 'E',
                scope: {
                    info: '=',
                    colspan: '=',
                    index: '@'
                },
                templateUrl: 'views/directives/opcionesUnidadInfo.html',
                link: function ($scope, $element, $attrs) {
                    $scope.click = function () {
                        $scope.$parent.seleccionarOpcion($scope.index);
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
                        $scope.$parent.reiniciarUnidad();
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
                    $scope.siguienteUnidad = function () {
                        $scope.$parent.irASiguienteUnidad();
                    };
                }
            };
        })

        ;