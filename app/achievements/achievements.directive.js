//custom AngularJS element directive
angular.module('app')
    .directive('achievements', function() {
    return {
        restrict: 'E',
        templateUrl: './app/achievements/achievements.directive.html'
    };
});