(function () {
    var app = angular.module('app');
    app.controller('techController', ['$scope', 'config', 'techList', 'notificationService', function($scope, config, techList, notificationService) {
        $scope.techList = techList;
        $scope.obj = null;
        $scope.techName = 'Spend rare cards to make your business grow';
        $scope.techDesc = 'Click on a technology to learn more about each';
        $scope.techCost;
        
        $scope.disableBtn = function(obj) {
            if (!$scope.checkAvailability(obj) && $scope.isOwned(obj)) {
                return false;
            } else if (!$scope.checkAvailability(obj)) {
                return true;
            }
            return false;
        };
        
        $scope.isOwned = function(obj) {
            return obj.unlocked ? true : false;
        };
        
        $scope.checkAvailability = function(obj) {
            return obj.available() && obj.unlocked === false ? true : false;
        };
        
        $scope.showPurchased = function() {
            if ($scope.obj === null) {
                return false;
            }
            return $scope.obj.unlocked ? true : false;
        };
        
        $scope.hideBuyLink = function() {
            if ($scope.obj === null) {
                return true;
            }
            return $scope.obj.unlocked ? true : false;
        };
        
        $scope.buyTech = function() {
            if ($scope.game.rareCardCount >= $scope.obj.cost) {
                $scope.obj.unlocked = true;
                $scope.game.rareCardCount -= $scope.obj.cost;
                $scope.obj.upgrade();
            } else {
                notificationService.giveStatus('You do not have enough rare cards to buy this investment.', 'red');
            }
        };
        
        $scope.showInfo = function(obj) {
            if (obj.available()) {
                $scope.obj = obj;
                $scope.techName = obj.name;
                $scope.techDesc = obj.description;
                $scope.techCost = obj.cost;
            }
        };
    }]);
})();