/*
 * Configuración de angular para la aplicación Web de nutrifami
 */

'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('nutrifamiWeb', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
 
        .otherwise({ redirectTo: '/login' });
}])

 
.run(['$rootScope', '$location', '$cookieStore',
    function ($rootScope, $location, $cookieStore) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        nutrifami.getSessionId();
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);