(function () {
    
angular.module('saveModule')
    .service('loadService', function() {
    
    //does this object exist?
    this.checkPresence = function(objectToCheck) {
        if (typeof objectToCheck === 'undefined' || objectToCheck === null) {
            return false;
        }
        return true;
    };
    
    //takes the upgrade arrays from the save location and reconvert for current game load, while accounting for any balance changes
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
    
    //takes the achievement array from the save location and reconverts for current game load, while accounting for the addition/removal of achievements from the overall list
    this.reconvertAchievements = function(arrayName, saveArray) {
        if (!this.checkPresence(saveArray)) {
            return;
        }
        for (var i = 0; i < saveArray.length; i++) {
            var searchKey = Object.getOwnPropertyNames(saveArray[i]);
            var propValue = saveArray[i][searchKey];
            if ((arrayName[i].id == searchKey) && propValue) {
//                console.log('bringing back achievements');
                arrayName[i].unlocked = true;
            } else {
                arrayName[i].unlocked = false;
            }
        }
    };
    
    //recalculates the cost of buying the next count of an upgrade
    this.recalculateCost = function(arrayName, index, counts) {
        var nextCost = arrayName[index].cost;
        for (var i = 0; i < counts; i++) {
            nextCost = Math.floor(arrayName[index].baseCost * Math.pow(arrayName[index].costIncreaseRate, arrayName[index].count));
        }
        return nextCost;
    };
    
    //rebalances overall income and card rate based on number of upgrades already owned in case of balance changes
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
    
    //check save file data validity; can it be decompressed from base64? can it be parsed?
    this.importServices = function(dataFile) {
        //check to make sure that the file format entered matches
        if (!dataFile) {
            console.warn('You attempted to load an invalid game state. Please try again with data from a valid file.');
            return false;
        }
        
        try {
            LZString.decompressFromBase64(dataFile);
        } catch(e) {
            console.error('Could not decompress string');
            return false;
        }
        
        try {
            JSON.parse(LZString.decompressFromBase64(dataFile));
        } catch(e) {
            console.error('Could not parse data. Try again.');
            return false;
        }
        
//        console.log('Valid game state was given');
        return true;
    };
    
});
    

})();