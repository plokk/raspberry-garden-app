var app = angular.module('rp-garden', ['ngRoute', 'firebase', 'highcharts-ng']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/meters_list.html',
            controller: 'ListMeters'
        })
        .otherwise({
            redirectTo: '/'
        });
});

