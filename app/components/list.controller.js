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
        });
}());