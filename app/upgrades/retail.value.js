angular.module('upgradesModule')
    .value('retailUpgrades', [
    {
        name: 'Schoolyard Sales',
        id: 'R1',
        blurb: 'Middle school kids are some of your top salespeople',
        baseCost: 100,
        cost: 100,
        unlockThreshold: 0,
        costIncreaseRate: 1.1,
        adjustedCardFlow: 0.50,
        adjustedIncomeRate: 1,
        count: null,
        show: false
    },
    {
        name: 'Local Comic Book Store',
        id: 'R2',
        blurb: '"Worst card game ever!"',
        baseCost: 500,
        cost: 500,
        unlockThreshold: 0,
        costIncreaseRate: 1.1,
        adjustedCardFlow: 1,
        adjustedIncomeRate: 2,
        count: null,
        show: false
    },
    {
        name: 'CardGames R Us',
        id: 'R3',
        blurb: "You're always a child at heart",
        baseCost: 1500,
        cost: 1500,
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
        baseCost: 5000,
        cost: 5000,
        unlockThreshold: 0,
        costIncreaseRate: 1.1,
        adjustedCardFlow: 6,
        adjustedIncomeRate: 50,
        count: null,
        show: false
    },
    {
        name: 'Subscription Service',
        id: 'R5',
        blurb: 'Like LootCrate for cards',
        baseCost: 10000,
        cost: 10000,
        unlockThreshold: 0,
        costIncreaseRate: 1.1,
        adjustedCardFlow: 10,
        adjustedIncomeRate: 100,
        count: null,
        show: false
    },
]);