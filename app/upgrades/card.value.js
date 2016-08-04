angular.module('upgradesModule')
    .value('cardUpgrades', [
    {
        name: 'New Booster Packs',
        id: 'C1',
        blurb: 'Previewing this summer: "' , 
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