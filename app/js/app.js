'use strict';

angular.module('searchApp', ['searchApp.controllers', function() {
}])
    .config(['routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: '/app/search-controller/search.html',
            controller: 'searchCtrl'
        });

        $routeProvider.otherwise({ redirectTo: '/search'});
    }])
