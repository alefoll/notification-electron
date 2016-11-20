(() => {
    const { remote } = require('electron');

    const Config = remote.require('./electron/Config');

    angular.module('Notification')
        .factory('$auth', ['$http', '$q', ($http, $q) => {
            let token = "";

            const authenticate = (username, password) => {
                return $q((resolve, reject) => {
                    $http({
                        method : 'POST',
                        url    : `${Config.get("socket.address")}/auth`,
                        data   : {
                            username: username,
                            password: password
                        }
                    }).then((data) => {
                        token = data.data.token;

                        resolve(token);
                    }, (error) => {
                        reject(error);
                    });
                });
            }

            const valid = () => {
                return token !== ""; // To do : check token validity
            }

            return {
                authenticate : authenticate,
                valid        : valid,

                token: token
            }
        }])
})();