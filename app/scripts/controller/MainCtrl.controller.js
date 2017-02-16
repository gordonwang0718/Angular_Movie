(function() {
	'use strict';

	angular.module('Controllers', []).controller('MainCtrl', [
		'$scope',
		'$resource',
		'MovieList',
		MainCtrl
		]);

	function MainCtrl($scope, $resource, MovieList) { 
		
		MovieList.init().then(function(){
			$scope.MovieList = MovieList;
			$scope.movieId = _.values(MovieList.childNodes)[0].id;
		})
		.catch(function(err) {
			$scope.errorMessage = err || err.data || err.data.message;
		})

		$scope.chooseMovie = function(id) {
			$scope.movieId = id;
			console.log($scope.movieId);
		}
	}
}());