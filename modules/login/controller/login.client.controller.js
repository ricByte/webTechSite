'use strict';


angular.module('app')
    .controller('loginController', ['$scope',
        function ($scope) {
            // This provides Authentication context.
            $scope.demoText = "LoginController";
        }
    ]);