(function () {
    'use strict';
    angular.module('app.login')
        .controller('questionController', questionController);

    questionController.$inject = ['$scope', '$rootScope', 'questionService', 'flashService', '$state', '$stateParams', '$timeout'];
    function questionController($scope, $rootScope, questionService, flashService, $state, $stateParams, $timeout) {
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

            questionService.sendQuestion($scope.formInput, $rootScope.userLogged.loginStatus.session)
                .then(function (data) {

                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateSuccess('Question saved succesfully');

                    $timeout(function () {

                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });

                    }, 3000);

                })
                .catch(function (error) {
                    $scope.dataLoading = false;
                    $scope.flash = flashService.generateError(error);
                });

        };

        $scope.sq = sendQuestionFn;
        $scope.addAnswer = addAnswer;

        addAnswer();
    }
})();