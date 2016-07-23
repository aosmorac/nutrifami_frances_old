nutrifamiApp.controller('HeaderController', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {

        $scope.informacion = false;
        $scope.breadcrumb = true;
        $scope.home = false;
        $scope.links = [];

        if ($location.$$path === '/') {
            $scope.home = true;
            $scope.breadcrumb = false;
        }

        if ($location.$$path === '/perfil' || $location.$$path === '/editar-perfil') {
            $scope.informacion = true;
            $scope.breadcrumb = false;
        }
        
        for(var link in $routeParams){
            $scope.links.push($routeParams[link]);
        }
    }
]);
