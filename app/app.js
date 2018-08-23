'use strict';

angular
    .module('listApp', ['ui.router'])
    .config(function($mdThemingProvider, $stateProvider, $locationProvider) {

        $mdThemingProvider.theme('blue')
            .primaryPalette('bule')
            .accentPalette('yellow')
            .enableBrowserColor({
                theme: 'default',
                palette: 'primary',
                hue: '400'
            });

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
                    list: null
                }
            });
        $locationProvider.hasPrefix('');
    });