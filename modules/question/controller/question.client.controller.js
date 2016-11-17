(function () {
    'use strict';
    angular.module('app.login')
        .controller('questionController', questionController);

    questionController.$inject = ['$scope', '$rootScope', 'questionService'];
    function questionController($scope, $rootScope, questionService) {
        $scope.dataLoading = false;
        $scope.possibleType = questionService.getTypes();
        $scope.questionReponse = 0;
        $scope.diff = questionService.getDifficulty();

        $scope.formInput = {
            answers: []
        };

        var addAnswer = function () {

            var tempAnswer = questionService.createAnswerObject("", 0, ($scope.formInput.answers.length + 1));
            $scope.formInput.answers.push(tempAnswer);

        };

        var sendQuestionFn = function () {

            $scope.dataLoading = true;

            loginService.loginAs($scope.username, $scope.password)
                .then(function (data) {
                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateSuccess('Logged in!');
                    $rootScope.userLogged = data;
                })
                .catch(function (error) {
                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateError(error);
                });

            questionService.sendQuestion(quesion, session);
        };

        $scope.sq = sendQuestionFn;
        $scope.addAnswer = addAnswer;

        addAnswer();
    }
})();