/*global angular*/
angular.module('NutrifamiWeb')
        .controller('LeccionTerminadaController', ['$rootScope', '$scope', '$location', '$routeParams', function ($rootScope, $scope, $location, $routeParams) {
                'use strict';

                $scope.mensaje = "Ha finalizado la leccion";

            }]);
        