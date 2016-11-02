(function () {
    'use strict';

    angular
        .module('app.login')
        .service('loginService', loginService);

    loginService.$inject = ['BaseHttpClientService', '$q'];

    function loginService(BaseHttpClientService, $q) {

        var loginAs = function (user, password) {
            var data = {
                email: user,
                password: password
            },
            deferred = $q.defer();

            BaseHttpClientService.doPost('/login', data)
                .then(function (data) {
                    var loginData = data.data.content;
                    if(loginData.loginStatus){
                        deferred.resolve(loginData);
                    }else{
                        deferred.reject('Password or username incorrect');
                    }
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        return {
            loginAs: loginAs
        };
    }

})();