(() => {
    const { remote } = require('electron');

    const Config = remote.require('./electron/Config');

    angular.module('Notification')
        .factory('$notifications', ['$auth', '$timeout', ($auth, $timeout) => {
            let notifications = [];
            let socket;

            if (!$auth.valid()) {
                $auth.authenticate(Config.get("socket.username"), Config.get("socket.password")).then((token) => {
                    socket = io(Config.get("socket.address"), {
                        'query': 'token=' + token
                    });

                    socket.on('notifications', (data) => {
                        $timeout(() => {
                            notifications = data.notifications;
                        });
                    });
                }, (error) => {
                    throw new Error(error);
                })
            }

            const get = () => {
                return notifications;
            }

            const update = () => {
                if ($auth.valid())
                    socket.emit('get');
            }

            return {
                get    : get,
                update : update
            }
        }]);
})();