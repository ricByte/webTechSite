'use strict';

// Setting up route
angular.module('app')
    .constant('CONSTANT', {
        basePathHtml: 'modules/'
    })
    .config(['$stateProvider', '$urlRouterProvider', appRoutes]);

function appRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
        url: '/',
        views: {
            'header@app': {
                templateUrl: 'modules/app/views/header.client.view.html',
                controller: 'HeaderController'
            },
            '': {
                templateUrl: 'modules/app/views/app.client.view.html',
                controller: 'AppController'
            }
        }
    });
}