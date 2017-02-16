(function() {
    'use strict';

    angular.module('Services').factory('MovieList', [
        '$resource',
        '$q',
        'ApiService',
        MovieListFactory
    ]);

    function MovieListFactory($resource, $q, ApiService) {
        function MovieList(){
            this.childNodes = {}; 
        }
        /**
         * add new game as child in the list
         * @param {objToAdd} - added childnode from the response
         * @returns promise
         */
        
        MovieList.prototype.init = function(){
            return this.getCollections();
        }

        MovieList.prototype.getCollections = function(obj) {
            return ApiService.getCollection().get({id: 528}).$promise
                .then(this.getCollectionData.bind(this));
        }

        MovieList.prototype.getCollectionData = function(obj) {
            var self = this;
            var promises = [];

            _.each(obj.parts, function(part){
                var child = self.parseCollection(part);
                if (self.childNodes[child.id] !== undefined) { return false };
                self.childNodes[child.id] = child;

                self.getMovies(child.id);
                self.getCredits(child.id);         
            })
            return true;
        }

        MovieList.prototype.getMovies = function(id) {
            return ApiService.getMovies().get({id: id}).$promise
                .then(this.getMoviesData.bind(this));
        }

        MovieList.prototype.getMoviesData = function(obj) {
            var child = this.parseMovie(obj);
            this.childNodes[child.id] = _.extend(this.childNodes[child.id], child);
            return true;
        }

        MovieList.prototype.getCredits = function(id) {
            return ApiService.getCredits().get({id: id}).$promise
                .then(this.getCreditsData.bind(this));
        }

        MovieList.prototype.getCreditsData = function(obj) {
            var child = this.parseCredits(obj);
            this.childNodes[child.id] = _.extend(this.childNodes[child.id], child);
            return true;
        }

        /**
         * helper function to parse the data from server
         * @param {obj} - parse the data to required format from server
         * @returns parsed object
         */
        
        MovieList.prototype.parseCollection = function(obj) {
            return {
                id: obj['id'],
                title: obj['title'],
                overview: obj['overview']
            };
        }

        /**
         * helper function to parse the data from server
         * @param {obj} - parse the data to required format from server
         * @returns parsed object
         */
        
        MovieList.prototype.parseMovie = function(obj) {
            return {
                id: obj['id'],
                imgSrc: 'http://image.tmdb.org/t/p/w342/' + obj['poster_path'],
            };
        }

        /**
         * helper function to parse the data from server
         * @param {obj} - parse the data to required format from server
         * @returns parsed object
         */
        
        MovieList.prototype.parseCredits = function(obj) {
            var crew = obj.crews;
            var director = _.filter(obj.crew, function(crew) {
                return crew.job === 'Director';
            })
            var writers = _.filter(obj.crew, function(crew) {
                return crew.department === 'Writing';
            })
            return {
                id: obj['id'],
                director: director[0].name,
                writers: writers,
                cast: obj['cast']
            };
        }
        return new MovieList();
    }
}());