angular.module('notificationModule', [])
    .service('notificationService', function() {
    //helper method for issuing notifications in the UI
    this.giveStatus = function(message, color) {
        k$.status({       
            text: '<span class="xs">' + message + '</span>',
            type: 'status-'+color
        });
    };
});