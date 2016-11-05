(function () {
    'use strict';
    angular.module('app.login')
        .controller('registerController',registerController);

    registerController.$inject = ['$scope', 'loginService', 'flashService', '$rootScope'];
    function registerController($scope, loginService, flashService, $rootScope) {
        $scope.dataLoading = false;
        $scope.user = {};

        var registerFn = function () {
            $scope.dataLoading = true;
            loginService.registerUser($scope.user)
                .then(function (data) {
                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateSuccess('Register with sucess!');
                })
                .catch(function (error) {
                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateError(error);
                });
        };

        $scope.register = registerFn;
    }
})();