(function () {
    angular.module('techModule')
    .factory('techList', ['config', 'gameData', 'retailUpgrades', 'cardUpgrades', 'marketingUpgrades', 'numberService', function(config, gameData, retailUpgrades, cardUpgrades, marketingUpgrades, numberService) {
    // mainBranch = techList[0]; occultBranch = techList[1]; scienceBranch = techList[2];
    var techList = [
        {
            branch: 'main',
            list: [
                {
                    name: 'Social Media Intern',
                    description: 'They may start flame wars but at least people are talking about your game; doubles the amount earned from crowdfunding',
                    id: 1,
                    cost: 1,
                    available: function() { return gameData.rareCardCount >= 1 ? true : false; },
                    upgrade: function() { config.basicClicker *= 2; }, 
                    unlocked: false
                },
                {
                    name: 'Analytics',
                    description: 'Invest in new software to track your growing business; unlocks the \'Stats\' tab',
                    id: 2,
                    cost: 1,
                    available: function() {
                        var previousIndex = techList[0].list.indexOf(this) - 1;
                        if (techList[0].list[previousIndex].unlocked) { return true; } 
                        else { return false; }
                    },
                    upgrade: function() {},
                    unlocked: false
                },
                {
                    name: 'Name',
                    description: 'Unlocks the ability to publish new archetypes for your game',
                    id: 3,
                    cost: 1,
                    available: function() {
                        var previousIndex = techList[0].list.indexOf(this) - 1;
                        if (techList[0].list[previousIndex].unlocked) { return true; } 
                        else { return false; }
                    },
                    upgrade: function() {
                        var searchKey = 'New Archetype';
                        var index = cardUpgrades.findIndex(function(element) {return element.name ===searchKey;});
                        cardUpgrades[index].show = true;
                    },
                    unlocked: false
                },
                {
                    name: 'Playtesting',
                    description: 'Unlocks the ability to try out new formats for your game',
                    id: 4,
                    cost: 1,
                    available: function() {
                        var previousIndex = techList[0].list.indexOf(this) - 1;
                        if (techList[0].list[previousIndex].unlocked) { return true; } 
                        else { return false; }
                    },
                    upgrade: function() {
                        var searchKey = 'Game Format';
                        var index = cardUpgrades.findIndex(function(element) {return element.name ===searchKey;});
                        cardUpgrades[index].show = true;
                    },
                    unlocked: false
                },
                {
                    name: 'Go Mainstream',
                    description: 'Your profit-generating business directly affect the amount of cards you sell',
                    id: 8,
                    cost: 3,
                    available: function() {
                        var previousIndex = techList[0].list.indexOf(this) - 1;
                        if (techList[0].list[previousIndex].unlocked) { return true; } 
                        else { return false; }
                    },
                    upgrade: function() {
                        marketingUpgrades.forEach(function(item, index) {item.adjustedCardFlow = 12 * (index+1);});
                        //update cardflow rate
                        var sum = 0;
                        marketingUpgrades.forEach(function(item) {
                            if (item.count > 0) {
                                sum += (item.adjustedCardFlow * item.count);
                            }
                        });
                        gameData.cardFlow += sum;
                        gameData.cardFlow = numberService.tidyUpNum(gameData.cardFlow);
                    },
                    unlocked: false
                }
            ]
        },
        {
            branch: 'occult',
            list: [
                {
                    name: 'Archaeology',
                    description: '(If you buy this tech, you will not be able to buy any from the Super Science branch.)',
                    id: 'O1',
                    cost: 1,
                    available: function() {
                        return techList[0].list[techList[0].list.length - 1].unlocked && techList[2].list[0].unlocked === false ? true : false;
                    },
                    upgrade: function() {},
                    unlocked: false
                },
//                {
//                    name: 'Curse of the Mesopotamian King',
//                    description: '',
//                    id: 5,
//                    cost: 1,
//                    available: function() {
//                        var previousIndex = techList[1].list.indexOf(this) - 1;
//                        if (techList[1].list[previousIndex].unlocked) { return true; } 
//                        else { return false; }
//                    },
//                    upgrade: function() {},
//                    unlocked: false
//                },
//                {
//                    name: 'Blood Sacrifice',
//                    description: '',
//                    id: 6,
//                    cost: 1,
//                    available: function() {
//                        var previousIndex = techList[1].list.indexOf(this) - 1;
//                        if (techList[1].list[previousIndex].unlocked) { return true; } 
//                        else { return false; }
//                    },
//                    upgrade: function() {},
//                    unlocked: false
//                }
            ]
        },
        {
            branch: 'science',
            list: [
                {
                    name: 'VR Breakthrough',
                    description: '(If you buy this tech, you will not be able to buy any from the Occult branch.)',
                    id: 'S1',
                    cost: 1,
                    available: function() {
                        return techList[0].list[techList[0].list.length - 1].unlocked && techList[1].list[0].unlocked === false ? true : false;
                    },
                    upgrade: function() {},
                    unlocked: false
                },
//                {
//                    name: 'Nanomachinery',
//                    description: 'Unlock card replicators',
//                    id: 8,
//                    cost: 1,
//                    available: function() {
//                        var previousIndex = techList[2].list.indexOf(this) - 1;
//                        if (techList[2].list[previousIndex].unlocked) { return true; } 
//                        else { return false; }
//                    },
//                    upgrade: function() {},
//                    unlocked: false
//                },
//                {
//                    name: 'Space Program',
//                    description: '',
//                    id: 9,
//                    cost: 1,
//                    available: function() {
//                        var previousIndex = techList[2].list.indexOf(this) - 1;
//                        if (techList[2].list[previousIndex].unlocked) { return true; } 
//                        else { return false; }
//                    },
//                    upgrade: function() {},
//                    unlocked: false
//                },
//                {
//                    name: 'Wormhole Technology',
//                    description: 'Unlock interdimensional stores',
//                    id: 10,
//                    cost: 1,
//                    available: function() {
//                        var previousIndex = techList[2].list.indexOf(this) - 1;
//                        if (techList[2].list[previousIndex].unlocked) { return true; } 
//                        else { return false; }
//                    },
//                    upgrade: function() {
//                        var searchKey = 'Interdimensional Stores';
//                        var index = retailUpgrades.findIndex(function(element) {return element.name ===searchKey;});
//                        retailUpgrades[index].show = true;
//                    },
//                    unlocked: false
//                }
            ]
        }
    ];
        return techList;
    }]);
})();