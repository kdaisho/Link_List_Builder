(function () {

    'use strict';

    angular
        .module('listApp')
        .controller('createListCtrl', function ($state, $scope, $mdSidenav, $mdDialog, listFactory, $timeout) {

            var self = this;

            self.closeSidebar = closeSidebar;
            self.saveItem = saveItem;

            $scope.$watch('ctrl.sidenavOpen', function (sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function () {
                            $state.go('list');
                        });
                }
            });

            $timeout(function () {
                $mdSidenav('left').open();
            });

            function closeSidebar() {
                self.item = {};
                self.sidenavOpen = false;
            }

            function saveItem(item) {
                if (item) {
                    $scope.$emit('createItem', item);
                    self.sidenavOpen = false;
                }
            }

        });
})();