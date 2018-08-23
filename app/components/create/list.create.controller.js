(function () {

    'use strict';

    angular
        .module('listApp')
        .controller('createListCtrl', function ($state, $scope, $mdSidenav, $mdDialog, listFactory, $timeout) {

            var self = this;

            self.closeSidebar = closeSidebar;
            self.saveItem = saveItem;

            $scope.$watch('self.sidenavOpen', function (sidenav) {
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
                    item.contact = {
                        name: 'Daisho',
                        phone: '(514) 775-9111',
                        email: 'daishokomiyama@gmail.com'
                    };

                    $scope.$emit('createItem', item);
                    self.sidenavOpen = false;
                }
            }

        });
})();