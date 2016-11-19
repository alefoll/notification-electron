(() => {
    angular.module('Notification')
        .controller('NotificationController', ['$scope', ($scope) => {
            $scope.test = true;
        }]);
})();