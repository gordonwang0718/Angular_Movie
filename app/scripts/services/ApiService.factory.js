(function() {
	'use strict';
	angular.module('Services', []).factory('ApiService', [
		'$resource',
		'$http',
		ApiServiceFactory
	]);
	function ApiServiceFactory($resource, $http){
	/**
     * @namespace
     */
    	function ApiService() {
    		this.baseUrl = "https://api.themoviedb.org/3";
    		this.apiToken = "?api_key=bd9996a1be060f243cbbd4d4257a1b48";
    	}

    	ApiService.prototype.getCollection = function (){
    		return $resource(this.baseUrl + '/collection/:id' + this.apiToken);
    	}

    	ApiService.prototype.getMovies = function (){
    		return $resource(this.baseUrl + '/movie/:id' + this.apiToken);
    	}

    	ApiService.prototype.getCredits = function (){
    		return $resource(this.baseUrl + '/movie/:id/credits' + this.apiToken);
    	}

    	return new ApiService();
    }
}()) ;