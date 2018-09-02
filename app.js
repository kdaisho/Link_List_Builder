'use strict';

angular
    .module('listApp', ['ngMaterial', 'ui.router'])
    .config(function ($mdThemingProvider, $stateProvider, $locationProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue', {
                'default': 'A700'
            })
            .warnPalette('red')
            .accentPalette('green', {
                'default': '600'
            })
            ;
        $mdThemingProvider.enableBrowserColor({
            theme: 'default', // Default is 'default'
            palette: 'primary', // Default is 'primary', any basic material palette and extended palettes are available
        });

        //Entry URL: <domain>/#/list
        $stateProvider
            .state('list', {
                url: '/list',
                templateUrl: 'components/list.template.html',
                controller: 'listCtrl as ctrl'
            })
            .state('list.create', {
                url: '/create',
                templateUrl: 'components/create/list.create.template.html',
                controller: 'createListCtrl as ctrl'
            })
            .state('list.edit', {
                url: '/edit/:id',
                templateUrl: 'components/edit/list.edit.template.html',
                controller: 'editListCtrl as ctrl',
                params: {
                    item: null
                }
            });
        $locationProvider.hashPrefix('');
    });