angular.module('upgradesModule')
    .value('marketingUpgrades', [
    {
        name: 'Tournament',
        id: 'M1',
        blurb: '',
        baseCost: 10000,
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
        baseCost: 20000,
        cost: 20000,
        unlockThreshold: 8000,
        costIncreaseRate: 1.2,
        adjustedCardFlow: 0,
        adjustedIncomeRate: 200,
        count: null,
        show: false
    },
    {
        name: 'Saturday Morning Cartoon',
        id: 'M3',
        blurb: 'Merchandising, merchandising, merchandising!',
        baseCost: 50000,
        cost: 50000,
        unlockThreshold: 8000,
        costIncreaseRate: 1.2,
        adjustedCardFlow: 0,
        adjustedIncomeRate: 500,
        count: null,
        show: false
    },
    {
        name: 'Theme Park',
        id: 'M4',
        blurb: '',
        baseCost: 500000,
        cost: 500000,
        unlockThreshold: 8000,
        costIncreaseRate: 1.2,
        adjustedCardFlow: 0,
        adjustedIncomeRate: 700,
        count: null,
        show: false
    },
    {
        name: 'Duel School',
        id: 'M5',
        blurb: 'They banned your game from schools, so you started your own',
        baseCost: 1000000000,
        cost: 1000000000,
        unlockThreshold: 100000,
        costIncreaseRate: 1.5,
        adjustedCardFlow: 0,
        adjustedIncomeRate: 1000,
        count: null,
        show: false
    },
]);