'use strict';


angular.module('app')
    .controller('AppController', AppController);

AppController.$inject = ['$scope', '$rootScope', '$state'];

function AppController($scope, $rootScope, $state) {

    if (!$rootScope.userLogged) {
        $state.go('app.login');
    }

}
