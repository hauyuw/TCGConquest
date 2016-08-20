//custom AngularJS element directive
angular.module('app')
    .directive('upgrades', function() {
    return {
        restrict: 'E',
        templateUrl: './app/upgrades/upgrades.directive.html'
    };
});