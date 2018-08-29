(function() {
    'use strict';

    angular
        .module('listApp')
        .factory('listFactory', function($http) {

            function getList() {
                return $http.get('data/data.json');
            }

            return {
                getList: getList
            }
        });
}());