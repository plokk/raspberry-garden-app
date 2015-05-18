app.service('FirebaseService', function($firebaseArray){
    var firebaseRef = new Firebase('https://greenhouse-data.firebaseio.com/');
    var data = $firebaseArray(firebaseRef);

    this.getAllThen = function(callback) {
        data.$loaded(function() {
            callback(data);
        });
    };

    this.getAll = function() {
        return data;
    }

    this.getItem = function(key, callback) {
        data.$loaded(function() {
            callback(data.$getRecord(key));
        });
    };

});