/*global angular*/
angular.module('NutrifamiWeb').controller('EditarPerfilController', ['$scope','$location', 'PerfilService', '$rootScope' ,function ($scope,$location,PerfilService,$rootScope) {
        'use strict';

        var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        if (usuarioActivo.genero === 'F') {
            $scope.genero = 'femenino';
        } else {
            $scope.genero = 'masculino';
        }
        $scope.usuario = {};
        $scope.usuario.nombre = usuarioActivo.nombre;
        $scope.usuario.apellido = usuarioActivo.apellido;
        $scope.usuario.documento = usuarioActivo.login_documento;
        $scope.usuario.edad = usuarioActivo.edad;
        $scope.usuario.generos = {
            availableOptions: [
                {id: 'F', name: 'Femenino'},
                {id: 'M', name: 'Masculino'},
            ],
            selectedOption: {id: usuarioActivo.genero, name: $scope.genero}
        };
        $scope.usuario.etnias = {
            availableOptions: [
                {id: 'AFROCOLOMBIANOS', name: 'Afrocolombianos'},
                {id: 'INDIGENA', name: 'Indigenas'},
                {id: 'MESTIZO', name: 'Mestizo'},
                {id: 'OTROS', name: 'Otros'},
                {id: 'NINGUNO', name: 'Ninguno'}
            ],
            selectedOption: {id: usuarioActivo.etnia, name: usuarioActivo.etnia} //This sets the default value of the select in the ui
        };

        $scope.usuario.nacimiento = new Date(); //Verificar por el valor real de la base de datos.
        $scope.usuario.departamento = usuarioActivo.departamento;
        $scope.usuario.municipio = usuarioActivo.municipio;
        $scope.usuario.comunidad = usuarioActivo.comunidad;

        $scope.update = function () {
            $scope.dataLoading = true;
            usuarioActivo.nombre =  $scope.usuario.nombre;
            usuarioActivo.apellido =  $scope.usuario.apellido;
            usuarioActivo.edad =  $scope.usuario.edad;
            usuarioActivo.birthdate =  $scope.usuario.birthdate;
            usuarioActivo.genero =  $scope.usuario.generos.selectedOption.id;
            usuarioActivo.etnia =  $scope.usuario.etnias.selectedOption.id;
            usuarioActivo.departamento =  $scope.usuario.departamento;
            usuarioActivo.municipio =  $scope.usuario.municipio;
            usuarioActivo.comunidad =  $scope.usuario.comunidad;
            usuarioActivo.edad = $scope.usuario.edad;
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
            PerfilService.editarUsuario(usuarioActivo,function(response){
                
                if(response.success){
                    alert(response.message);
                    $rootScope.message.text = "Los datos se han guardado con éxito";
                    $location.path('/perfil');
                }
                $scope.dataLoading = false;
            });
            
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