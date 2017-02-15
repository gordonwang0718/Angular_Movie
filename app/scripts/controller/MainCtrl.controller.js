(function() {
	'use strict';

	angular.module('Controllers', []).controller('MainCtrl', [
		'$scope',
		// 'ApiService',
		// 'MovieList',
		MainCtrl
		]);

	function MainCtrl($scope) {
		$scope.context = "test";

	}
})();