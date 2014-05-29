// Tests. Mocha/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html

/*jshint multistr:true */
/*jshint -W010 */
/*jshint -W053 */
/*jshint -W054 */
// 10 allows us to test Object
// 53 allows us to test Number, String etc constructors.
// 54 allows us to test Function constructors.

var assert = require('assert');
var jsdom = require('jsdom');
var agave = require('../index.js');

var mockObject = {
  foo: 'bar',
  baz: {
    bam:'boo',
    zar:{
      zog:'victory'
    }
  },
  null:{
    'yarr':{
      'parrot':'ahoy'
    }
  }
};

// Set up a global.document with a DOM in the same way a browser has
var setupDOM = function(documentText) {
  var document = jsdom.jsdom(documentText, null, {
    features: {
      QuerySelector: true
    }
  });
  var window = document.createWindow();
  ['Element','NodeList','document'].forEach(function(obj){
    global[obj] = window[obj];
  });
};

var mockHTML = ' \
<html> \
  <body> \
    <article> \
      <heading>Sample document</heading> \
      <author></author> \
      <p>Carles portland banh mi lomo twee.</p> \
      <p>Narwhal bicycle rights keffiyeh beard.</p> \
      <p>Pork belly beard pop-up kale chips.</p> \
    </article> \
  </body> \
</html>';

setupDOM(mockHTML);

agave.enable('av');

describe('Array.contains', function(){
  it('fetches the item accurately', function(){
    assert(['one','two','three'].avcontains('two') );
  });
  it('handles missing items accurately', function(){
    assert( ! ['one','two','three'].avcontains('notthere') );
  });
});

describe('Array.extend', function(){
  it('extends the array accurately', function(){
    assert.deepEqual([1,2,3].avextend([4,5]), [1,2,3,4,5] );
  });
});

describe('String.contains', function(){
  it('checks for the substring accurately', function(){
    assert('elephantine'.avcontains('tin') );
  });
  it('handles missing substrings accurately', function(){
    assert( ! 'elephantine'.avcontains('zam') );
  });
});

describe('String.endsWith', function(){
  it('works if the string actually ends with the suffix', function(){
    assert('Hello world'.avendsWith('world'));
  });
  it('handles trying to check if something ends in something larger than itself', function(){
    assert.equal('world'.avendsWith('Hello world'), false);
  });
});

describe('String.startsWith', function(){
  it('works if the string actually starts with the prefix', function(){
    assert('Hello world'.avstartsWith('Hello'));
  });
});

describe('String.repeat', function(){
  it('repeats strings accurately', function(){
    assert.equal('Hello world'.avrepeat(3), 'Hello worldHello worldHello world');
  });
});

describe('String.reverse', function(){
  it('reverses strings accurately', function(){
    assert.equal('Hello world'.avreverse(), 'dlrow olleH');
  });
});

describe('String.leftStrip', function(){
  it('strips from the left accurately', function(){
    assert.equal('Hello world'.avleftStrip('Hle'), 'o world');
  });
});

describe('String.rightStrip', function(){
  it('strips from the right accurately', function(){
    assert.equal('Hello world'.avrightStrip('ldr'), 'Hello wo');
  });
});

describe('String.rightStrip', function(){
  it('strips from the left accurately with a single character', function(){
    assert.equal('a'.avleftStrip('a'), '');
  });
});

describe('String.strip', function(){
  it('strips from the both sides accurately', function(){
    assert.equal('Hello world'.avstrip('Hld'), 'ello wor');
  });
});

describe('Object.getKeys', function(){
  it('fetches keys accurately', function(){
    assert.deepEqual(mockObject.avgetKeys(), ["foo","baz","null"] );
  });
});

describe('Object.getSize', function(){
  it('counts keys accurately', function(){
    assert.equal(mockObject.avgetSize(), 3);
  });
});

describe('Array.findItem', function(){
  it('correctly finds items that match the function', function(){
    assert.equal(['one','two','three'].avfindItem(function(item){
      return (item === 'three');
    }), 'three');
  });
});

describe('Array.remove', function () {
  it('correctly removes the given member', function (){
    var arr = [1,2,3,4,5];
    arr.avremove(3);
    assert.deepEqual(arr, [1,2,4,5]);
  });
  if('returns true if the given member was in the array', function () {
    assert.equal([1,2,3,4,5].remove(3), true);
  });
  if('returns false if the given member was not in the array', function () {
    assert.equal([1,2,3,4,5].remove(6), false);
  });
});

