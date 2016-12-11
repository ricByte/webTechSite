(function () {
    'use strict';
    angular.module('app.question')
        .controller('homeQuestionController', homeQuestionController);

    homeQuestionController.$inject = ['$scope', 'questionService'];
    function homeQuestionController($scope, questionService) {
        $scope.dataLoading = true;
        $scope.diff = questionService.getDifficulty();

        questionService.getQuestion(['all'])
            .then(function (data) {
                $scope.dataLoading = false;
                $scope.questions = data.questionList;
            })
    }
})();