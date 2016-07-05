/*global angular*/
angular.module('NutrifamiWeb').controller('EditarPerfilController', ['$scope','$location', 'PerfilService', '$rootScope' ,function ($scope,$location,PerfilService,$rootScope) {
        'use strict';

        var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.usuarioActivo = usuarioActivo;
        $scope.informacion="active";
        var genero = usuarioActivo.genero;
        if (usuarioActivo.genero === 'F' || usuarioActivo.genero === 'f') {
            $scope.usuarioActivo.genero = 'femenino';
        } else {
            $scope.usuarioActivo.genero = 'masculino';
        }
        $scope.usuarioActivo.generos = {
            availableOptions: [
                {id: 'f', name: 'Femenino'},
                {id: 'm', name: 'Masculino'},
            ],
            selectedOption: {id: genero, name: $scope.usuarioActivo.genero}
        };
        $scope.usuarioActivo.etnias = {
            availableOptions: [
                {id: 'AFROCOLOMBIANOS', name: 'Afrocolombianos'},
                {id: 'INDIGENA', name: 'Indigenas'},
                {id: 'MESTIZO', name: 'Mestizo'},
                {id: 'OTROS', name: 'Otros'},
                {id: 'NINGUNO', name: 'Ninguno'}
            ],
            selectedOption: {id: usuarioActivo.etnia, name: usuarioActivo.etnia} //This sets the default value of the select in the ui
        };
        $scope.usuarioActivo.nacimiento = new Date(); //Verificar por el valor real de la base de datos.
        $scope.update = function () {
            $scope.dataLoading = true;
            usuarioActivo = $scope.usuarioActivo;
            usuarioActivo.genero =  $scope.usuarioActivo.generos.selectedOption.id;
            usuarioActivo.etnia =  $scope.usuarioActivo.etnias.selectedOption.id;
            delete usuarioActivo["generos"];
            delete usuarioActivo["etnias"];
            console.log(usuarioActivo);
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
            PerfilService.editarUsuario(usuarioActivo,function(response){
                
                if(response.success){
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