describe('Object.getPath', function(){
  it('returns undefined when a value is missing', function(){
    assert.equal(mockObject.avgetPath(['foo','pineapple']), undefined);
  });
  it('returns the value when the provided keys exist', function(){
    assert.equal(mockObject.avgetPath(['baz','zar','zog']), 'victory');
  });
  it('returns the value when the provided keys exist, even if null is on the path', function(){
    assert.equal(mockObject.avgetPath([null,'yarr','parrot']), 'ahoy');
  });
  it('works using Unix-style paths', function(){
    assert.equal(mockObject.avgetPath('/baz/zar/zog'), 'victory');
  });
});

describe('Object.clone', function(){
  var copyObject = mockObject.avclone();
  it('clones objects so that modification to the new object will not affect the original', function(){
    copyObject.baz.bam = 'newvalue';
    assert.equal(copyObject.avgetPath(['baz','bam']), 'newvalue');
    assert.equal(mockObject.avgetPath(['baz','bam']), 'boo');
  });
});

describe('Object.forEach', function(){
  var keyResults = [];
  var valueResults = [];
  mockObject.avforEach(function(key, value){
    keyResults.push(key);
    valueResults.push(value);
  });
  it('iterates over keys properly', function(){
    assert.deepEqual(keyResults, ["foo","baz","null"]);
  });
  it('iterates over values properly', function(){
    assert.deepEqual(valueResults, [
      "bar",
      {"bam":"boo",
        "zar":{
          "zog":"victory"
        }
      },
      {"yarr":
        {"parrot":"ahoy"}
      }
    ]);
  });
});

describe('Object.extend', function(){
  var results = mockObject.avclone().avextend({
    'gnar':{
      shub:'zoo'
    },
    'gert':{
      yaz:'frub'
    }
  });

  it('creates extends the object with the new properties', function(){
    assert.deepEqual(results, {
      "foo":"bar",
      "baz":{
        "bam":"boo",
        "zar":{
          "zog":"victory"}
        },
        "null":{
          "yarr":{
            "parrot":"ahoy"
          }
        },
      "gnar":{
        "shub":"zoo"
      },
      "gert":{
        "yaz":"frub"
      }
    });
  });
});

describe('Object.compare', function(){
  it('accurately identifies similar objects', function(){
    var heading = document.querySelector('heading');
    var identicalObject = {
      foo: 'bar',
      baz: {
        bam:'boo',
        zar:{
          zog:'victory'
        }
      },
      null:{
        'yarr':{
          'parrot':'ahoy'
        }
      }
    };
    assert(mockObject.avcompare(identicalObject));
  });
  it('accurately identifies different objects', function(){
    var heading = document.querySelector('heading');
    var differentObject = {
      foo: 'bar',
      baz: {
        bam:'boo',
        zar:{
          zog:'victory'
        }
      }
    };
    assert.equal(mockObject.avcompare(differentObject), false);
  });
});

describe('Function.throttle', function(){
  var valueShouldOnlyBeOne = 0; // Since the function should only run once
  var timesFunctionHasRan = 0;
  var maxTimesToRun = 3;
  it('stops function calls overlapping', function(done){
    var intervalID = setInterval(function(){
      // thottledFunction would normally run three times in this loop, 50ms apart, but .avthrottle() means it
      // will only be run once after 70ms of inactivity
      var thottledFunction = function(){
        valueShouldOnlyBeOne++;
      }.avthrottle(70);
      thottledFunction();
      timesFunctionHasRan++;
      if ( timesFunctionHasRan === maxTimesToRun ) {
        clearInterval(intervalID);
        assert.equal(valueShouldOnlyBeOne, 1);
        done();
      }
    }, 50);
  });
});

describe('Function.repeat', function(){
  var count = 0
  it('repeats', function(done){
    var increment = function(){
      count += 1
      if ( count === 3 ) {
        done();
      }
    }
    increment.repeat([], 50, true)
  });
});

describe('Number.days', function(){
  it('correctly converts a number to days in seconds', function(){
    assert.equal((5).avdays(), 432000000);
  });
});

describe('Number.weeks.before and .after', function(){
  it('correctly converts a number to a period in weeks before a set date', function(){
    var someDate = new Date('Thu Jun 06 2013 22:44:05 GMT+0100 (UTC)');
    var timezoneOffset = someDate.getTimezoneOffset();
    assert.equal((3).avweeks().avbefore(someDate).toLocaleDateString("en-GB", {timeZone:'UTC'}), 'Thursday, May 16, 2013');
  });
  it('correctly converts a number to a period in weeks after a set date', function(){
    var someDate = new Date('Thu Jun 06 2013 22:44:05 GMT+0100 (UTC)');
    var timezoneOffset = someDate.getTimezoneOffset();
    assert.equal((3).avweeks().avafter(someDate).toLocaleDateString("en-GB", {timeZone:'UTC'}), 'Thursday, June 27, 2013');
  });
});

