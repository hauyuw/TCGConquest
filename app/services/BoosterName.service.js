(function() {
    
angular.module('app')
    .service('generateRandomBoosterName', function() {
    var randomBoosterName;
    var word1 = ["Legend of the", "Metal", "Magic", "Spell", "Labyrinth of", "Legacy of", "Magician's", "Dark", "Invasion of", "Ancient", "Soul of the", "Rise of", "Flaming", "The Lost", "Cybernetic", "Elemental", "Unglued", "Shadow of", "Shadows over", "Enemy of", "Fallen", "Ice", "Fifth", "Champions of", "Betrayers of", "Saviors of", "Planar", "Future", "Time", "Shards of", "Rise of the", "Scars of", "New", "Fate", "Dragons of", "Eldritch", "Oath of", "Battle for", "Return to"];
    var word2 = ["Dragon", "Raiders", "Ruler", "Servant", "Nightmare", "Darkness", "Force", "Crisis", "Chaos", "Santuary", "Duelist", "Destiny", "Eternity", "Millennium", "Revolution", "Energy", "Infinity", "Ragnarok", "Justice", "Empires", "Age", "Alliances", "Dawn", "Sight", "Spiral", "Besieged", "Acension", "Reforged", "Moon", "Expeditions", "Gatewatch", "Reborn", "Blue Eyes White Dragon", "Ravnica"];
    var randomNum1;
    var randomNum2;
    
    this.shuffle = function() {
        randomNum1 = Math.floor(Math.random() * word1.length);
        randomNum2 = Math.floor(Math.random() * word2.length);
        
        randomBoosterName = word1[randomNum1] + ' ' + word2[randomNum2];
        return randomBoosterName;
    }
});
    
})();