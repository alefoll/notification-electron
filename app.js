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
	return $q((resolve, reject) => {
		connection.connect();

		connection.query('SELECT * FROM notif', (err, rows, fields) => {
			if (err)
				throw err;

			resolve(rows);
		});

		connection.end();
	});
}]);

app.controller('NotificationController', ['$scope', 'NotificationService', ($scope, NotificationService) => {
	NotificationService.then((notifications) => {
		$scope.notifications = notifications;
	});
}]);