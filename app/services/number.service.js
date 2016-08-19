(function () {
    
angular.module('app')
    .service('numberService', function() {
    
    //format numbers to have commas at the hundredth places
    this.formatForDisplay = function(numToFormat) {
        return numToFormat.toLocaleString();
    };
    
    //deals with those pesky rouge decimals; thanks Obama
    this.tidyUpNum = function(input) {
        return Math.round(input * 1000000)/1000000;
    };
});
    
})();