(function () {
    
angular.module('saveModule')
    .service('loadService', function() {
        
    this.checkPresence = function(objectToCheck) {
        if (typeof objectToCheck === 'undefined' || objectToCheck === null) {
            return false;
        }
        return true;
    };
    
    this.reconvertUpgrades = function(arrayName, saveArray, gameSaveFile) {
        if (!this.checkPresence(saveArray)) {
            return;
        }
        for (var i = 0; i < saveArray.length; i++) {
            var searchKey = Object.getOwnPropertyNames(saveArray[i]);
            var propValue = saveArray[i][searchKey];
            if (arrayName[i].id == searchKey && propValue >= 0) {
                arrayName[i].count = propValue;
                arrayName[i].show = true;
                arrayName[i].cost = this.recalculateCost(arrayName, i, propValue);
                this.rebalanceRates(arrayName, i, propValue, gameSaveFile);
            }
        }
    };
      
    this.reconvertAchievements = function(arrayName, saveArray) {
        if (!this.checkPresence(saveArray)) {
            return;
        }
        for (var i = 0; i < saveArray.length; i++) {
            var searchKey = Object.getOwnPropertyNames(saveArray[i]);
            var propValue = saveArray[i][searchKey];
            if ((arrayName[i].id == searchKey) && propValue) {
//                console.log('bringing back achievements');
                arrayName[i].show = true;
            }
        }
    };
    
    this.recalculateCost = function(arrayName, index, counts) {
        var nextCost = arrayName[index].cost;
        for (var i = 0; i < counts; i++) {
            nextCost = Math.floor(nextCost * Math.pow(arrayName[index].costIncreaseRate, i+1));
        }
        return nextCost;
    };
    
    this.rebalanceRates = function(arrayName, index, counts, gameSaveFile) {
        var rebalancedIncomeRate = 0;
        var rebalanceCardFlow = 0;
        var rebalanceRareCardRate;
        for (var i = 0; i < counts; i++) {
            rebalancedIncomeRate += arrayName[index].adjustedIncomeRate;
            rebalanceCardFlow += arrayName[index].adjustedCardFlow;
            if (arrayName[index].adjustedRareCardRate != null) {
                rebalanceRareCardRate = gameSaveFile.rareCardRate * arrayName[index].adjustedRareCardRate;
                gameSaveFile.rareCardRate = rebalanceRareCardRate;
            }
        }
        gameSaveFile.incomeRate += rebalancedIncomeRate;
        gameSaveFile.cardFlow += rebalanceCardFlow;
    };
    
});
    

})();