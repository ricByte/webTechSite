'use strict';


angular.module('app').controller('HeaderController', headerController);

headerController.$inject = ['$scope', '$rootScope'];

function headerController($scope, $rootScope) {
    $scope.prova = 'asd';
    $rootScope.$watch('userLogged', function (newValue, oldValue) {
        if (newValue)
            $scope.userLogged = $rootScope.userLogged;
    });
}

