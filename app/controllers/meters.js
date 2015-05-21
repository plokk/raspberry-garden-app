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
        $scope.sensorseries[device] = $scope.sensorseries[device] || [];
        $scope.sensorseries[device].push(
            {
                name: measureName,
                data: array
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

    $scope.loadConfAndSensorData($scope.fillCharts);
});