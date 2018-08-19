'use strict';

angular
    .module('formList')
    .component('formList', {
        templateUrl: 'form-list/form-list.template.html',
        controller: function FormListController($http) {
            var self = this;
            $http.get('data/data.json').then(function (response) {
                self.forms = response.data;
            });

            this.textarea = '';

            this.encode = function () {
                var newarr = this.convertArrToArr(this.forms);
                var encoded = btoa(newarr);
                this.textarea = encoded;
                document.getElementById('textarea').innerHTML = encoded;
            }

            this.decode = function () {
                var code = document.getElementById('textarea').value;
                var base64 = atob(code);
                console.log('code ' + base64);
                this.buildView(this.buildObj(base64), this.forms);
            }

            this.convertArrToArr = function (a) {
                var arr = [];

                for (var i = 0; i < a.length; i++) {
                    arr[i] = [];
                    for (var prop in a[i]) {
                        arr[i].push(a[i][prop]);
                    }
                }
                return arr;
            }

            this.buildObj = function (str) {
                var arr = [];
                var twoDimArray = [];
                arr = str.replace(/,object:\d+/g, '').split(',');

                return twoDimArray = this.createMatrix(arr, 2);
            }

            this.createMatrix = function (arr, len) {
                var matrix = [],
                    i, k;
                for (i = 0, k = -1; i < arr.length; i++) {
                    if (i % len === 0) {
                        k++;
                        matrix[k] = [];
                    }
                    matrix[k].push(arr[i]);
                }
                return matrix;
            }

            this.buildView = function (arr, obj) {
                var propList = Object.getOwnPropertyNames(obj[0]);
                for (var i = 0; i < arr.length; i++) {
                    for (var k = 0; k < arr[i].length; k++) {
                        var prop = propList[k]
                        obj[i][prop] = arr[i][k];
                    }
                }
                console.log('forms obj1: ' + self.forms[0]['title']);
                self.forms = obj;
                console.log('done ' + obj[0]['title']);
                console.log('forms obj2: ' + self.forms[0]['title']);
            }
        }

    });
// linkListApp.controller('LinkListController', function LinkListController(this:w) {


//     $scope.textarea = '';

//     $scope.encode = function() {
//         var newarr = $scope.convertArrToArr($scope.forms);
//         var encoded = btoa(newarr);
//         $scope.textarea = encoded;
//     }

//     $scope.decode = function() {
//         var base64 = atob($scope.textarea);
//         $scope.buildView($scope.buildObj(base64), $scope.forms);
//     }

//     $scope.convertArrToArr = function(a) {
//         var arr = [];

//         for (var i = 0; i < a.length; i++) {
//             arr[i] = [];
//             for (var prop in a[i]) {
//                 arr[i].push(a[i][prop]);
//             }
//         }
//         return arr;
//     }

//     $scope.buildObj = function(str) {
//         var arr = [];
//         var twoDimArray = [];
//         arr = str.replace(/,object:\d+/g, '').split(',');

//         return twoDimArray = $scope.createMatrix(arr, 2);
//     }

//     $scope.createMatrix = function(arr, len) {
//         var matrix = [], i, k;
//         for (i = 0, k = -1; i < arr.length; i++) {
//             if (i % len === 0) {
//                 k++;
//                 matrix[k] = [];
//             }
//             matrix[k].push(arr[i]);
//         }
//         return matrix;
//     }

//     $scope.buildView = function(arr, obj) {
//         var propList = Object.getOwnPropertyNames(obj[0]);
//         for (var i = 0; i < arr.length; i++) {
//             for (var k = 0; k < arr[i].length; k++) {
//                 var prop = propList[k]
//                 obj[i][prop] = arr[i][k];
//             }
//         }
//         console.log('done');
//     }
// });