app.service('FirebaseService', function($firebaseArray, $firebaseObject){
    var firebaseRef = new Firebase('https://greenhouse-data.firebaseio.com/');

    this.getAllSensors = function(callback) {
        var sensorRef = firebaseRef.child('sensordata');
        var sensorData = $firebaseObject(sensorRef);
        sensorData.$loaded(function(sensorData) {
            callback(sensorData);
        });
    };

    this.getSensorConfigs = function(callback) {
        var confRef = firebaseRef.child('sensors');
        confRef.on("value", function(snapshot) {
            callback(snapshot.val());
        });
    };

});