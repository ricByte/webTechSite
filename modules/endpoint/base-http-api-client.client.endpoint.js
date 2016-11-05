(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('BaseHttpClientService', BaseHttpClientService);

    BaseHttpClientService.$inject = ['$http', '$q', '$log'];

    function BaseHttpClientService($http, $q, $log) {
        var baseUrl = 'http://localhost:8080/web-tech-quiz';
        var _getConfigHeader = function () {
            return {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        };

        var _defaultSuccessHandler = function (url, deferred, data, status, headers, config) {
            deferred.resolve({
                url: url,
                data: data,
                status: status,
                headers: headers,
                config: config
            });
        };

        var _defaultErrorHandler = function (url, deferred, data, status, headers, config) {
            deferred.reject({
                url: url,
                data: data,
                status: status,
                headers: headers,
                config: config
            });
        };

        var _serializeGetData = function (data) {
            var initString = '',
                concatSymbol = '&',
                equal = '=';

            if (data) {
                initString = '?';
            }
            angular.forEach(data, function (value, key) {

                if (initString !== '?') {
                    initString += concatSymbol
                }
                initString += key.toString() + equal + value.toString();

            });

            return initString;
        };

        var doPost = function (url, data) {
            url = baseUrl + url;
            $log.debug('POST: %s', url);

            var requestOptions = _getConfigHeader();
            var deferred = $q.defer();

            var bodyData = JSON.stringify(data);

            $http.post(url, bodyData, requestOptions)
                .success(function (data, status, headers, config) {
                    _defaultSuccessHandler(url, deferred, data, status, headers, config);
                })
                .error(function (data, status, headers, config) {
                    _defaultErrorHandler(url, deferred, data, status, headers, config);
                });

            return deferred.promise;
        };

        var doGet = function (url, data) {
            url = baseUrl + url;
            $log.debug('GET: %s', url);

            var deferred = $q.defer(),
                requestOptions = _getConfigHeader(),
                requestData = _serializeGetData(data),
                requestUrl = url + requestData;


            $http.get(requestUrl, requestOptions)
                .success(function (data, status, headers, config) {
                    _successHandler(url, deferred, data, status, headers, config);
                })
                .error(function (data, status, headers, config) {
                    _errorHandler(url, deferred, data, status, headers, config);
                });
            return deferred.promise;
        };

        return {
            doGet: doGet,
            doPost: doPost
        };
    }
})();
