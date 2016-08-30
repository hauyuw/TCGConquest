(function() {

//setting up the AngularJS module
var app = angular.module('app', ['ngAnimate', 'ngDialog', 'achievementModule', 'upgradesModule', 'saveModule', 'notificationModule', 'rareCardModule']);

//main AngularJS controller for the game 
app.controller('MainController', ['$scope', '$interval', 'ngDialog', 'config', 'gameData', 'generateRandomGameName', 'generateRandomBoosterName', 'saveService', 'loadService', 'notificationService', 'achievementService', 'retailUpgrades', 'cardUpgrades', 'marketingUpgrades', 'upgradeService', 'numberService', 'rareCardService',
  function($scope, $interval, ngDialog, config, gameData, generateRandomGameName, generateRandomBoosterName, saveService, loadService, notificationService, achievementService, retailUpgrades, cardUpgrades, marketingUpgrades, upgradeService, numberService, rareCardService) {
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
    $scope.lastTimeStamp = new Date();
    var deleteDialogLoc = './app/data/delete-confirmation.template.html';
    var starterDialogLoc = './app/data/starterModal.template.html';
      
    //data binding for achievementService variables
    $scope.$watch(function() { return achievementService.count; }, function(count) {
        $scope.count = count;
    });
    $scope.$watch(function() { return achievementService.earnedCount; }, function(earnedCount) {
        $scope.earnedCount = earnedCount;
    });
      
    var setNumDisplays = function() {
        $scope.incomeDisplay = numberService.formatForDisplay(gameData.income);
        $scope.incomeRateDisplay = numberService.formatForDisplay(gameData.incomeRate);
        $scope.cardsSoldDisplay = numberService.formatForDisplay(gameData.cardsSold);
        $scope.cardFlowDisplay = numberService.formatForDisplay(gameData.cardFlow);
    };
      
    //updates the duration of game in save data based on how much time has elapsed since the last time stamp taken in current session
    var updateSessionLength = function() {
        var currentTime = new Date();
        currentTime = currentTime.getTime();
        var elapsedTime = currentTime - $scope.lastTimeStamp;
        $scope.sessionLength = elapsedTime;
        $scope.lastTimeStamp = currentTime;
        gameData.duration += $scope.sessionLength;
    };
    
    //TO DO: MOVE INTO ITS OWN SERVICE
    var openDialog = function(location) {
         ngDialog.open({ 
             template: location,
             className: 'ngdialog-theme-default',
             closeByEscape: false,
             closeByDocument: false,
             showClose: false,
             scope: $scope
         });
     };
    var closeDialog = function(location) {
        ngDialog.close({ 
            template: location,
            className: 'ngdialog-theme-default',
        });
    };
      
    $scope.debugLog = function() {
        ngDialog.open({ 
             template: 'version: ' + config.version + '<br>game name: ' + gameData.gameName + '<br>clicks: ' + gameData.clicks,
             plain: true
         });
        var fileContent = JSON.stringify(gameData);
        var fileName = 'TCGConquestSave_Debug' + saveService.timeStamp() + '.txt';
        $scope.saveGame();
        saveService.exportSave(fileContent, fileName);
    };
      
    $scope.randomizeGameName = function() {
        $scope.gameName = generateRandomGameName.shuffle();
        //CHEAP FIX; FIND BETTER WAY IF THERE'S TIME
        closeDialog(starterDialogLoc);
        openDialog(starterDialogLoc);
    };
      
    $scope.nameYourGame = function() {
        if ($scope.gameName === '' && gameData.gameName === '') {
            $scope.randomizeGameName();
        } else {
            $scope.gameName = gameData.gameName;
        }
        openDialog(starterDialogLoc);
    };
      
    $scope.namingGame = function(nameInput) {
        if (nameInput.length === 0) {
            gameData.gameName = generateRandomGameName.shuffle();
        } else {
            gameData.gameName = angular.copy(nameInput);
        }
        closeDialog(starterDialogLoc);
    };
      
    $scope.deleteWarning = function() {
        openDialog(deleteDialogLoc);
    };
      
    $scope.closeWarning = function() {
        closeDialog(deleteDialogLoc);
        $scope.error = '';
        closeDialog('./app/data/import-dialog.template.html');
     };
    
    $scope.saveGame = function() {
        console.log('game has been running for ' + gameData.duration/60000 + ' minutes');
        saveService.convertUpgrades(retailUpgrades, gameData.retail_upgrades);
        saveService.convertUpgrades(cardUpgrades, gameData.card_upgrades);
        saveService.convertUpgrades(marketingUpgrades, gameData.marketing_upgrades);
        saveService.convertAchievements(achievementService.achievementList, gameData.achievements);
        updateSessionLength();
        localStorage['tcgconquest_save'] = LZString.compressToBase64(JSON.stringify(gameData));
        ga('send', 'event', 'TCGConquest', 'Save');
        notificationService.giveStatus('Game saved', 'green');
    };
      
    $scope.checkContent = function() {
        var test = JSON.parse(LZString.decompressFromBase64(document.getElementById('importbox').value));
        console.log(document.getElementById('importbox').value);
        console.log(test + ' , type: ' + typeof test);
    };
      
    $scope.loadGame = function(saveFile) {
        if (!localStorage['tcgconquest_save']) {
            $scope.nameYourGame();
            console.log("game is named");
            return;
        }
        var save_data;
        if (saveFile === null) {
            save_data = JSON.parse(LZString.decompressFromBase64(localStorage['tcgconquest_save']));
        } else {
            save_data = document.getElementById('importbox').value;
            
            if (!loadService.importServices(save_data)) {
                $scope.error = 'You attempted to load an invalid game state. Please try again with data from a valid file.';
                return;
            }
            save_data = JSON.parse(LZString.decompressFromBase64(document.getElementById('importbox').value));
        }
        
        //only import values for matching keys between the save file and the current save file structure; prevents breakdown in case of new object properties added
        var fileStructure = Object.keys(save_data);
        fileStructure.forEach(function(prop) {
            if ($scope.game.hasOwnProperty(prop)) {
                $scope.game[prop] = save_data[prop];
            }
        });
        
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
        $scope.closeWarning();
        console.log('version ' + config.version);
    };
    
    $scope.exportGame = function() {
        var fileContent = LZString.compressToBase64(JSON.stringify(gameData));
        var fileName = 'TCGConquestSave_' + saveService.timeStamp() + '.txt';
        $scope.saveGame();
        saveService.exportSave(fileContent, fileName);
    };
      
    $scope.uploadFile = function() {
        openDialog('./app/data/import-dialog.template.html');
    };
      
    $scope.resetGame = function() {
        console.warn("deleting your game");
        localStorage.clear();
        window.location.reload(true);
    };
    
    //basic starter clicker for the game
    $scope.cardClick = function() {
        gameData.cardsSold++;
        gameData.clicks++;
        gameData.income += config.basicClicker;
        upgradeService.checkAvailability(retailUpgrades, gameData);
        upgradeService.checkAvailability(cardUpgrades, gameData);
        upgradeService.checkAvailability(marketingUpgrades, gameData);
        achievementService.checkAchievementStatus();
        setNumDisplays();
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
        if(achievementService.achievementList[index].unlocked) {
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
        
        // doing the math of cards
        gameData.cardsSold += (gameData.cardFlow/(1000/config.tickInterval));
        gameData.cardsSold = Math.round(gameData.cardsSold);
        gameData.cardFlow = numberService.tidyUpNum(gameData.cardFlow);
        gameData.income += (gameData.incomeRate/(1000/config.tickInterval));
        gameData.income = numberService.tidyUpNum(gameData.income);
        gameData.incomeRate = numberService.tidyUpNum(gameData.incomeRate);
        updateSessionLength();
        achievementService.checkAchievementStatus();
        setNumDisplays();
    };
    
    $scope.loadGame(null);
    setNumDisplays();
    $interval($scope.callAtInterval, config.tickInterval);
    $interval($scope.saveGame, 500000);
}]);
    
})();