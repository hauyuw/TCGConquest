(function () {
    angular.module('techModule').service('techService', ['gameData', 'retailUpgrades', 'cardUpgrades', 'marketingUpgrades', 'notificationService', function (gameData, retailUpgrades, cardUpgrades, marketingUpgrades, notificationService) {
        this.mainBranch = [
            {
                name: 'Social Media Intern'
                , description: 'They may start flame wars but at least people are talking about your game; doubles the amount earned from crowdfunding'
                , id: 1
                , cost: 1
                , available: function () {
                    return true;
                }
                , owned: false
    }
            , {
                name: 'Analytics'
                , description: 'Invest in new software to track your growing business; unlocks the \'Stats\' tab'
                , id: 2
                , cost: 1
                , available: function () {
                    var previousIndex = this.mainBranch.indexOf(this) - 1;
                    if (this.mainBranch[previousIndex].owned) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                , owned: false
    }
            , {
                name: 'Go Mainstream'
                , description: ''
                , id: 3
                , cost: 1
                , available: function () {
                    var previousIndex = this.mainBranch.indexOf(this) - 1;
                    if (this.mainBranch[previousIndex].owned) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                , owned: false
    }
  ];
        this.occultBranch = [
            {
                name: 'Archaeology'
                , description: '(If you buy this tech, you will not be able to buy any from the Super Science branch.)'
                , id: 4
                , cost: 1
                , available: function () {
                    var mainBranch = this.mainBranch;
                    return mainBranch[mainBranch.length - 1].owned && this.scienceBranch[0].owned === false ? true : false;
                }
                , owned: false
    }
            , {
                name: 'Curse of the Mesopotamian King'
                , description: ''
                , id: 5
                , cost: 1
                , available: function () {
                    var previousIndex = this.occultBranch.indexOf(this) - 1;
                    if (this.occultBranch[previousIndex].owned) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                , owned: false
    }
            , {
                name: 'Blood Sacrifice'
                , description: ''
                , id: 6
                , cost: 1
                , available: function () {
                    var previousIndex = this.occultBranch.indexOf(this) - 1;
                    if (this.occultBranch[previousIndex].owned) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                , owned: false
    }
  ];
        this.scienceBranch = [
            {
                name: 'VR Breakthrough'
                , description: '(If you buy this tech, you will not be able to buy any from the Occult branch.)'
                , id: 7
                , cost: 1
                , available: function () {
                    var mainBranch = this.mainBranch;
                    return mainBranch[mainBranch.length - 1].owned && this.occultBranch[0].owned === false ? true : false;
                }
                , owned: false
    }
            , {
                name: 'Nanomachinery'
                , description: 'Unlock card replicators'
                , id: 8
                , cost: 1
                , available: function () {
                    var previousIndex = this.scienceBranch.indexOf(this) - 1;
                    if (this.scienceBranch[previousIndex].owned) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                , owned: false
    }
            , {
                name: 'Space Program'
                , description: ''
                , id: 9
                , cost: 1
                , available: function () {
                    var previousIndex = this.scienceBranch.indexOf(this) - 1;
                    if (this.scienceBranch[previousIndex].owned) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                , owned: false
    }
            , {
                name: 'Wormhole Technology'
                , description: 'Unlock interdimensional stores'
                , id: 10
                , cost: 1
                , available: function () {
                    var previousIndex = this.scienceBranch.indexOf(this) - 1;
                    if (this.scienceBranch[previousIndex].owned) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                , owned: false
    }
  ];
        this.obj = null;
        this.techName = 'Spend rare cards to make your business grow';
        this.techDesc = 'Click on a technology to learn more about each';
        this.techCost;
        this.disableBtn = function (obj) {
            if (!this.checkAvailability(obj) && this.isOwned(obj)) {
                return false;
            }
            else if (!this.checkAvailability(obj)) {
                return true;
            }
            return false;
        }
        this.isOwned = function (obj) {
            return obj.owned ? true : false;
        }
        this.checkAvailability = function (obj) {
            return obj.available() && obj.owned === false ? true : false;
        }
        this.showPurchased = function () {
            if (this.obj === null) {
                return false;
            }
            return this.obj.owned ? true : false;
        }
        this.hideBuyLink = function () {
            if (this.obj === null) {
                return true;
            }
            return this.obj.owned ? true : false;
        }
        this.buyTech = function () {
            console.log("bought tech");
            this.obj.owned = true;
        }
        this.showInfo = function (obj) {
            if (obj.available()) {
                this.obj = obj;
                this.techName = obj.name;
                this.techDesc = obj.description;
                this.techCost = obj.cost;
            }
        };
}]);
})();