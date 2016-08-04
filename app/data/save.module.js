angular.module('saveModule', [])
    //store game data and variables
    .value('gameData', {
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
    achievements: [],
});