describe('Number.round', function () {
  var num = 4.2;
  it('correctly rounds a number', function () {
    assert.equal(num.avround(),4);
  });
});

describe('Number.ceil', function () {
  var num = 4.2;
  it('correctly finds a number\'s ceiling', function () {
    assert.equal(num.avceil(),5);
  });
});

describe('Number.floor', function () {
  var num = 4.2;
  it('correctly finds a number\'s floor', function () {
    assert.equal(num.avfloor(),4);
  });
});

describe('Number.abs', function () {
  var num = -4.2;
  it('correctly finds the absolute value of a number', function () {
    assert.equal(num.avabs(),4.2);
  });
});

describe('Number.pow', function () {
  var num = 5;
  it('correctly raises a number to the given power', function () {
    assert.equal(num.avpow(3), 125);
  });
});

describe('Agave really doesn\'t affect for loops', function(){
  it ('doesn\'t. really', function(){
    for ( var key in mockObject ) {
      assert( ! ['avgetKeys','avgetSize','avgetPath'].avcontains(key) );
    }
  });
});

describe('Element.createChild', function(){
  var sillyText = 'ethical messenger bag';
  var article = document.querySelector('article');
  article.avcreateChild('p',{'id':'testpara'},sillyText);
  it('creates children with the specified attributes', function(){
    var paraCount = document.querySelector('#testpara');
    assert(paraCount);
  });
  it('creates children with the specified text', function(){
    assert(document.querySelector('#testpara').textContent === sillyText );
  });
});

describe('Element.getParentIndex', function(){
  var article = document.createElement('article');
  ['first', 'second', 'third'].forEach(function(item){
    var p = document.createElement("p");
    article.appendChild(p);
  })
  it('creates children with the specified attributes', function(){
    var thirdChild = article.querySelectorAll('p')[2];
    assert(thirdChild.avgetParentIndex() === 2);
  });
});

describe('Element.applyStyles', function(){
  it('styles elements', function(){
    var heading = document.querySelector('heading');
    heading.avapplyStyles({'font-size':'18em'});
    assert.equal(heading.style['font-size'], '18em');
  });
});

describe('kind', function(){
  it('shows number-like things as numbers', function(){
    assert(avkind(37) === 'Number');
    assert(avkind(3.14) === 'Number');
    assert(avkind(Math.LN2) === 'Number');
    assert(avkind(Infinity) === 'Number');
    assert(avkind(Number(1)) === 'Number');
    assert(avkind(new Number(1)) === 'Number');
  });
  it('shows NaN as NaN', function(){
    assert(avkind(NaN) === 'NaN');
  });
  it('Shows strings as strings', function(){
    assert(avkind('') === 'String');
    assert(avkind('bla') === 'String');
    assert(avkind(String("abc")) === 'String');
    assert(avkind(new String("abc")) === 'String');
  });
  it('shows strings accurately', function(){
    assert(avkind(true) === 'Boolean');
    assert(avkind(false) === 'Boolean');
    assert(avkind(new Boolean(true)) === 'Boolean');
  });
  it('shows arrays accurately', function(){
    assert(avkind([1, 2, 4]) === 'Array');
    assert(avkind(new Array(1, 2, 3)) === 'Array');
  });
  it('shows objects accurately', function(){
    assert(avkind({a:1}) === 'Object');
    assert(avkind(new Object()) === 'Object');
  });
  it('shows dates accurately', function(){
    assert(avkind(new Date()) === 'Date');
  });
  it('loves Functions too', function(){
    assert(avkind(function(){}) === 'Function');
    assert(avkind(new Function("console.log(arguments)")) === 'Function');
    assert(avkind(Math.sin) === 'Function');
  });
  it('shows undefined accurately', function(){
    assert(avkind(undefined) === 'undefined');
  });
  it('shows null accurately', function(){
    assert(avkind(null) === 'null');
  });
});

describe('Functions work with no prefix at all', function(){
  agave.enable();
  it('strips from the right accurately', function(){
    assert.equal('Hello world'.rightStrip('ldr'), 'Hello wo');
  });
});
