(function () {
    
angular.module('achievementModule')
    .service('achievementService', ['gameData', 'retailUpgrades', 'cardUpgrades', 'marketingUpgrades', 'notificationService', function(gameData, retailUpgrades, cardUpgrades, marketingUpgrades, notificationService) {
    //list of all achievements
    this.achievementList = [
        {
            name: 'Your Story',
            criteria: 'Crowdfunded your game',
            blurb: '...starts with a card and ends in the dark at 2AM.',
            id: 'A1',
            unlocked: false,
            criteriaTest: function() {
                return gameData.clicks >= 1 ? true : false;
            }
        },
        {
            name: '',
            criteria: 'Crowdfunded your game 100 times',
            blurb: '',
            id: 'A2',
            unlocked: false,
            criteriaTest: function() {
                return gameData.clicks >= 100 ? true : false;
            }
        },
        {
            name: '',
            criteria: 'Secret',
            blurb: 'Crowdfunded your game 1000 times',
            id: 'A3',
            unlocked: false,
            criteriaTest: function() {
                return gameData.clicks >= 1000 ? true : false;
            }
        },
        {
            name: 'Card Games on Motorcycles',
            criteria: 'Sell enough cards to blanket the Nazca Lines',
            blurb: '',
            id: 'A4',
            unlocked: false,
            criteriaTest: function() {
                return gameData.cardsSold >= 98542 ? true : false;
            }
        },
        {
            name: 'Around The World...',
            criteria: 'Sell enough cards to span the equator',
            blurb: 'In 465,988,372 cards',
            id: 'A5',
            unlocked: false,
            criteriaTest: function() {
                return gameData.cardsSold >= 465988372 ? true : false;
            }
        },
        {
            name: 'One Small Step for Man',
            criteria: 'Sell enough cards to reach the moon',
            blurb: "There's nothing to stop you from shooting for the stars",
            id: 'A6',
            unlocked: false,
            criteriaTest: function() {
                return gameData.cardsSold >= 4522000000 ? true : false;
            }
        },
        {
            name: 'Brave New World',
            criteria: 'Sell enough cards to reach Mars',
            blurb: '',
            id: 'A7',
            unlocked: false,
            criteriaTest: function() {
                return gameData.cardsSold >= 642350000000 ? true : false;
            }
        },
        {
            name: 'Path to the Stars',
            criteria: 'Sell enough cards to reach the sun',
            blurb: 'test test test test test test',
            id: 'A8',
            unlocked: false,
            criteriaTest: function() {
                return gameData.cardsSold >= 1764700000000 ? true : false;
            }
        },
        {
            name: 'King of the Playground',
            criteria: 'Buy 50 Schoolyard Sales',
            blurb: 'All other card games need to step off your turf',
            id: 'A9',
            unlocked: false,
            criteriaTest: function() {
                var i = retailUpgrades.findIndex(function(val) {
                    return val.id === 'R1';
                });
                return retailUpgrades[i].count >= 50 ? true : false;
            }
        },
        {
            name: "I Don't Wanna Grow Up",
            criteria: 'Buy 100 CardGames R Us',
            blurb: 'All other card games need to step off your turf',
            id: 'A10',
            unlocked: false,
            criteriaTest: function() {
                var i = retailUpgrades.findIndex(function(val) {
                    return val.id === 'R3';
                });
                return retailUpgrades[i].count >= 100 ? true : false;
            }
        },
        {
            name: 'Diversification',
            criteria: 'Diversify your revenue stream',
            blurb: '',
            id: 'A11',
            unlocked: false,
            criteriaTest: function() {
                var check1;
                var check2;
                var check3;
                for (var i = 0; i < retailUpgrades.length; i++) {
                    if (retailUpgrades[i].count > 0) {
                        check1 = true;
                        break;
                    }
                }
                for (var i = 0; i < cardUpgrades.length; i++) {
                    if (cardUpgrades[i].count > 0) {
                        check2 = true;
                        break;
                    }
                }
                for (var i = 0; i < marketingUpgrades.length; i++) {
                    if (marketingUpgrades[i].count > 0) {
                        check3 = true;
                        break;
                    }
                }
                console.log(check1 + " " + check2 + " " + check3);
                return (check1 && check2 && check3) ? true : false;
//                if (check1 && check2 && check3) {
//                    return true;
//                }
            }
        },
        {
            name: 'First In Class',
            criteria: 'Build a Duel School',
            blurb: 'They banned your game from schools, so you made your own school.',
            id: 'A12',
            unlocked: false,
            criteriaTest: function() {
                var i = marketingUpgrades.findIndex(function(val) {
                    return val.id === 'M5';
                });
                return retailUpgrades[i].count >= 1 ? true : false;
            }
        },
        {
            name: 'One of a Kind',
            criteria: 'Get a rare card',
            blurb: '',
            id: 'A13',
            unlocked: false,
            criteriaTest: function() {
                return gameData.totalRareCards >= 1 ? true : false;
            }
        },
        {
            name: 'My Precious...',
            criteria: 'Hoard all the rare cards',
            blurb: '',
            id: 'A14',
            unlocked: false,
            criteriaTest: function() {
                return gameData.rareCardCount >= 1000 ? true : false;
            }
        },
    ];
    this.count = this.achievementList.length;
    this.earnedCount;
        
    //run this method to find out how many total achievements have been earned
    this.checkEarned = function() {
        this.earnedCount = 0;
        for (var i = 0; i < this.achievementList.length; i++) {
            if (this.achievementList[i].unlocked) {
                this.earnedCount++;
            }
        }
//        console.log(this.earnedCount);
    };
        
    //runs through list of achievements to see if any new ones have been earned, will produce a notification reporting how many if true
    this.checkAchievementStatus = function() {
        var newCount = 0;
        for (var i = 0; i < this.achievementList.length; i++) {
            if (this.achievementList[i].unlocked === false) {
                if (this.achievementList[i].criteriaTest()) {
                    this.achievementList[i].unlocked = true;
                    newCount++;
                }
                
                if (newCount > 0) {
                    notificationService.giveStatus('You got ' + newCount + ' new achievement!', 'yellow');
                }
            }
        }
        this.checkEarned();
    };
}]);

})();