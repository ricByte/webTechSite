(function () {
    'use strict';

    angular
        .module('app.login')
        .service('loginService', loginService);

    loginService.$inject = ['BaseHttpClientService', '$q', '$timeout', '$state'];

    function loginService(BaseHttpClientService, $q, $timeout, $state) {

        var loginAs = function (user, password) {
            var data = {
                    email: user,
                    password: password
                },
                deferred = $q.defer();

            BaseHttpClientService.doPost('/login', data)
                .then(function (data) {
                    var loginData = data.data.content;
                    if (loginData.loginStatus) {
                        deferred.resolve(loginData);
                    } else {
                        deferred.reject('Password or username incorrect');
                    }
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        var registerUser = function (user) {
            var data = {
                    email: user.email,
                    password: user.password,
                    nickname: user.username,
                    cleverness: user.cleverness,
                    typeOfPlayer: user.typeOfPlayer
                },
                deferred = $q.defer();

            BaseHttpClientService.doPost('/register', data)
                .then(function (data) {
                    var registerData = data.data.content.registerObject;
                    if (registerData.RegisterStatus) {
                        deferred.resolve(registerData);
                        $timeout($state.go('app.login', 3000));
                    } else {
                        deferred.reject('User already registered');
                    }
                })
                .catch(function (error) {
                    deferred.reject('Can\'t connect with the server');
                });

            return deferred.promise;
        };

        return {
            loginAs: loginAs,
            registerUser: registerUser
        };
    }

})();