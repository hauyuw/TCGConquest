(function() {

//setting up the AngularJS module
var app = angular.module('app', ['ngAnimate']);

//custom AngularJS element directive that links the header navigation button for "Start over"
app.directive('achievements', function() {
    return {
        restrict: 'E',
        templateUrl: 'achievements.html'
    };
});

app.directive('footer', function() {
    return {
        restrict: 'E',
        templateUrl: 'footer.html'
    };
});

//store game data and variables
app.value('gameData', {
    version: '0.5',
    gameName: '',
    clicks: 0,
    cardsSold: 0,
    cardFlow: 0,
    income: 0,
    incomeRate: 0,
//    rareCardRate: 1,
    rareCardRate: 0.000000002,
    rareCardCount: 0,
    momentum: 0,
    retail_upgrades: [],
    card_upgrades: [],
    marketing_upgrades: [],
});
    
app.factory('generateRandomGameName', function() {
    var randomGameName;
    var word1 = ['WIXOSS', 'Battle', 'Duel', 'Magic', 'Cardfight!!', 'Card', 'Dragon', 'Epic', 'Knights of', 'The Last'];
    var word2 = ['Masters', 'Buddyfight', 'Monsters', 'the Gathering', 'Vanguard', 'Wars', 'King', 'Queen', 'Showdown', 'Quest'];
    var randomNum1 = Math.floor(Math.random() * word1.length);
    var randomNum2 = Math.floor(Math.random() * word2.length);
    
    randomGameName = word1[randomNum1] + ' ' + word2[randomNum2];
    return randomGameName;
});
    
app.service('achievements', function(){
    var achievementList = [
        {
            name: 'First in class',
            id: 'A1',
            dataPieceToCheck: 'marketingUpgrades',
            dataIDToCheck: 'M5',
            numCriteria: 1,
            acquired: false
        },
    ];
    
    this.giveStatus = function(message) {
        k$.status({       
            text: message,
            type: 'status-yellow'
        });
    };
    
    this.checkAchievementCriteria = function(placeToCheck, criteriaToFind, numCriteria) {
        for (var i = 0; i < placeToCheck.length; i++) {
            var searchKey = Object.getOwnPropertyNames(placeToCheck[i]);
            var propValue = placeToCheck[i][searchKey];
            console.log('checking criteria ' + numCriteria + ' in ' + placeToCheck + '.' + criteriaToFind + ' = ' + placeToCheck[i].count + ' ' + placeToCheck[i].name);
            if (placeToCheck[i].id == searchKey && placeToCheck[id].count == numCriteria) {          
                console.log('an achievement for you!');
                return true;
            } else {
                console.log('no achievement for you!');
                return false;
            }
        }
    };
    
    this.checkAchievementStatus = function() {
        for (var i = 0; i < achievementList.length; i++) {
             if (this.checkAchievementCriteria(achievementList[i].dataPieceToCheck, achievementList[i].dataIDToCheck, achievementList[i].numCriteria)) {
                achievementList[i].acquired = true;
                 console.log('you just got an achievement');
                 this.giveStatus('New achievement!');
            } else {
                this.giveStatus('No new achievement');
            }
        }
    };
});
    
app.service('generateRandomBoosterName', function() {
    var randomBoosterName;
    var word1 = ["Legend of the", "Metal", "Magic", "Spell", "Labyrinth of", "Legacy of", "Magician's", "Dark", "Invasion of", "Ancient", "Soul of the", "Rise of", "Flaming", "The Lost", "Cybernetic", "Elemental", "Unglued", "Shadow of", "Shadows over", "Enemy of", "Fallen", "Ice", "Fifth", "Champions of", "Betrayers of", "Saviors of", "Planar", "Future", "Time", "Shards of", "Rise of the", "Scars of", "New", "Fate", "Dragons of", "Eldritch", "Oath of", "Battle for", "Return to"];
    var word2 = ["Dragon", "Raiders", "Ruler", "Servant", "Nightmare", "Darkness", "Force", "Crisis", "Chaos", "Santuary", "Duelist", "Destiny", "Eternity", "Millennium", "Revolution", "Energy", "Infinity", "Ragnarok", "Justice", "Empires", "Age", "Alliances", "Dawn", "Sight", "Spiral", "Besieged", "Acension", "Reforged", "Moon", "Expeditions", "Gatewatch", "Reborn", "Blue Eyes White Dragon", "Ravnica"];
    var randomNum1;
    var randomNum2;
    
    this.shuffle = function() {
        randomNum1 = Math.floor(Math.random() * word1.length);
        randomNum2 = Math.floor(Math.random() * word2.length);
        
        randomBoosterName = word1[randomNum1] + ' ' + word2[randomNum2];
        return randomBoosterName;
    }
});
    
//main AngularJS controller for the game 
app.controller('MainController', ['$scope', '$interval', 'gameData', 'generateRandomGameName', 'generateRandomBoosterName', 'achievements',
  function($scope, $interval, gameData, generateRandomGameName, generateRandomBoosterName, achievements){
    $scope.game = gameData;
      
    $scope.nameYourGame = function() {
        $scope.game.gameName = prompt("Please name your card game", generateRandomGameName);
        if ($scope.game.gameName == null) {
            $scope.game.gameName = generateRandomGameName;
        }
    };
      
    $scope.deleteWarning = function(instruction) {
        if (instruction === 'open') {
            return true;
        } else {
            return false;
            console.log("hide alert");
        } 
    };
    
    var convertUpgrades = function(arrayName, saveArray) {
        for (var i = 0; i < arrayName.length; i++) {
            var keyName = arrayName[i].id;
            var keyValue = arrayName[i].count;
            var obj = {};
            obj[keyName] = keyValue;
            saveArray[i] = obj;
        }
    };
      
    var reconvertUpgrades = function(arrayName, saveArray) {
        for (var i = 0; i < saveArray.length; i++) {
            var searchKey = Object.getOwnPropertyNames(saveArray[i]);
            var propValue = saveArray[i][searchKey];
            if (arrayName[i].id == searchKey && propValue > 0) {
                arrayName[i].count = propValue;
                arrayName[i].show = true;
                arrayName[i].cost = recalculateCost(arrayName, i, propValue);
                rebalanceRates(arrayName, i, propValue);
            }
        }
    };
      
    var rebalanceRates = function(arrayName, index, counts) {
        var rebalancedIncomeRate = 0;
        var rebalanceCardFlow = 0;
        var rebalanceRareCardRate;
        for (var i = 0; i < counts; i++) {
            rebalancedIncomeRate += arrayName[index].adjustedIncomeRate;
            rebalanceCardFlow += arrayName[index].adjustedCardFlow;
            if (arrayName[index].adjustedRareCardRate != null) {
                rebalanceRareCardRate = $scope.game.rareCardRate * arrayName[index].adjustedRareCardRate;
                $scope.game.rareCardRate = rebalanceRareCardRate;
            }
        }
        $scope.game.incomeRate += rebalancedIncomeRate;
        $scope.game.cardFlow += rebalanceCardFlow;
    };
      
    var recalculateCost = function(arrayName, index, counts) {
        var nextCost = arrayName[index].cost;
        for (var i = 0; i < counts; i++) {
            nextCost = Math.floor(nextCost * Math.pow(arrayName[index].costIncreaseRate, i+1));
        }
        return nextCost;
    };
      
    var calculateNextCost = function(arrayName, index) {
        var nextCost = Math.floor(arrayName[index].cost * Math.pow(arrayName[index].costIncreaseRate, arrayName[index].count));
        return nextCost;
    };
    
    var checkAvailability = function(arrayName) {
        //loop through objects to check if they're available for use
        for (var i = 0; i < arrayName.length; i++) {
            if (arrayName[i].show) {
                continue;
            }
            if ((arrayName[i].count !== null) || ($scope.game.income >= arrayName[i].cost && $scope.game.cardsSold >= arrayName[i].unlockThreshold)) {
                arrayName[i].show = true;
                if (arrayName[i].count === null) {
                    arrayName[i].count = 0;
                }
            }
        }
    };
    
    //deal with those pesky rouge decimals; thanks Obama
    var tidyUpNum = function(input) {
        return Math.round(input * 1000000)/1000000;
    };
    
    //game of fate
    var rollForRareCard = function() {
        var randomNum = Math.random();
//        console.log(randomNum + " out of " + $scope.game.rareCardRate);
        if (randomNum <= $scope.game.rareCardRate) {
            $scope.game.rareCardCount++;
//            console.log("got a rare card!");
        }
    };
      
    var giveStatus = function(message) {
        k$.status({       
            text: message,
            type: 'status-green'
        });
    };
      
    $scope.saveGame = function() {
        convertUpgrades($scope.retailUpgrades, $scope.game.retail_upgrades);
        convertUpgrades($scope.cardUpgrades, $scope.game.card_upgrades);
        convertUpgrades($scope.marketingUpgrades, $scope.game.marketing_upgrades);
        localStorage['tcgconquest_save'] = btoa(JSON.stringify($scope.game));
        giveStatus('Game saved');
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
        reconvertUpgrades($scope.retailUpgrades, $scope.game.retail_upgrades);
        reconvertUpgrades($scope.cardUpgrades, $scope.game.card_upgrades);
        reconvertUpgrades($scope.marketingUpgrades, $scope.game.marketing_upgrades);
        checkAvailability($scope.retailUpgrades);
        checkAvailability($scope.cardUpgrades);
        checkAvailability($scope.marketingUpgrades);
        generateRandomBoosterName.shuffle();
        console.log($scope.game.version);
    };
      
    $scope.resetGame = function() {
        console.log("deleting");
        localStorage.clear();
        window.location.reload(true);
    };
    
    //basic starter clicker for the game
    $scope.cardClick = function() {
        $scope.game.cardsSold++;
        $scope.game.clicks++;
        $scope.game.income += 10;
        checkAvailability($scope.retailUpgrades);
        checkAvailability($scope.cardUpgrades);
        checkAvailability($scope.marketingUpgrades);
        achievements.checkAchievementStatus();
//        rollForRareCard();
    };
    
    $scope.buyUpgrade = function(arrayName, index) {    
        if ($scope.game.income >= arrayName[index].cost) {
            if (arrayName[index].id === 'C1') {
                arrayName[index].blurb = 'Previewing this summer: "' + generateRandomBoosterName.shuffle() + '"';
        }
            
            arrayName[index].count++;
            $scope.game.income -= arrayName[index].cost;
            
            $scope.game.cardFlow += arrayName[index].adjustedCardFlow;
            $scope.game.incomeRate += arrayName[index].adjustedIncomeRate;
            arrayName[index].cost = calculateNextCost(arrayName, index);
            if (arrayName[index].adjustedRareCardRate) {
                $scope.game.rareCardRate = $scope.game.rareCardRate * arrayName[index].adjustedRareCardRate;
            }
            
            $scope.game.cardFlow = tidyUpNum($scope.game.cardFlow);
            $scope.game.incomeRate = tidyUpNum($scope.game.incomeRate);
        }
    };
    
    $scope.showUpgrade = function(arrayName, index) {
        if (arrayName[index].show) {
            return true;
        }
    }
      
    $scope.checkAffordability = function(arrayName, index) {
        if ($scope.game.income >= arrayName[index].cost) {
            return false;
        } else {
            return true;
        }
    };
      
    $scope.checkRareCardCount = function() {
        if ($scope.game.rareCardCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    
    $scope.callAtInterval = function() {
        checkAvailability($scope.retailUpgrades);
        checkAvailability($scope.cardUpgrades);
        checkAvailability($scope.marketingUpgrades);
        rollForRareCard();
        achievements.checkAchievementStatus();
        
//        console.log("doing the math of cards");
        $scope.game.cardsSold += $scope.game.cardFlow;
        $scope.game.cardsSold = Math.round($scope.game.cardsSold);
        $scope.game.cardFlow = tidyUpNum($scope.game.cardFlow);
        $scope.game.income += $scope.game.incomeRate;
        $scope.game.income = tidyUpNum($scope.game.income);
        $scope.game.incomeRate = tidyUpNum($scope.game.incomeRate);
    };
    
    $scope.retailUpgrades = [
        {
            name: 'Schoolyard Sales',
            id: 'R1',
            blurb: 'Middle school kids are some of your top salespeople',
            cost: 100,
            unlockThreshold: 0,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 0.10,
            adjustedIncomeRate: 0.50,
            count: null,
            show: false
        },
        {
            name: 'Local Comic Book Store',
            id: 'R2',
            blurb: '"Worst card game ever"',
            cost: 500,
            unlockThreshold: 0,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 0.5,
            adjustedIncomeRate: 1,
            count: null,
            show: false
        },
        {
            name: 'CardGames R Us',
            id: 'R3',
            blurb: "You're always a child at heart" + $scope.game.gameName,
            cost: 3000,
            unlockThreshold: 0,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 4,
            adjustedIncomeRate: 10,
            count: null,
            show: false
        },
        {
            name: 'Secondary Reseller',
            id: 'R4',
            blurb: 'blurb here',
            cost: 5000,
            unlockThreshold: 0,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 1,
            adjustedIncomeRate: 50,
            count: null,
            show: false
        },
        {
            name: 'Subscription Service',
            id: 'R5',
            blurb: 'Like LootCrate for cards',
            cost: 10000,
            unlockThreshold: 0,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 1,
            adjustedIncomeRate: 50,
            count: null,
            show: false
        },
    ];
      
    $scope.cardUpgrades = [
        {
            name: 'New Booster Packs',
            id: 'C1',
            blurb: 'Coming this summer: "' + generateRandomBoosterName.shuffle() + '"',
            cost: 10,
            unlockThreshold: 1000,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 1,
            adjustedIncomeRate: 0,
            count: null,
            show: false
        },
        {
            name: 'Put Out a Banlist',
            id: 'C2',
            blurb: 'Your quarterly nerfing of top performing meta decks',
            cost: 100,
            unlockThreshold: 5000,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 3,
            adjustedIncomeRate: 0,
            count: null,
            show: false
        },
        {
            name: 'New Rarity Level',
            id: 'C3',
            blurb: 'Check out this new Superspecialawesome Ghost Holo Foil card',
            cost: 500,
            unlockThreshold: 9000,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 10,
            adjustedIncomeRate: 0,
            adjustedRareCardRate: 2,
            count: null,
            show: false
        },
        {
            name: 'Collectors Tin',
            id: 'C4',
            blurb: '',
            cost: 1500,
            unlockThreshold: 9000,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 10,
            adjustedIncomeRate: 0,
            count: null,
            show: false
        },
        {
            name: 'Publish Your Own Bootlegs',
            id: 'C5',
            blurb: '',
            cost: 3000,
            unlockThreshold: 9000,
            costIncreaseRate: 1.1,
            adjustedCardFlow: 100,
            adjustedIncomeRate: 0,
            adjustedRareCardRate: 5,
            count: null,
            show: false
        },
    ];
      
    $scope.marketingUpgrades = [
        {
            name: 'Tournament',
            id: 'M1',
            blurb: '',
            cost: 10000,
            unlockThreshold: 8000,
            costIncreaseRate: 1.2,
            adjustedCardFlow: 0,
            adjustedIncomeRate: 100,
            count: null,
            show: false
        },
        {
            name: 'Video Game Adaptations',
            id: 'M2',
            blurb: '',
            cost: 20000,
            unlockThreshold: 8000,
            costIncreaseRate: 1.2,
            adjustedCardFlow: 0,
            adjustedIncomeRate: 100,
            count: null,
            show: false
        },
        {
            name: 'Saturday Morning Cartoon',
            id: 'M3',
            blurb: 'Merchandising, merchandising, merchandising',
            cost: 50000,
            unlockThreshold: 8000,
            costIncreaseRate: 1.2,
            adjustedCardFlow: 0,
            adjustedIncomeRate: 200,
            count: null,
            show: false
        },
        {
            name: 'Theme Park',
            id: 'M4',
            blurb: '',
            cost: 50000,
            unlockThreshold: 8000,
            costIncreaseRate: 1.2,
            adjustedCardFlow: 0,
            adjustedIncomeRate: 200,
            count: null,
            show: false
        },
        {
            name: 'Duel School',
            id: 'M5',
            blurb: 'They banned your game from schools, so you started your own',
            cost: 100000,
            unlockThreshold: 8000,
            costIncreaseRate: 1.2,
            adjustedCardFlow: 0,
            adjustedIncomeRate: 1000,
            count: null,
            show: false
        },
    ];
    
    $scope.loadGame();
    $interval($scope.callAtInterval, 1000);
    $interval($scope.saveGame, 500000);
}]);
    
})();