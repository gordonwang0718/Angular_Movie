angular.module('Directives', []).directive('movieShow', [function(){
	// Runs during compile
	return {
		templateUrl: '../scripts/directives/movieShow.tpl.html',
		restrict: 'E',
		controller: 'MovieShowCtrl',
		scope: {
			movieId: '='
		},
		link: linkFunc
	};
}]);

function linkFunc(scope, elem, attrs) { // linkFunc 类似于 jQuery 一样的 dom 操作

}