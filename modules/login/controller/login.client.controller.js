(function () {
    'use strict';
    angular.module('app.login')
        .controller('loginController',loginController);

    loginController.$inject = ['$scope', 'loginService', 'flashService', '$rootScope', '$state', '$timeout', 'userConstant'];
    function loginController($scope, loginService, flashService, $rootScope, $state, $timeout, userConstant) {
        $scope.dataLoading = false;
        $scope.username = 'reackonly';
        $scope.password = 'password';
        $scope.text = 'Login';

        var loginFn = function () {
            $scope.dataLoading = true;
            loginService.loginAs($scope.username, $scope.password)
                .then(function (data) {

                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateSuccess('Logged in!');

                    $rootScope.userLogged = data;

                    if (loginService.getTypeOfPlayer(data.loginStatus.User.typeOfPlayer) === userConstant.typeOfPlayer.Editore) {
                        $state.go('app.question.list');
                    }
                })
                .catch(function (error) {
                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateError(error);
                });
        };

        $scope.login = loginFn;
    }
})();