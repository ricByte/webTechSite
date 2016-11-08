'use strict';

// Setting up route
angular.module('app.question')
    .config(['$stateProvider', '$urlRouterProvider', 'CONSTANT', questionRoutes]);

function questionRoutes($stateProvider, $urlRouterProvider, CONSTANT) {
    var questionBasePath = CONSTANT.basePathHtml + 'question/views/';
    $urlRouterProvider.otherwise('login');
    $stateProvider
        .state('app.question', {
            url: '/question/create',
            views: {
                '': {
                    templateUrl: questionBasePath + 'question.client.view.html',
                    controller: 'questionController'
                }
            }
        });
}
