/*global angular*/
angular.module('NutrifamiWeb')
        .controller('ModuloController', ['$rootScope', '$scope', '$location', '$routeParams', function ($rootScope, $scope, $location, $routeParams) {
                'use strict';
                var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.usuarioActivo = usuarioActivo;
                $scope.modulo = $routeParams.modulo;

                $scope.lecciones = [{
                        id: 1,
                        titulo: '¿Qué es Alimentación?',
                        completo: true,
                        completado: function(){
                            if (this.completo){
                                return ('leccion-terminada');
                            }
                        }
                    },
                    {
                        id: 2,
                        titulo: '¿Para qué sirve la alimentación?',
                        completo: true,
                        completado: function(){
                            if (this.completo){
                                return ('leccion-terminada');
                            }
                        }
                    },
                    {
                        id: 3,
                        titulo: '¿Qué es alimentación saludable?',
                        completo: false,
                        completado: function(){
                            if (this.completo){
                                return ('leccion-terminada');
                            }
                        }
                    },
                    {
                        id: 4,
                        titulo: '¿Para qué tener una alimentación saludable?',
                        completo: false,
                        completado: function(){
                            if (this.completo){
                                return ('leccion-terminada');
                            }
                        }
                    },
                    {
                        id: 5,
                        titulo: '¿Cuáles son los principios de una alimentación saludable?',
                        completo: false,
                        completado: function(){
                            if (this.completo){
                                return ('leccion-terminada');
                            }
                        }
                    },
                    {
                        id: 6,
                        titulo: '¿Por qué una alimentación variada?',
                        completo: false,
                        completado: function(){
                            if (this.completo){
                                return ('leccion-terminada');
                            }
                        }
                    }];
            }]).directive('leccionesInfo', function () {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'js/directives/leccionesInfo.html'
    };
});