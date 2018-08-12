'use strict';

var linkListApp = angular.module('linkListApp', []);

linkListApp.controller('LinkListController', function LinkListController($scope) {
    $scope.forms = [
        {
            label: {
                name: 'Link',
                title: 'Title',
                url: 'URL',
                output: 'Output'
            },
            title: '',
            url: ''
        }
    ];

    $scope.textarea = '';

    $scope.encode = function() {
        var obj = {};
        for (let i = 0; i < $scope.forms.length; i++) {
            console.log($scope.forms[i].title);
            obj.t = $scope.forms[i].title;
            obj.u = $scope.forms[i].url;
            console.log(obj);
        }
        obj = JSON.stringify(obj);
        console.log(obj);
        var encoded = btoa(obj);
        $scope.textarea = encoded;
    }

    $scope.decode = function() {
        console.log($scope.textarea);

        const text = atob($scope.textarea);
        console.log(text);
        var u = JSON.stringify(text);
        console.log(u);
    }
});

// var textarea = document.getElementById('textArea');
// var encodeBtn = document.getElementById('encode');
// var decodeBtn = document.getElementById('decode');
// var title = document.getElementById('title');
// var url = document.getElementById('url');
// var obj = {};

// encodeBtn.addEventListener('click', function() {
//     obj.a = title.value;
//     console.log(obj);
//     obj = JSON.stringify(obj);
//     console.log(obj);
//     var b = btoa(obj);

//     // console.log(b);
//     textarea.innerHTML = b;
// });

// decodeBtn.addEventListener('click', function() {
//     var k = textarea.value;
//     console.log('encoded: ' + k);
//     var b = atob(k);
//     b = JSON.stringify(b);
//     alert(b);
//     console.log('decoded2: ' + b.a);
//     textarea.innerHTML = b;
// });