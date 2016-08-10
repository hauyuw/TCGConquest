(function () {
    
angular.module('achievementModule', ['saveModule', 'upgradesModule'])
    .service('achievementService', ['gameData', 'retailUpgrades', 'cardUpgrades', 'marketingUpgrades', 'notificationService', function(gameData, retailUpgrades, cardUpgrades, marketingUpgrades, notificationService) {
    //list of all achievements
    this.achievementList = [
        {
            name: 'Your Story',
            criteria: 'Crowdfunded your game',
            blurb: '...starts with a card and ends in the dark at 2AM.',
            id: 'A1',
            dataPieceToCheck: gameData,
            dataIDToCheck: 'clicks',
            numCriteria: 1,
            show: false
        },
        {
            name: 'Speed World',
            criteria: 'Sell enough cards to blanket the Nazca Lines',
            blurb: '',
            id: 'A2',
            dataPieceToCheck: gameData,
            dataIDToCheck: 'cardsSold',
            numCriteria: 98542,
            show: false
        },
        {
            name: 'Around The World...',
            criteria: 'Sell enough cards to span the equator',
            blurb: 'In 465,988,372 cards',
            id: 'A3',
            dataPieceToCheck: gameData,
            dataIDToCheck: 'cardsSold',
            numCriteria: 465988372,
            show: false
        },
        {
            name: 'One Small Step for Man',
            criteria: 'Sell enough cards to reach the moon',
            blurb: "There's nothing to stop you from shooting for the stars",
            id: 'A4',
            dataPieceToCheck: gameData,
            dataIDToCheck: 'cardsSold',
            numCriteria: 4522000000,
            show: false
        },
        {
            name: 'Brave New World',
            criteria: 'Sell enough cards to reach Mars',
            blurb: '',
            id: 'A5',
            dataPieceToCheck: gameData,
            dataIDToCheck: 'cardsSold',
            numCriteria: 642350000000,
            show: false
        },
        {
            name: 'Path to the Stars',
            criteria: 'Sell enough cards to reach the sun',
            blurb: 'test test test test test test',
            id: 'A6',
            dataPieceToCheck: gameData,
            dataIDToCheck: 'cardsSold',
            numCriteria: 1764700000000,
            show: false
        },
        {
            name: 'King of the Playground',
            criteria: 'Buy 50 Schoolyard Sales',
            blurb: 'All other card games need to step off your turf',
            id: 'A7',
            dataPieceToCheck: retailUpgrades,
            dataIDToCheck: 'R1',
            numCriteria: 50,
            show: false
        },
        {
            name: 'Diversification',
            criteria: 'Diversify your revenue stream',
            blurb: '',
            id: 'A8',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M1',
            numCriteria: 1,
            show: false
        },
        {
            name: 'First In Class',
            criteria: 'Build a Duel School',
            blurb: 'They banned your game from schools, so you made your own school.',
            id: 'A9',
            dataPieceToCheck: marketingUpgrades,
            dataIDToCheck: 'M5',
            numCriteria: 1,
            show: false
        },
        {
            name: 'One of a Kind',
            criteria: 'Make a rare card',
            blurb: '',
            id: 'A10',
            dataPieceToCheck: gameData,
            dataIDToCheck: 'rareCardCount',
            numCriteria: 1,
            show: false
        },
    ];
    this.count = this.achievementList.length;
    this.earnedCount;
        
    //run this method to find out how many total achievements have been earned
    this.checkEarned = function() {
        this.earnedCount = 0;
        for (var i = 0; i < this.achievementList.length; i++) {
            if (this.achievementList[i].show) {
                this.earnedCount++;
            }
        }
//        console.log(this.earnedCount);
    };
    
    //if given achievement meets the criteria to be earned, return true; otherwise returns false
    this.checkAchievementCriteria = function(placeToCheck, criteriaToFind, numCriteria) {
        if (placeToCheck === gameData) {
//            console.log('checking criteria ' + numCriteria + ' in ' + gameData + '.' + criteriaToFind + ' = ' + gameData[criteriaToFind]);
            if (gameData[criteriaToFind] >= numCriteria) {
//                console.log(placeToCheck[criteriaToFind]);
//                console.log('an achievement for you!');
                return true;
            } 
        } else {
            for (var i = 0; i < placeToCheck.length; i++) {
//            console.log('checking criteria ' + numCriteria + ' in ' + placeToCheck + '.' + criteriaToFind + ' = ' + placeToCheck[i].count + ' ' + placeToCheck[i].name + ' at ' + i);
                if ((placeToCheck[i].id === criteriaToFind) && (placeToCheck[i].count >= numCriteria)) {     
//                console.log('an achievement for you!');
                return true;
                }
            }
        }
//        console.log('no achievement for you!');
        return false;
    };
    
    //runs through list of achievements to see if any new ones have been earned, will produce a notification reporting how many if true
    this.checkAchievementStatus = function() {
        var newCount = 0;
        for (var i = 0; i < this.achievementList.length; i++) {
             if ((this.achievementList[i].show === false) && this.checkAchievementCriteria(this.achievementList[i].dataPieceToCheck, this.achievementList[i].dataIDToCheck, this.achievementList[i].numCriteria)) {
                this.achievementList[i].show = true;
                newCount++;
//                 console.log('you just got an achievement');
                 notificationService.giveStatus('You got ' + newCount + ' new achievement!', 'yellow');
            } 
        }
        
        this.checkEarned();
    };
}]);

})();