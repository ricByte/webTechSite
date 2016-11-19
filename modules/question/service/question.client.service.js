(function () {
    'use strict';

    angular
        .module('app.login')
        .service('questionService', questionService);

    questionService.$inject = ['BaseHttpClientService', '$q', '$timeout', '$state'];

    function questionService(BaseHttpClientService, $q, $timeout, $state) {

        /**
         * @function
         * send question to endpoint
         *
         * @param {Object} questionText
         * @param {String} userSession
         *
         * @return {Object}
         **/
        var sendQuestion = function (question, session) {

            var deferred = $q.defer(),
                data = {
                    question: question,
                    session: session
                };



            BaseHttpClientService.doPost('/question', data)
                .then(function (data) {
                    deferred.resolve(data);
                })
                .catch(function (error) {
                    deferred.reject('Can\'t connect with the server');
                });

            return deferred.promise;

        };

        /**
         * @function
         * construct for question to send to endpoint
         *
         * @param {Array} answers
         * @param {String} questionText
         * @param {int} difficulty
         * @param {int} solutionNumber
         *
         * @return {Object}
         **/
        var createQuestionObject = function (answers, questionText, difficulty, solutionNumber) {
            return {
                'question': {
                    'answers': answers,
                    'text': questionText,
                    'difficulty': difficulty,
                    'solution': solutionNumber
                }
            }
        };

        /**
         * @function
         * construct for answer to send to endpoint
         *
         * @param {String} answerText
         * @param {int} type
         * @param {int} answerNumber
         *
         * @return {Object}
         **/
        var createAnswerObject = function (answerText, type, answerNumber) {
            return {
                'text': answerText,
                'type': getTypes()[type],
                'num': answerNumber
            }
        };

        /**
         * @function
         * possible type of answer
         *
         * @param {int} type
         *
         * @return {String} possible type of answer
         **/
        var getTypes = function() {

            return [
                'text',
                'link',
                'image'
            ];

        };


        /**
         * @function
         * possible type of answer
         *
         * @param {int} type
         *
         * @return {String} possible type of answer
         **/
        var _getDifficulty = function() {

            return [
                'Base',
                'Normal',
                'Average',
                'Difficult'
            ];

        };

        return {
            sendQuestion: sendQuestion,
            createQuestionObject: createQuestionObject,
            createAnswerObject: createAnswerObject,
            getTypes: getTypes,
            getDifficulty:_getDifficulty
        };
    }

})();