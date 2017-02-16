(function() {
	'use strict';
	angular.module('Controllers').
		controller('MovieShowCtrl', [
			'$scope', 
			'MovieList',
			MovieShowCtrl
		]);
		function MovieShowCtrl($scope, MovieList) {
			$scope.$watch('movieId', function(newData){

				$scope.currentMovie = MovieList.childNodes[newData];
				console.log(MovieList.childNodes);
			});

			$scope.$watch('currentMovie.cast[0]', function(newData){
				if (newData) {
					$scope.currentProfile = newData.profile_path;
				}
			})

			$scope.chooseProfile = function(src){
				$scope.currentProfile = src;
			}
		}
}());	