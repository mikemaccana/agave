## 2.0.0 (2016-08-03)

 - agave now uses [semver](http://semver.org/). Since this is the first major breaking change we're releasing to 2.0.0
 - `agave.enable()` is now just `agave()` - ie the module exports a single function
 - number..seconds, number..minutes, number..hours etc are now attributes, rather than functions.
 - Add date.isOnWeekend(), date.withoutTime(), and date.clone()
 - agave itself is now written in ES6

## 0.6.1 (2015-02-22)

 - Replace array.contains with array.includes like ES7

## 0.6 (2015-02-22)

Features:

 - Use ES6, remove any function already in ES6 (@mikemaccana)
 - Remove requirejs support, just use CommonJS (@mikemaccana)
 - Remove DOM functions, these will soon appear in a separate library

## 0.4.4 (2014-05-29)

Features:

 - Function.repeat() & tests (@mikemaccana)
 - Enhance getPath() docs (@mikemaccana)

## 0.4.2 (2014-04-16)

Features:

 - Add element.getParentIndex(), object.compare() & tests (@mikemaccana)
 - Add number maths methods (@rich-harris)
 - Only allow agave to be enabled once per prefix (@rich-harris)
 - jshint now passes on tests (@mikemaccana)
 - Fix bug where getPath would run hasOwnProperty() on null
 - Remove unnecessary grunt dependency from master branch (only needed for gh-pages)

## 0.4.0 (2013-10-22)

Features:

  - Adds a prefixed global 'kind', which provides intuitive primitive/instance type checking (@mikemaccana, @notsorella)‎
  - Iteration function in object.forEach() now given value as second argument (@alexgraul)‎
  - Allow new properties to be overwritable if users want (@rich-harris)
  - 'grunt watch' support in gh-pages, for rebuilding css whenever less changes

Bugfixes:

  - Doc typos (#1, @nubs) (#2, @evanhahn)

## 0.2.0 (2013-06-14)

 - Initial release
