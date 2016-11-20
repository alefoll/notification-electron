(() => {
    angular.module('Notification')
        .controller('NotificationController', ['$scope', '$notifications', ($scope, $notifications) => {
            $scope.notifications = $notifications.get;
            $scope.update        = $notifications.update;
        }]);
})();