(function () {
    
angular.module('rareCardModule')
    .service('rareCardService', function() {
    
     //game of fate
    this.rollForRareCard = function(saveFile) {
        var randomNum = Math.random();
        if (saveFile.duration >= 600000 && saveFile.rareCardCount === null) {
            if (randomNum <= 0.1) {
                saveFile.rareCardCount++;
                saveFile.totalRareCards++;
//                console.log("got a rare card!");
                return;
            }
        }
        
//        console.log(randomNum + " out of " + saveFile.rareCardRate);
        if (randomNum <= saveFile.rareCardRate) {
            saveFile.rareCardCount++;
            saveFile.totalRareCards++;
//            console.log("got a rare card!");
        }
//        console.log('no rare card :(');
    };
});
    
})();