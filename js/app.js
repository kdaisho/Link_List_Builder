'use strict';

var textarea = document.getElementById('textArea');
var encodeBtn = document.getElementById('encode');
var decodeBtn = document.getElementById('decode');
var title = document.getElementById('title');
var url = document.getElementById('url');
var obj = {};

encodeBtn.addEventListener('click', function() {
    var a = title.value;
    console.log(a);
    var b = btoa(a);

    console.log(b);
    textarea.innerHTML = b;
});

decodeBtn.addEventListener('click', function() {
    var a = textarea.value;
    console.log('encoded: ' + a);
    var b = atob(a);
    console.log('decoded: ' + b);
    textarea.innerHTML = b;
});