angular.module('notificationModule', [])
    .service('notificationService', function() {
    //helper method for issuing notifications in the UI
    this.giveStatus = function(message, color) {
        k$.status({       
            text: '<h4>' + message + '</h4>',
            type: 'status-'+color
        });
    };
});