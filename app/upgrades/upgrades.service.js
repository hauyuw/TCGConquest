(function () {

angular.module('upgradesModule')
    .service('upgradeService', function() {
        this.calculateNextCost = function(arrayName, index) {
        var nextCost = Math.floor(arrayName[index].cost * Math.pow(arrayName[index].costIncreaseRate, arrayName[index].count));
        return nextCost;
    };
    
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