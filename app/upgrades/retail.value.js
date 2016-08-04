angular.module('upgradesModule')
    .value('retailUpgrades', [
    {
        name: 'Schoolyard Sales',
        id: 'R1',
        blurb: 'Middle school kids are some of your top salespeople',
        cost: 100,
        unlockThreshold: 0,
        costIncreaseRate: 1.1,
        adjustedCardFlow: 0.10,
        adjustedIncomeRate: 1,
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
        adjustedIncomeRate: 2,
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