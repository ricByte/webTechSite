'use strict';

// Setting up route
angular.module('app.login')
    .config(['$stateProvider', '$urlRouterProvider', 'CONSTANT', loginRoutes]);

function loginRoutes($stateProvider, $urlRouterProvider, CONSTANT) {
    var loginBasePath = CONSTANT.basePathHtml + 'login/views/';
    $urlRouterProvider.otherwise('login');
    $stateProvider
        .state('app.login', {
            url: '/login',
            views: {
                '': {
                    templateUrl: loginBasePath + 'login.client.view.html',
                    controller: 'loginController'
                }
            }
        })
        .state('app.register', {
            url: '/register',
            views: {
                '': {
                    templateUrl: loginBasePath + 'register.client.view.html',
                    controller: 'registerController'
                }
            }
        });
}
