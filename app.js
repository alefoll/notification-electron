const mysql  = require('mysql'),
      config = require('./config.json');

const connection = mysql.createConnection({
	host     : config.database.host,
	user     : config.database.user,
	password : config.database.password,
	database : config.database.database
});

const app = angular.module('Notification', [ 'ngMaterial' ]);

app.factory('NotificationService', ['$q', ($q) => {
	return {
		getNotifications: () => {
			return $q((resolve, reject) => {

				connection.query('SELECT * FROM notif', (err, rows, fields) => {
					if (err)
						throw err;

					resolve(rows);
				});

			});
		}
	};
}]);

app.controller('NotificationController', ['$scope', 'NotificationService', ($scope, NotificationService) => {
	$scope.reload = () => {
		NotificationService.getNotifications().then((notifications) => {
			$scope.notifications = notifications;

			// $scope.notifications.forEach((notification) => {
			// 	new Notification(notification.title, {
			// 		body: notification.text
			// 	})
			// });
		});
	}

	$scope.reload();
}]);