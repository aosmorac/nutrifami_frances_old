/*global angular*/
angular.module('NutrifamiWeb').controller('EditarPerfilController', ['$scope', function ($scope) {
        'use strict';

        var usuarioA = JSON.parse(localStorage.getItem('usuarioActivo'));

        if (usuarioA.genero === 'F') {
            $scope.genero = 'femenino';
        } else {
            $scope.genero = 'masculino';
        }
        $scope.usuario = {};
        $scope.usuario.nombre = usuarioA.nombre;
        $scope.usuario.apellido = usuarioA.apellido;
        $scope.usuario.documento = usuarioA.login_documento;
        $scope.usuario.generos = {
            availableOptions: [
                {id: 'F', name: 'Femenino'},
                {id: 'M', name: 'Masculino'},
            ],
            selectedOption: {id: usuarioA.genero, name: $scope.genero}
        };
        $scope.usuario.etnias = {
            availableOptions: [
                {id: 'AFROCOLOMBIANOS', name: 'Afrocolombianos'},
                {id: 'INDIGENA', name: 'Indigenas'},
                {id: 'MESTIZO', name: 'Mestizo'},
                {id: 'OTROS', name: 'Otros'},
                {id: 'NINGUNO', name: 'Ninguno'}
            ],
            selectedOption: {id: usuarioA.etnia, name: usuarioA.etnia} //This sets the default value of the select in the ui
        };

        $scope.usuario.nacimiento = new Date(); //Verificar por el valor real de la base de datos.

        /* Falta incluir en los valores de departamento y municipio de la base de datos*/

        $scope.usuario.comunidad = usuarioA.comunidad;

        $scope.update = function () {
            console.log($scope.usuario);
            console.log("Enviar a la API para actualizar la base de datos");
        };
    }]).filter('capitalize', function () {
    'use strict';
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});