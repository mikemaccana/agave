require('dom4')
var agave = require('agave');

agave.enable('av');

var $ = function(selector) { return document.querySelector(selector) };
var $all = function(selector) { return document.querySelectorAll(selector) };

// Clicking ☰ button displays nav
$('.nav-link').addEventListener('click', function (event) {
  $all('nav, body, .nav-link, .content').avforEach(function(index, element){
    element.classList.toggle('menu-active');
  });
  event.preventDefault();
});

