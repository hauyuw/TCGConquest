(function() {
    
angular.module('app')
    .service('generateRandomGameName', function() {
    var randomGameName;
    var word1 = ['WIXOSS', 'Battle', 'Duel', 'Magic', 'Cardfight!!', 'Card', 'Dragon', 'Epic', 'Knights of', 'The Last', 'Wizard\'s', 'Future', 'Legend of', 'Star', 'Galaxy'];
    var word2 = ['Masters', 'Buddyfight', 'Spirits', 'Monsters', 'the Gathering', 'Vanguard', 'Wars', 'King', 'Queen', 'Showdown', 'Quest', 'Soul', 'Hearthstone', 'Combat'];
    var randomNum1;
    var randomNum2;
    
    this.shuffle = function() {
        randomNum1 = Math.floor(Math.random() * word1.length);
        randomNum2 = Math.floor(Math.random() * word2.length);
        
        randomGameName = word1[randomNum1] + ' ' + word2[randomNum2];
        return randomGameName;
    }
});
    
})();