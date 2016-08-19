angular.module('app')
    .directive('footer', function() {
    return {
        restrict: 'E',
        templateUrl: './app/layout/footer.directive.html'
    };
});