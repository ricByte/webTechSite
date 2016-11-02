(function () {
    'use strict';
    angular.module('app.login')
        .controller('loginController',loginController);

    loginController.$inject = ['$scope', 'loginService', 'flashService'];
    function loginController($scope, loginService, flashService) {
        $scope.dataLoading = false;
        $scope.username = 'email';
        $scope.password = 'password';
        $scope.text = 'Login';

        var loginFn = function () {
            $scope.dataLoading = true;
            loginService.loginAs($scope.username, $scope.password)
                .then(function (data) {
                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateSuccess('Logged in!');
                })
                .catch(function (error) {
                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateError(error);
                });
        };

        $scope.login = loginFn;
    }
})();