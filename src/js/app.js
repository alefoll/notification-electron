(() => {
    angular.module('Notification', ['ngMaterial']);

    document.addEventListener('DOMContentLoaded', () => {
        angular.bootstrap(document, ['Notification']);
    }, false);
})();
