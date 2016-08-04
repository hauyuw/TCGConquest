(function () {
    
angular.module('saveModule')
    .service('saveService', function() {
    
    this.convertUpgrades = function(arrayName, saveArray) {
        for (var i = 0; i < arrayName.length; i++) {
            var keyName = arrayName[i].id;
            var keyValue = arrayName[i].count;
            var obj = {};
            obj[keyName] = keyValue;
            saveArray[i] = obj;
        }
    };
      
    this.convertAchievements = function(arrayName, saveArray) {
        for (var i = 0; i < arrayName.length; i++) {
            var keyName = arrayName[i].id;
            var keyValue = arrayName[i].show;
            var obj = {};
            obj[keyName] = keyValue;
            saveArray[i] = obj;
        }
    };
    
    this.exportSave = function(content, filename) {
        var blob = new Blob([content], {type: "text/text"});
        
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var e = document.createEvent('MouseEvents');
            var a = document.createElement('a');
            
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/text', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }
        
        ga('send', 'event', 'TCGConquest', 'Save');
    };
    
    //return time stamp in format of "mm-dd-yyyy_HH:MM:ssTT"
    this.timeStamp = function() {
        var now = new Date();
        var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
        var time = [now.getHours(), now.getMinutes(), now.getSeconds()];
        var suffix = (time[0] < 12) ? 'AM' : 'PM';
        time[0] = (time[0] < 12) ? time[0] : time[0]-12;  //convert military time to 12-hour time
        time[0] = time[0] || 12;  //if hour is 0, make it 12 instead
        
        //if the time component is less than 10 (one digit), add a zero before the number
        for (var i = 0; i < 3; i++) {
            if (time[i] < 10) {
                time[i] = '0' + time[i];
            }
        }
        return date.join('-') + '_' + time.join('') + suffix;
    };
});
    

})();