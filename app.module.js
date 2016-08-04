(function() {

//setting up the AngularJS module
var app = angular.module('app', ['ngAnimate', 'ngDialog', 'achievementModule', 'upgradesModule', 'saveModule', 'notificationModule', 'rareCardModule']);

//main AngularJS controller for the game 
app.controller('MainController', ['$scope', '$interval', 'ngDialog', 'gameData', 'generateRandomGameName', 'generateRandomBoosterName', 'saveService', 'loadService', 'notificationService', 'achievementService', 'retailUpgrades', 'cardUpgrades', 'marketingUpgrades', 'upgradeService', 'numberService', 'rareCardService',
  function($scope, $interval, ngDialog, gameData, generateRandomGameName, generateRandomBoosterName, saveService, loadService, notificationService, achievementService, retailUpgrades, cardUpgrades, marketingUpgrades, upgradeService, numberService, rareCardService) {
    $scope.game = gameData;
    $scope.retailUpgrades = retailUpgrades;
    $scope.cardUpgrades = cardUpgrades;
    $scope.marketingUpgrades = marketingUpgrades;
    $scope.achievementList = achievementService.achievementList;
    $scope.incomeDisplay = '';
    $scope.incomeRateDisplay = '';
    $scope.cardsSoldDisplay = '';
    $scope.cardFlowDisplay = '';
    $scope.gameName = '';
      
    //data binding for achievementService variables
    $scope.$watch( function () { return achievementService.count; }, function ( count ) {
        $scope.count = count;
    });
    $scope.$watch( function () { return achievementService.earnedCount;}, function ( earnedCount ) {
        $scope.earnedCount = earnedCount;
    });
      
    var setNumDisplays = function() {
        $scope.incomeDisplay = numberService.formatForDisplay(gameData.income);
        $scope.incomeRateDisplay = numberService.formatForDisplay(gameData.incomeRate);
        $scope.cardsSoldDisplay = numberService.formatForDisplay(gameData.cardsSold);
        $scope.cardFlowDisplay = numberService.formatForDisplay(gameData.cardFlow);
    };
    
    $scope.randomizeGameName = function() {
        $scope.gameName = generateRandomGameName.shuffle();
        
        //CHEAP FIX; FIND BETTER WAY IF THERE'S TIME
        ngDialog.close({ 
            template: './app/data/starterModal.directive.html',
            className: 'ngdialog-theme-default',
        });
        ngDialog.open({ 
            template: './app/data/starterModal.template.html',
            className: 'ngdialog-theme-default',
            closeByEscape: false,
            closeByDocument: false,
            showClose: false,
            scope: $scope
        });
    };
      
    $scope.nameYourGame = function() {
        if ($scope.gameName === '') {
            $scope.randomizeGameName();
        } else {
            $scope.gameName = gameData.gameName;
        }
        ngDialog.open({ 
            template: './app/data/starterModal.template.html',
            className: 'ngdialog-theme-default',
            closeByEscape: false,
            closeByDocument: false,
            showClose: false,
            scope: $scope
        });
    };
      
    $scope.namingGame = function(nameInput) {
        if (nameInput.length === 0) {
            gameData.gameName = generateRandomGameName.shuffle();
        } else {
            gameData.gameName = angular.copy(nameInput);
        }
        
        ngDialog.close({ 
            template: './app/data/starterModal.directive.html',
            className: 'ngdialog-theme-default',
        });
    }
      
    //TO FIX
    $scope.deleteWarning = function(instruction) {
        if (instruction === 'open') {
            return true;
        } else {
            return false;
            console.log("hide alert");
        } 
    };
      
    $scope.saveGame = function() {
        saveService.convertUpgrades(retailUpgrades, gameData.retail_upgrades);
        saveService.convertUpgrades(cardUpgrades, gameData.card_upgrades);
        saveService.convertUpgrades(marketingUpgrades, gameData.marketing_upgrades);
        saveService.convertAchievements(achievementService.achievementList, gameData.achievements);
        localStorage['tcgconquest_save'] = btoa(JSON.stringify(gameData));
        ga('send', 'event', 'TCGConquest', 'Save');
        notificationService.giveStatus('Game saved', 'green');
    };
      
    $scope.loadGame = function() {
        if (!localStorage['tcgconquest_save']) {
            $scope.nameYourGame();
            console.log("game is named");
            return;
        }
        
        var save_data = JSON.parse(atob(localStorage['tcgconquest_save']));
        $scope.game = save_data;
        $scope.game.incomeRate = gameData.incomeRate;
        $scope.game.cardFlow = gameData.cardFlow;
        $scope.game.rareCardRate = gameData.rareCardRate;
        loadService.reconvertUpgrades(retailUpgrades, $scope.game.retail_upgrades, $scope.game);
        loadService.reconvertUpgrades(cardUpgrades, $scope.game.card_upgrades, $scope.game);
        loadService.reconvertUpgrades(marketingUpgrades, $scope.game.marketing_upgrades, $scope.game);
        loadService.reconvertAchievements(achievementService.achievementList, $scope.game.achievements);
        gameData = $scope.game;
        upgradeService.checkAvailability(retailUpgrades, gameData);
        upgradeService.checkAvailability(cardUpgrades, gameData);
        upgradeService.checkAvailability(marketingUpgrades, gameData);
        cardUpgrades[0].blurb = 'Previewing this summer: "' + generateRandomBoosterName.shuffle() + '"';
        
        if(gameData.gameName === '') {
            $scope.nameYourGame();
        }
        console.log('version ' + gameData.version);
//        console.log(retailUpgrades);
//        console.log(achievementService.achievementList);
    };
    
    $scope.exportGame = function() {
        var fileContent = btoa(JSON.stringify(gameData));
        var fileName = 'TCGConquestSave_' + saveService.timeStamp() + '.txt';
        $scope.saveGame();
        saveService.exportSave(fileContent, fileName);
    };
      
    $scope.resetGame = function() {
        console.log("deleting");
        localStorage.clear();
        window.location.reload(true);
    };
    
    //basic starter clicker for the game
    $scope.cardClick = function() {
        gameData.cardsSold++;
        gameData.clicks++;
        gameData.income += 10;
        upgradeService.checkAvailability(retailUpgrades, gameData);
        upgradeService.checkAvailability(cardUpgrades, gameData);
        upgradeService.checkAvailability(marketingUpgrades, gameData);
        achievementService.checkAchievementStatus();
        setNumDisplays();
//        rollForRareCard();
    };
    
    $scope.buyUpgrade = function(arrayName, index) {    
        if (gameData.income >= arrayName[index].cost) {
            if (arrayName[index].id === 'C1') {
                arrayName[index].blurb = 'Previewing this summer: "' + generateRandomBoosterName.shuffle() + '"';
        }
            
            arrayName[index].count++;
            gameData.income -= arrayName[index].cost;
            
            gameData.cardFlow += arrayName[index].adjustedCardFlow;
            gameData.incomeRate += arrayName[index].adjustedIncomeRate;
            arrayName[index].cost = upgradeService.calculateNextCost(arrayName, index);
            if (arrayName[index].adjustedRareCardRate) {
                gameData.rareCardRate = gameData.rareCardRate * arrayName[index].adjustedRareCardRate;
            }
            
            gameData.cardFlow = numberService.tidyUpNum(gameData.cardFlow);
            gameData.incomeRate = numberService.tidyUpNum(gameData.incomeRate);
            achievementService.checkAchievementStatus();
            setNumDisplays();
        }
    };
      
    $scope.showAchievement = function(index) {
        if(achievementService.achievementList[index].show) {
            return true;
        }
    };
    
    $scope.showUpgrade = function(arrayName, index) {
        if (arrayName[index].show) {
            return true;
        }
    };
      
    $scope.checkAffordability = function(arrayName, index) {
        if (gameData.income >= arrayName[index].cost) {
            return false;
        } else {
            return true;
        }
    };
      
    $scope.checkRareCardCount = function() {
        if (gameData.rareCardCount > 0) {
            return true;
        } else {
            return false;
        }
    };
    
    $scope.callAtInterval = function() {
        upgradeService.checkAvailability(retailUpgrades, gameData);
        upgradeService.checkAvailability(cardUpgrades, gameData);
        upgradeService.checkAvailability(marketingUpgrades, gameData);
        rareCardService.rollForRareCard(gameData);
        achievementService.checkAchievementStatus();
        
//        console.log("doing the math of cards");
        gameData.cardsSold += gameData.cardFlow;
        gameData.cardsSold = Math.round(gameData.cardsSold);
        gameData.cardFlow = numberService.tidyUpNum(gameData.cardFlow);
        gameData.income += gameData.incomeRate;
        gameData.income = numberService.tidyUpNum(gameData.income);
        gameData.incomeRate = numberService.tidyUpNum(gameData.incomeRate);
        setNumDisplays();
    };
    
    $scope.loadGame();
    setNumDisplays();
    $interval($scope.callAtInterval, 1000);
    $interval($scope.saveGame, 500000);
}]);
    
})();