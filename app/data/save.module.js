angular.module('saveModule', [])
    //store game data and variables
    .value('gameData', {
    version: '0.5',
    gameName: '',
    basicClicker: 10, //income from clicking the basic clicker
    clicks: 0,
    cardsSold: 0,
    cardFlow: 0,
    income: 0,
    incomeRate: 0,
//    rareCardRate: 1,
    rareCardRate: 0.000000002,
    rareCardCount: 0,
    totalRareCards: 0,
    soul: 0,
    momentum: 0,
    duration: 0, //length that the game has been played in ms
    retail_upgrades: [],
    card_upgrades: [],
    marketing_upgrades: [],
    achievements: [],
});