/*global angular*/
nutrifamiApp.controller('EditarPerfilController', ['$scope', '$location', 'PerfilService', '$rootScope', '$anchorScroll', function ($scope, $location, PerfilService, $rootScope, $anchorScroll) {
        'use strict';
        $anchorScroll();

        var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.usuarioActivo = usuarioActivo;
        $scope.informacion = "active";
        var genero = usuarioActivo.genero;
        if ($scope.usuarioActivo.genero.toUpperCase() === 'F') {
            $scope.usuarioActivo.genero = 'Femenino';
        } else {
            $scope.usuarioActivo.genero = 'Masculino';
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
            selectedOption: {id: usuarioActivo.etnia, name: usuarioActivo.etnia}
        };
        $scope.usuarioActivo.birthdate = new Date($scope.usuarioActivo.birthdate);
        $scope.update = function () {
            $scope.dataLoading = true;
            usuarioActivo = $scope.usuarioActivo;
            usuarioActivo.genero = $scope.usuarioActivo.generos.selectedOption.id;
            usuarioActivo.etnia = $scope.usuarioActivo.etnias.selectedOption.id;
            var tempMonth = $scope.usuarioActivo.birthdate.getMonth() + 1;
            if (tempMonth < 10) {
                tempMonth = "0" + tempMonth;
            }
            $scope.usuarioActivo.birthdate = $scope.usuarioActivo.birthdate.getFullYear() + "-" + tempMonth + "-" + $scope.usuarioActivo.birthdate.getDate();
            delete usuarioActivo["generos"];
            delete usuarioActivo["etnias"];
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
            PerfilService.editarUsuario(usuarioActivo, function (response) {

                if (response.success) {
                    $rootScope.mensaje = {
                        estado: true,
                        texto: "Los datos han sido guardado con éxito",
                        tiempo: 2500
                    };
                    $location.path('/perfil');
                }
                $scope.dataLoading = false;
            });

        };
    }]);

nutrifamiApp.filter('capitalize', function () {
    'use strict';
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});