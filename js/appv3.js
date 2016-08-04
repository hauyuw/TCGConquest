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
app.value('retailUpgrades', [
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
        blurb: "You're always a child at heart",
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
]);
app.value('cardUpgrades', [
    {
        name: 'New Booster Packs',
        id: 'C1',
        blurb: 'Coming this summer: "' , 
        //            + generateRandomBoosterName.shuffle() + '"',
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
]);
app.value('marketingUpgrades', [
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
]);
    
app.factory('generateRandomGameName', function() {
    var randomGameName;
    var word1 = ['WIXOSS', 'Battle', 'Duel', 'Magic', 'Cardfight!!', 'Card', 'Dragon', 'Epic', 'Knights of', 'The Last'];
    var word2 = ['Masters', 'Buddyfight', 'Monsters', 'the Gathering', 'Vanguard', 'Wars', 'King', 'Queen', 'Showdown', 'Quest'];
    var randomNum1 = Math.floor(Math.random() * word1.length);
    var randomNum2 = Math.floor(Math.random() * word2.length);
    
    randomGameName = word1[randomNum1] + ' ' + word2[randomNum2];
    return randomGameName;
});
    
app.service('achievements', ['gameData', 'retailUpgrades', 'cardUpgrades', 'marketingUpgrades', function(gameData, retailUpgrades, cardUpgrades, marketingUpgrades){
    this.achievementList = [
        {
            name: 'Your Story',
            criteria: 'Crowdfunded your game',
            blurb: '',
            id: 'A1',
            dataPieceToCheck: gameData,
            dataIDToCheck: 'clicks',
            numCriteria: 1,
            show: false
        },
        {
            name: 'First In Class',
            criteria: 'Built a Duel School',
            blurb: 'They banned your game from schools, so you made your own school.',
            id: 'A2',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M5',
            numCriteria: 1,
            show: false
        },
        {
            name: 'Achievement 3',
            criteria: '',
            blurb: '',
            id: 'A3',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M5',
            numCriteria: 1,
            show: false
        },
        {
            name: 'Achievement 4',
            criteria: '',
            blurb: '',
            id: 'A4',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M5',
            numCriteria: 1,
            show: false
        },
        {
            name: 'Achievement 5',
            criteria: '',
            blurb: '',
            id: 'A5',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M5',
            numCriteria: 1,
            show: false
        },
        {
            name: 'Achievement 6',
            criteria: '',
            blurb: 'test test test test test test',
            id: 'A6',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M5',
            numCriteria: 1,
            show: false
        },
        {
            name: 'Achievement 7',
            criteria: '',
            blurb: 'test test test test test test',
            id: 'A7',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M5',
            numCriteria: 1,
            show: false
        },
        {
            name: 'Achievement 8',
            criteria: '',
            blurb: 'test test test test test test',
            id: 'A8',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M5',
            numCriteria: 1,
            show: false
        },
        {
            name: 'Achievement 9',
            criteria: '',
            blurb: 'test test test test test test',
            id: 'A9',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M5',
            numCriteria: 1,
            show: false
        },
    ];
    
    this.giveStatus = function(message) {
        k$.status({       
            text: message,
            type: 'status-yellow'
        });
    };
    
    this.checkAchievementCriteria = function(placeToCheck, criteriaToFind, numCriteria) {
        if (placeToCheck == gameData) {
            console.log('checking criteria ' + numCriteria + ' in ' + Object.getOwnPropertyNames(placeToCheck) + '.' + criteriaToFind + ' = ' + placeToCheck[criteriaToFind]);
            if (placeToCheck[criteriaToFind] >= numCriteria) {
                console.log('an achievement for you!');
                return true;
            } 
        } else {
            for (var i = 0; i < placeToCheck.length; i++) {
//            console.log('checking criteria ' + numCriteria + ' in ' + placeToCheck + '.' + criteriaToFind + ' = ' + placeToCheck[i].count + ' ' + placeToCheck[i].name + ' at ' + i);
            if (placeToCheck[i].id == criteriaToFind && placeToCheck[i].count >= numCriteria) {          
                console.log('an achievement for you!');
                return true;
            } 
        }
        }
        console.log('no achievement for you!');
        return false;
    };
    
    this.checkAchievementStatus = function() {
        for (var i = 0; i < this.achievementList.length; i++) {
             if (this.checkAchievementCriteria(this.achievementList[i].dataPieceToCheck, this.achievementList[i].dataIDToCheck, this.achievementList[i].numCriteria) && (this.achievementList[i].show == false)) {
                this.achievementList[i].show = true;
//                 console.log('you just got an achievement');
                 this.giveStatus('You got a new achievement!');
            } 
        }
    };
}]);
    
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
app.controller('MainController', ['$scope', '$interval', 'gameData', 'generateRandomGameName', 'generateRandomBoosterName', 'achievements', 'retailUpgrades', 'cardUpgrades', 'marketingUpgrades',
  function($scope, $interval, gameData, generateRandomGameName, generateRandomBoosterName, achievements, retailUpgrades, cardUpgrades, marketingUpgrades){
    $scope.game = gameData;
    $scope.retailUpgrades = retailUpgrades;
    $scope.cardUpgrades = cardUpgrades;
    $scope.marketingUpgrades = marketingUpgrades;
    $scope.achievementList = achievements.achievementList;
    $scope.tempSave;
      
    $scope.nameYourGame = function() {
        gameData.gameName = prompt("Please name your card game", generateRandomGameName);
        if (gameData.gameName == null) {
            gameData.gameName = generateRandomGameName;
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
                rebalanceRareCardRate = gameData.rareCardRate * arrayName[index].adjustedRareCardRate;
                gameData.rareCardRate = rebalanceRareCardRate;
            }
        }
        gameData.incomeRate += rebalancedIncomeRate;
        gameData.cardFlow += rebalanceCardFlow;
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
            if ((arrayName[i].count !== null) || (gameData.income >= arrayName[i].cost && gameData.cardsSold >= arrayName[i].unlockThreshold)) {
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
//        console.log(randomNum + " out of " + gameData.rareCardRate);
        if (randomNum <= gameData.rareCardRate) {
            gameData.rareCardCount++;
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
        convertUpgrades(retailUpgrades, gameData.retail_upgrades);
        convertUpgrades(cardUpgrades, gameData.card_upgrades);
        convertUpgrades(marketingUpgrades, gameData.marketing_upgrades);
        localStorage['tcgconquest_save'] = btoa(JSON.stringify(gameData));
        giveStatus('Game saved');
    };
      
    $scope.loadGame = function() {
        if (!localStorage['tcgconquest_save']) {
            $scope.nameYourGame();
            console.log("game is named");
            return;
        }
        
        var save_data = JSON.parse(atob(localStorage['tcgconquest_save']));
        $scope.tempSave = save_data;
        $scope.tempSave.incomeRate = gameData.incomeRate;
        $scope.tempSave.cardFlow = gameData.cardFlow;
        $scope.tempSave.rareCardRate = gameData.rareCardRate;
        reconvertUpgrades(retailUpgrades, $scope.tempSave.retail_upgrades);
        reconvertUpgrades(cardUpgrades, $scope.tempSave.card_upgrades);
        reconvertUpgrades(marketingUpgrades, $scope.tempSave.marketing_upgrades);
        gameData = $scope.tempSave;
        $scope.game = gameData;
        checkAvailability(retailUpgrades);
        checkAvailability(cardUpgrades);
        checkAvailability(marketingUpgrades);
        generateRandomBoosterName.shuffle();
        console.log(gameData.version);
        console.log(gameData.clicks + ' clicks from save file')
//        console.log(achievements.achievementList);
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
        checkAvailability(retailUpgrades);
        checkAvailability(cardUpgrades);
        checkAvailability(marketingUpgrades);
        achievements.checkAchievementStatus();
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
            arrayName[index].cost = calculateNextCost(arrayName, index);
            if (arrayName[index].adjustedRareCardRate) {
                gameData.rareCardRate = gameData.rareCardRate * arrayName[index].adjustedRareCardRate;
            }
            
            gameData.cardFlow = tidyUpNum(gameData.cardFlow);
            gameData.incomeRate = tidyUpNum(gameData.incomeRate);
        }
    };
      
    $scope.showAchievement = function(index) {
        if(achievements.achievementList[index].show) {
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
        checkAvailability(retailUpgrades);
        checkAvailability(cardUpgrades);
        checkAvailability(marketingUpgrades);
        rollForRareCard();
        achievements.checkAchievementStatus();
        
//        console.log("doing the math of cards");
        gameData.cardsSold += gameData.cardFlow;
        gameData.cardsSold = Math.round(gameData.cardsSold);
        gameData.cardFlow = tidyUpNum(gameData.cardFlow);
        gameData.income += gameData.incomeRate;
        gameData.income = tidyUpNum(gameData.income);
        gameData.incomeRate = tidyUpNum(gameData.incomeRate);
    };
    
    $scope.loadGame();
    $interval($scope.callAtInterval, 1000);
    $interval($scope.saveGame, 500000);
}]);
    
})();