requirejs.config({
  // By default load any module IDs from js dir
  baseUrl: 'js'
});

requirejs(["ie9classlist", "agave"], function(unused, agave) {
  agave.enable('av');
  var $ = function(selector) { return document.querySelector(selector) };
  var $all = function(selector) { return document.querySelectorAll(selector) };

  // Clicking ☰ button displays nav
  $('.nav-link').addEventListener('click', function (event) {
    $all('nav, body, .nav-link, .content').avforEach(function(element){
      element.avtoggleClass('menu-active');
    });
    event.preventDefault();
  });
})

