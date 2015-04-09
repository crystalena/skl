'use strict';

angular.module('searchApp.controllers', [function(){
}])
.controller('BindingCtrl', ['$scope', function($scope) {
	$scope.model = {};
	$scope.model.myInt = 6;

	$scope.addOne = function() {
		$scope.model.myInt++;
	}
}])
.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.model = {};

	$scope.model.allQueries = [];

	$scope.model.errorMessage = undefined;

	//Load the data initially
	$scope.model.isAjaxInProgress = true;

	//Load all queries
	$http({
		url: '/search/', method: "GET"
	}).
	success(function(data) {
		//callback will be called asynchronously
		$scope.model.allQueries = data;

		$scope.model.isAjaxInProgress = false;
	}).
	error(function(data, status) {
		$scope.model.errorMessage = "Error occurred status" + status;

		$scope.model.isAjaxInProgress = false;
	});

	$scope.delete = function(id) {
		$scope.model.isAjaxInProgress = true;
		$http({
			url:'/search/' + id,
			method: "DELETE"
		})
	}.
	success(function(data) {
		$scope.model.allQueries = data;

		$scope.model.isAjaxInProgress = false;
	}).
	error(function(data, status) {
		$scope.model.errorMessage = "Error occurred status" + status;

		$scope.model.isAjaxInProgress = false;
	});

	$scope.sendSearch = function() {
		$scope.model.errorMessage = undefined;

		if ($scope.model.query == undefined ||
			$scope.model.query == '') {
			$scope.model.errorMessage = "Please enter something!";
			return;
		}

		$scope.model.isAjaxInProgress = true;

		$http({
			url: '/search/', method: "POST",
			data: {search: $scope.model.query}
		}).
		success(function(data) {
			$scope.model.allQueries = data;

			$scope.model.isAjasInProgress = false;
		}).
		error(function(data, status) {
			$scope.model.errorMessage = "Error occured status" + status;

			$scope.model.isAjaxInProgress = false;
		});
	}
}]);