(function() {
    'use strict';

    angular
        .module('app.login')
        .factory('flashService', flashService);

    flashService.$inject = [];

    function flashService() {

        var _generateError = function (message) {
            return _generateFlash('error', message)
        };

        var _generateSuccess = function (message) {
            return _generateFlash('success', message)
        };

        var _generateFlash = function (type, message) {
            return {
                type: type,
                message: message
            };
        };

        return {
            generateSuccess : _generateSuccess,
            generateError: _generateError,
            generateCustomFlash: _generateFlash
        };
    }
})();
