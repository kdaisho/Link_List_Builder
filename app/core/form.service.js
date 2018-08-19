'use strict';

angular.
    module('core.phone').
    factory('Form', ['$resource',
        function($resource) {
            return $resource('phones/:phoneId.json', {}, {
                query: {
                    method: 'GET',
                    params: {phoneId: 'phones'},
                    isArray: true
                }
            });
        }
    ]);