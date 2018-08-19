'use strict';

var linkListApp = angular.module('linkListApp', []);
var data;

linkListApp.controller('LinkListController', function LinkListController($scope) {
    $scope.forms = [
        {
            title: '',
            url: ''
        },
        {
            title: '',
            url: ''
        },
        {
            title: '',
            url: ''
        }
    ];

    $scope.textarea = '';

    $scope.encode = function() {
        var newarr = $scope.convertArrToArr($scope.forms);
        var encoded = btoa(newarr);
        $scope.textarea = encoded;
    }

    $scope.decode = function() {
        var base64 = atob($scope.textarea);
        $scope.buildView($scope.buildObj(base64), $scope.forms);
    }

    $scope.convertArrToArr = function(a) {
        var arr = [];

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
        var twoDimArray = [];
        arr = str.replace(/,object:\d+/g, '').split(',');

        return twoDimArray = $scope.createMatrix(arr, 2);
    }

    $scope.createMatrix = function(arr, len) {
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

    $scope.buildView = function(arr, obj) {
        var propList = Object.getOwnPropertyNames(obj[0]);
        for (var i = 0; i < arr.length; i++) {
            for (var k = 0; k < arr[i].length; k++) {
                var prop = propList[k]
                obj[i][prop] = arr[i][k];
            }
        }
        console.log('done');
    }
});