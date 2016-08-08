angular.module('upgradesModule')
    .value('cardUpgrades', [
    {
        name: 'Sell Booster Packs',
        id: 'C1',
        blurb: 'Previewing this summer: "' , 
        //            + generateRandomBoosterName.shuffle() + '"',
        cost: 1000,
        unlockThreshold: 500,
        costIncreaseRate: 1.2,
        adjustedCardFlow: 10,
        adjustedIncomeRate: 0,
        count: null,
        show: false
    },
    {
        name: 'Publish a Banlist',
        id: 'C2',
        blurb: 'Your quarterly nerfing of top performing meta decks',
        cost: 550,
        unlockThreshold: 5000,
        costIncreaseRate: 1.5,
        adjustedCardFlow: 20,
        adjustedIncomeRate: 0,
        count: null,
        show: false
    },
    {
        name: 'New Rarity Level',
        id: 'C3',
        blurb: 'Check out this new Superspecialawesome Ghost Holo Foil card',
        cost: 800,
        unlockThreshold: 9000,
        costIncreaseRate: 1.5,
        adjustedCardFlow: 30,
        adjustedIncomeRate: 0,
        adjustedRareCardRate: 2,
        count: null,
        show: false
    },
    {
        name: "Collectors' Tin",
        id: 'C4',
        blurb: '',
        cost: 1500,
        unlockThreshold: 12000,
        costIncreaseRate: 1.5,
        adjustedCardFlow: 50,
        adjustedIncomeRate: 0,
        count: null,
        show: false
    },
    {
        name: 'Publish Your Own Bootlegs',
        id: 'C5',
        blurb: '',
        cost: 3000,
        unlockThreshold: 20000,
        costIncreaseRate: 2,
        adjustedCardFlow: 100,
        adjustedIncomeRate: 0,
        adjustedRareCardRate: 5,
        count: null,
        show: false
    },
]);