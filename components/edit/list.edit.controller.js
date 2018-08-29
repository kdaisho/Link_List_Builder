(function() {

    'use strict';

    angular
        .module('listApp')
        .controller('editListCtrl', function($state, $scope, $mdSidenav, $mdDialog, listFactory, $timeout) {

            var self = this;

            self.closeSidebar = closeSidebar;
            self.saveEdit = saveEdit;
            self.item = $state.params.item;

            $scope.$watch('ctrl.sidenavOpen', function(sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function() {
                            $state.go('list');
                        });
                }
            });

            $timeout(function() {
                $mdSidenav('left').open();
            });

            function closeSidebar() {
                self.list = {};
                self.sidenavOpen = false;
            }

            function saveEdit() {
                $scope.$emit('editSaved', 'Edit saved!');
                self.sidenavOpen = false;
            }

        });
})();