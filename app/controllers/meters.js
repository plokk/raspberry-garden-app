app.controller('ListMeters', function($scope, FirebaseService) {
    $scope.charts = FirebaseService.getAll();
    $scope.chartdata = [];
    $scope.chartConfig = {
        options: {
            chart: {
                zoomType: 'x'
            },
            rangeSelector: {
                enabled: true
            },
            navigator: {
                enabled: true
            }
        },
        series: [],
        title: {
            text: 'Hello'
        },
        useHighStocks: false
    };

    FirebaseService.getAllThen(function(data) {
        $scope.charts = data;

        var objects = $scope.charts[0];
        $scope.getValues(objects, 'temperature');
    });

    $scope.getValues = function(device, valueName) {
        var values = [];
        for (var id in device) {
            var object = device[id] || {};
            values.push([object['timestamp'], object[valueName]]);
        }
        $scope.pushToChartSeries(device.$id + valueName, values);
        console.log(device.$id);
        console.log(values);
    };

    $scope.pushToChartSeries = function(name, array) {
        $scope.chartConfig.series.push(
            {
                id: name,
                data: array
            })
    };
});