angular.module('app')
    .directive('settings', function() {
    return {
        restrict: 'E',
        templateUrl: './app/layout/settings.directive.html'
    };
});