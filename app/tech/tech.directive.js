//custom AngularJS element directive
angular.module('app')
    .directive('tech', function() {
    return {
        restrict: 'E',
        templateUrl: './app/tech/tech.directive.html'
    };
});