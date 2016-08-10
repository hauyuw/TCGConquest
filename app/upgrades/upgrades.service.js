(function () {

angular.module('upgradesModule')
    .service('upgradeService', function() {
    
    //helper method that returns the cost of buying the next iteration of an upgrade
    this.calculateNextCost = function(arrayName, index) {
        var nextCost = Math.floor(arrayName[index].baseCost * Math.pow(arrayName[index].costIncreaseRate, arrayName[index].count)); //the holy grail formula: next_building_cost = current_cost * (rateIncrease^current_count)
        return nextCost;
    };
    
    //checks to see if an upgrade becomes available to player based on current resources
    this.checkAvailability = function(arrayName, gameSaveFile) {
        //loop through objects to check if they're available for use
        for (var i = 0; i < arrayName.length; i++) {
            if (arrayName[i].show) {
                continue;
            }
            if ((arrayName[i].count !== null) || (gameSaveFile.income >= arrayName[i].cost && gameSaveFile.cardsSold >= arrayName[i].unlockThreshold)) {
                arrayName[i].show = true;
                if (arrayName[i].count === null) {
                    arrayName[i].count = 0;
                }
            }
        }
    };
        
});
    
})();