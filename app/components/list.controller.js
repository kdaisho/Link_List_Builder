(function() {
    'use strict';

    angular
        .module('listApp')
        .controller('listCtrl', function($scope, $state, listFactory, $mdSidenav, $mdToast, $mdDialog) {

            var self = this;

            self.categories;
            self.list;
            self.item;
            self.closeSidebar = closeSidebar;
            self.deleteItem = deleteItem;
            self.editing;
            self.editItem = editItem;
            self.openSidebar = openSidebar;
            self.saveEdit = saveEdit;
            self.encode = encode;
            self.convertArrToArr = convertArrToArr;


            listFactory.getList().then(function(res) {
                self.list = res.data;
                self.categories = getCategories(self.list);
            });

            $scope.$on('createItem', function(event, item) {
                item.id = self.list.length + 1;
                self.list.push(item);
                showToast('Item saved!');
            });

            $scope.$on('editSaved', function(event, msg) {
                showToast(msg);
            });

            function openSidebar() {
                $state.go('list.create');
            }

            function closeSidebar() {
                $mdSidenav('left').close();
            }

            function editItem(item) {
                console.log(item);
                $state.go('list.edit', {
                    id: item.id,
                    item: item
                });
            }

            function saveEdit() {
                self.editing = false;
                self.item = {};
                closeSidebar();
                showToast('Edit saved!');
            }

            function deleteItem(event, item) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete ' + item.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function() {
                    var index = self.list.indexOf(item);
                    self.list.splice(index, 1);
                }, function() {

                });
            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top, right')
                        .hideDelay(3000)
                );
            }

            function getCategories(list) {
                var categories = [];

                angular.forEach(list, function(x) {
                    angular.forEach(x.categories, function(category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }

            function encode() {
                console.log(self.list);
                var newarr = this.convertArrToArr(self.list);
                console.log(newarr);
                var encoded = btoa(newarr);
                document.getElementById('encoded').innerHTML = encoded;
                // this.textarea = encoded;
            }

            function convertArrToArr(a) {
                var arr = [];

                for (var i = 0; i < a.length; i++) {
                    arr[i] = [];
                    for (var prop in a[i]) {
                        arr[i].push(a[i][prop]);
                    }
                }
                return arr;
            }

            self.decode = decode;
            self.buildObj = buildObj;
            self.createMatrix = createMatrix;
            self.buildView = buildView;

            function decode() {
                var code = document.getElementById('decoded').value;
                console.log('code1 ' + code);
                var base64 = atob(code);
                console.log('code2 ' + base64);
                this.buildView(this.buildObj(base64), self.list);
            }

            function buildObj(str) {
                var arr = [];
                var twoDimArray = [];
                arr = str.replace(/,object:\d+/g, '').split(',');
                // arr = str.replace(/,object:\d+/g, '');
                console.log('before: ' + arr);
                // arr = arr.replace(/(\d+)/g, '"$1"').split(',');
                console.log('after: ' + arr);
                console.log('isArray?: ' + Array.isArray(arr));
                twoDimArray = this.createMatrix(arr, 4);
                console.log('Two ARR ' + twoDimArray);
                console.log(twoDimArray);
                return twoDimArray;
                // return twoDimArray = this.createMatrix(arr, 2);
            }

            function createMatrix(arr, len) {
                var matrix = [],
                    i, k;
                for (i = 0, k = -1; i < arr.length; i++) {
                    if (i % len === 0) {
                        k++;
                        matrix[k] = [];
                    }
                    matrix[k].push(arr[i]);
                }
                console.log('mat? ' + matrix);
                console.log(matrix);
                return matrix;
            }

            function buildView(arr, obj) {
                var propList = Object.getOwnPropertyNames(obj[0]);
                console.log(propList);
                for (var i = 0; i < arr.length; i++) {
                    for (var k = 0; k < arr[i].length; k++) {
                        console.log(obj);
                        var prop = propList[k]
                        obj[i][prop] = arr[i][k];
                        console.log('end ' + obj);
                    }
                }
                self.forms = obj;
                // self.list = obj;
            }
        });
}());