app.controller('ListMeters', function($scope, FirebaseService) {
    $scope.sensorseries = {};
    $scope.charts = {};

    $scope.loadConfAndSensorData = function(callback) {
        FirebaseService.getSensorConfigs(function(confData) {
            $scope.sensorconfs = confData;
            FirebaseService.getAllSensors(function(sensorData) {
                $scope.sensors = sensorData;
                callback();
            });
        });
    };

    $scope.fillCharts = function() {
        for (var sensor in $scope.sensorconfs) {
            for (var measureName in $scope.sensorconfs[sensor]['measures']) {
                $scope.writeDeviceValues(sensor, measureName);
            }
            $scope.charts[sensor] = $scope.charts[sensor] || {};
            $scope.charts[sensor] = $scope.chartConfigurator(sensor, $scope.sensorseries[sensor]);
        }
    };

    $scope.writeDeviceValues = function(device, measureName) {
        var values = [];
        for (value in $scope.sensors[device]) {
            values.push([moment($scope.sensors[device][value]['timestamp']).unix() * 1000, $scope.sensors[device][value][measureName]]);
        }
        $scope.pushToChartSeries(device, measureName, values);
    };

    $scope.pushToChartSeries = function(device, measureName, array) {
        var sortedArray = array.sort($scope.compareByTimestamp);
        $scope.sensorseries[device] = $scope.sensorseries[device] || [];
        $scope.sensorseries[device].push(
            {
                name: measureName,
                data: sortedArray
            }
        );
    };

    $scope.chartConfigurator = function(sensorname, series) {
        var chartconf = {
            options: {
                chart: {
                    zoomType: 'x'
                },
                navigator: {
                    enabled: true
                }
            },
            series: series,
            title: {
                text: sensorname
            },
            xAxis:{
                type: 'datetime'
            }
        };
        return chartconf;
    };

    $scope.compareByTimestamp = function(a, b) {
        return (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0);
    };

    $scope.loadConfAndSensorData($scope.fillCharts);
});