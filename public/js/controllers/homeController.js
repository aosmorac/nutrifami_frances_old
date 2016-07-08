/*global angular*/
angular.module('NutrifamiWeb')
        .controller('HomeController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
                'use strict';
                var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
                $scope.usuarioActivo = usuarioActivo;
                $scope.home = "active";

                $scope.modulos = [{
                        id: 1,
                        url:'alimentacion-saludable',
                        titulo: 'Alimentación Saludable',
                        imagen: '01-alimentacion-saludable/01-alimentacion-saludable.png',
                        activo: true,
                        lecciones: 6,
                        completadas: 2,
                        porcentaje: function(){
                            return (100/this.lecciones*this.completadas);
                        },
                        completo: false
                    },
                    {
                        id: 2,
                        url:'beneficios-y-propiedades-de-los-alimentos',
                        titulo: 'Benificios y propiedades de los alimentos',
                        imagen: '01-alimentacion-saludable/02-beneficios-propiedades-alimentos.png',
                        activo: false,
                        lecciones: 9,
                        completadas: 0,
                        porcentaje: function(){
                            return (100/this.lecciones*this.completadas);
                        },
                        completo: false
                    },
                    {
                        id: 3,
                        url:'alimentacion-balanceada-saludable',
                        titulo: 'Alimentación balanceada y saludable',
                        imagen: '01-alimentacion-saludable/03-alimentacion-balanceada-saludable.png',
                        activo: false,
                        lecciones: 6,
                        completadas: 0,
                        porcentaje: function(){
                            return (100/this.lecciones*this.completadas);
                        },
                        completo: false
                    },
                    {
                        id: 4,
                        url:'los-colores-alimenticios',
                        titulo: 'Los colores alimenticios',
                        imagen: '01-alimentacion-saludable/04-colores-alimentos.png',
                        activo: false,
                        lecciones: 6,
                        completadas: 0,
                        porcentaje: function(){
                            return (100/this.lecciones*this.completadas);
                        },
                        completo: false
                    }];
            }]).directive('modulosInfo', function () {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'views/directives/modulosInfo.html'
    };
});
