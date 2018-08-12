'use strict';

var linkListApp = angular.module('linkListApp', []);

linkListApp.controller('LinkListController', function LinkListController($scope) {
    $scope.forms = [
        {
            title: 'a',
            url: 'b'
        },
        {
            title: 'c',
            url: 'd'
        },
        {
            title: 'e',
            url: 'f'
        }
    ];

    $scope.textarea = '';

    $scope.encode = function() {
        var newarr = $scope.convertArrToArr($scope.forms);
        var encoded = btoa(newarr);
        $scope.textarea = encoded;
    }

    $scope.decode = function() {
        var x = atob($scope.textarea);
        // $scope.textarea = $scope.buildObj(x);
        var y = $scope.buildObj(x);
        $scope.build(y, $scope.forms);
        console.log($scope.forms);
    }

    $scope.convertArrToArr = function(a) {
        var arr = [];
        // arr[0] = [];
        // arr[1] = [];

        for (var i = 0; i < a.length; i++) {
            arr[i] = [];
            for (var prop in a[i]) {
                arr[i].push(a[i][prop]);
            }
        }
        return arr;
    }

    $scope.buildObj = function(str) {
        var arr = [];
        var darr = [];
        str = str.replace(/,object:\d+/g, '');
        arr = str.split(',');

        darr = $scope.matrix(arr, 2);

        console.log('RESULT ' + darr);
        return darr;
    }

    $scope.matrix = function(arr, len) {
        var matrix = [], i, k;
        for (i = 0, k = -1; i < arr.length; i++) {
            if (i % len === 0) {
                k++;
                matrix[k] = [];
            }
            matrix[k].push(arr[i]);
        }
        return matrix;
    }

    $scope.build = function(arr, obj) {
        var propList = Object.getOwnPropertyNames(obj[0]);
        for (var i = 0; i < arr.length; i++) {
            for (var k = 0; k < arr[i].length; k++) {
                var prop = propList[k]
                obj[i][prop] = arr[i][k];
            }
        }
        alert('done');
    }
});