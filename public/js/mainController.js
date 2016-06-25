/*
 * Configuración de angular para la aplicación Web de nutrifami
 */
dependencies = ['Authentication', 'ngRoute', 'ngCookies'];
'use strict';

// declare modules
angular.module('Authentication', []);

angular.module('NutrifamiWeb', dependencies)

.config(['$routeProvider', function($routeProvider) {
    'use strict';

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })

    .when('/', {
        controller: 'HomeController',
        templateUrl: 'views/home.tpl.html'
    })

    .otherwise({ redirectTo: '/login' });
}])


.run(['$rootScope', '$location', '$cookieStore',
    function($rootScope, $location, $cookieStore) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        nutrifami.getSessionId();
        console.log($rootScope.globals.currentUser);

        if ($rootScope.globals.currentUser) {
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line

        }

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }
]);
