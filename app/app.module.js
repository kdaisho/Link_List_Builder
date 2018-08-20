'use strict';

angular.module('linkListApp', [
    'ngRoute',
    'formList',
    'linkList'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/encode', {
                templateUrl: 'form-list/form-list.template.html',
                controller: "FormListController"
            })
            .when('/decode', {
                templateUrl: 'link-list/link-list.template.html',
                controller: "LinkListController"
            })
            .otherwise('/encode');
    });