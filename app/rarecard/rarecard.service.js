(function () {
    
angular.module('rareCardModule')
    .service('rareCardService', function() {
    
     //game of fate
    this.rollForRareCard = function(saveFile) {
        var randomNum = Math.random();
//        console.log(randomNum + " out of " + saveFile.rareCardRate);
        if (randomNum <= saveFile.rareCardRate) {
            saveFile.rareCardCount++;
            console.log("got a rare card!");
        }
//        console.log('no rare card :(');
    };
});
    
})();