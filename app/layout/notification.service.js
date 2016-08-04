angular.module('notificationModule', [])
    .service('notificationService', function() {
    this.giveStatus = function(message, color) {
        k$.status({       
            text: '<h4>' + message + '</h4>',
            type: 'status-'+color
        });
    };
});