requirejs.config({
  // By default load any module IDs from js dir
  baseUrl: 'js'
});

requirejs(["agave"], function(agave) {
  agave.enable('av');
  var $ = function(selector) {
    return document.querySelector(selector);
  }
  var nav = $('nav')
  var navLink = $('.nav-link')
  var body = $('body')

  navLink.addEventListener('click', function (event) {
    event.preventDefault();
    [body, nav].forEach(function(element){
      element.avtoggleClass('active');
    });
  });
})

