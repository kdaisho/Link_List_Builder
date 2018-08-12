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
        $scope.textarea = $scope.buildObj(x);
    }

    $scope.convertArrToArr = function(a) {
        var arr = [];
        arr[0] = [];
        arr[1] = [];
        var newa = [];
        for (var i = 0; i < a.length; i++) {
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
});