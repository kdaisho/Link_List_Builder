'use strict';

angular
    .module('linkList')
    .component('linkList', {
        templateUrl: 'link-list/link-list.template.html',
        controller: function LinkListController($http) {
            var self = this;
            $http.get('data/data.json').then(function(response) {
                self.forms = response.data;
            });

            this.decode = function () {
                var code = document.getElementById('textarea2').value;
                var base64 = atob(code);
                console.log('code ' + base64);
                this.buildView(this.buildObj(base64), this.forms);
            }

            this.buildObj = function (str) {
                var arr = [];
                var twoDimArray = [];
                arr = str.replace(/,object:\d+/g, '').split(',');
                return twoDimArray = this.createMatrix(arr, 2);
            }

            this.createMatrix = function (arr, len) {
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