/*global angular*/
nutrifamiApp.controller('UnidadController', ['$scope', '$location', '$routeParams', '$anchorScroll', 'ngAudio', 'bsLoadingOverlayService', '$timeout', '$uibModal', '$log', function ($scope, $location, $routeParams, $anchorScroll, ngAudio, bsLoadingOverlayService, $timeout, $uibModal, $log) {
        'use strict';
        $anchorScroll();

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };




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

        $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.estadoUnidad = 'espera';

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

            /*Verifica si la unidad tienen audio y lo carga*/
            if (typeof $scope.unidad.audio !== 'undefined') {
                $scope.unidad.audio.audio = ngAudio.load($scope.unidad.audio.url);
            }
        } catch (err) {
            /* Se debe verificar que se este en la unidad actual y que que se acceda atraves del navegador*/
            $location.path('/');
        }

        /* Obtenemos la cantidad de respuestas correctas*/
        var respuestasCorrectas = 0;
        var respuestasSeleccionadas = 0;
        for (var i in $scope.unidad.opciones) {
            if ($scope.unidad.opciones[i].correcta == 1) {
                respuestasCorrectas++;
            }
            $scope.unidad.opciones[i].selected = false;
            $scope.unidad.opciones[i].evaluacion = false;
            $scope.unidad.opciones[i].pareja = '';
            $scope.unidad.opciones[i].match = '';

            /*Verifica si la opcion tienen audio y lo carga*/
            if (typeof $scope.unidad.opciones[i].audio !== 'undefined') {
                $scope.unidad.opciones[i].audio.audio = ngAudio.load($scope.unidad.opciones[i].audio.url);
            }
        }

        $scope.botonCalificar = false;

        $scope.seleccionarOpcion = function (index) {
            if ($scope.unidad.opciones[index].selected) {
                $scope.unidad.opciones[index].selected = false;
                respuestasSeleccionadas--;
            } else {
                $scope.unidad.opciones[index].selected = true;
                respuestasSeleccionadas++;
            }

            if (respuestasCorrectas === 1) {
                for (var i in $scope.unidad.opciones) {
                    if (i !== index) {
                        if ($scope.unidad.opciones[i].selected) {
                            $scope.unidad.opciones[i].selected = false;
                            $scope.unidad.opciones[i].evaluacion = false;
                            respuestasSeleccionadas--;
                        }
                    }
                }
            }

            if (respuestasSeleccionadas === respuestasCorrectas) {
                $scope.botonCalificar = true;
            } else {
                $scope.botonCalificar = false;
            }
        };

        var parejasContador = 0;
        var pareja1Orden = 0;
        var pareja2Orden = 0;
        var pareja1Pos = 0;
        var pareja2Pos = 0;
        var parejasCorrectas = 0;

        $scope.seleccionarPareja = function (index) {
            if ($scope.unidad.opciones[index].selected) {
                $scope.unidad.opciones[index].selected = false;

                /*Borrar la respuesta correcta para validar más adelante si es una pareja*/
                parejasContador--;
            } else {
                $scope.unidad.opciones[index].selected = true;
                /*Almacenar la respuesta correcta para validar más adelante si es una pareja*/

                parejasContador++;
                if (parejasContador == 1) {
                    pareja1Orden = $scope.unidad.opciones[index].orden;
                    pareja1Pos = index;
                } else if (parejasContador == 2) {
                    pareja2Orden = $scope.unidad.opciones[index].orden;
                    pareja2Pos = index;

                    if (pareja1Orden == pareja2Orden) {
                        /*Estilos para la pareja actual*/
                        $scope.unidad.opciones[pareja2Pos].pareja = 'pareja-' + pareja2Orden;
                        $scope.unidad.opciones[pareja2Pos].selected = false;
                        $scope.unidad.opciones[pareja2Pos].match = 'match';

                        /*Estilos para pareja anterior*/
                        $scope.unidad.opciones[pareja1Pos].pareja = 'pareja-' + pareja2Orden;
                        $scope.unidad.opciones[pareja1Pos].selected = false;
                        $scope.unidad.opciones[pareja1Pos].match = 'match';

                        parejasContador = 0;
                        pareja1Pos = 0;
                        pareja2Pos = 0;
                        pareja1Orden = 0;
                        pareja2Orden = 0;

                        parejasCorrectas++;
                        if (parejasCorrectas == ($scope.unidad.opciones.length / 2)) {
                            /*Si las parejas correctas es igual a la mitad de la cantidad de opciones habilitar el botón de continuar*/
                            $scope.estadoUnidad = 'acierto';
                        }

                    } else {
                        $scope.unidad.opciones[pareja2Pos].pareja = '';
                        $scope.unidad.opciones[pareja2Pos].selected = false;
                        $scope.unidad.opciones[pareja2Pos].match = '';
                        $scope.unidad.opciones[pareja1Pos].pareja = '';
                        $scope.unidad.opciones[pareja1Pos].selected = false;
                        $scope.unidad.opciones[pareja1Pos].match = '';
                        parejasContador = 0;
                        pareja1Pos = 0;
                        pareja2Pos = 0;
                        pareja1Orden = 0;
                        pareja2Orden = 0;

                    }
                }
            }
        };

        $scope.calificarUnidad = function () {
            /* Validar si acerto o fallo*/
            var respuestasAcertadas = 0;
            for (var i in $scope.unidad.opciones) {
                if ($scope.unidad.opciones[i].selected) {
                    $scope.unidad.opciones[i].evaluacion = true;
                    if ($scope.unidad.opciones[i].selected == $scope.unidad.opciones[i].correcta) {
                        respuestasAcertadas++;
                    } else {
                        /* Almacena la respuesta incorrecta */
                        $scope.unidad.feedback = $scope.unidad.opciones[i].feedback;
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
            if ($scope.siguienteUnidad > $scope.unidad.totalUnidades) {
                var avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
                var lids = nutrifami.training.getLeccionesId($routeParams.modulo);
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
                $scope.unidad.opciones[i].selected = false;
                $scope.unidad.opciones[i].evaluacion = false;
                respuestasSeleccionadas = 0;
            }
            $scope.estadoUnidad = 'espera';
            $scope.botonCalificar = false;
        };
    }]);

nutrifamiApp.directive('opcionesUnidadInfo', function () {
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
});

nutrifamiApp.directive('parejasUnidadInfo', function () {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            index: '@'
        },
        templateUrl: 'views/directives/parejasUnidadInfo.html',
        link: function ($scope, $element, $attrs) {
            $scope.click = function () {
                $scope.$parent.seleccionarPareja($scope.index);
            };
        }
    };
});

nutrifamiApp.directive('calificarUnidad', function () {
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
});

nutrifamiApp.directive('reiniciarUnidad', function () {
    return {
        restrict: 'E',
        scope: {
            feedback: '='
        },
        templateUrl: 'views/directives/reiniciarUnidad.html',
        link: function ($scope, $element, $attrs) {
            $scope.reiniciar = function () {
                $scope.$parent.reiniciarUnidad();
            };
        }
    };
});

nutrifamiApp.directive('siguienteUnidad', function () {
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
});


nutrifamiApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});