/*jshint multistr:true */
// Tests. Mocha/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html

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
  window = document.createWindow();
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
</html> \
';

setupDOM(mockHTML);

agave.enable('agv');

describe('Array.contains', function(){
  it('fetches the item accurately', function(){
    assert(['one','two','three'].agvcontains('two') );
  });
  it('handles missing items accurately', function(){
    assert( ! ['one','two','three'].agvcontains('notthere') );
  });
});

describe('Array.extend', function(){
  it('extends the array accurately', function(){
    assert.deepEqual([1,2,3].agvextend([4,5]), [1,2,3,4,5] );
  });
});

describe('String.contains', function(){
  it('checks for the substring accurately', function(){
    assert('elephantine'.agvcontains('tin') );
  });
  it('handles missing substrings accurately', function(){
    assert( ! 'elephantine'.agvcontains('zam') );
  });
});

describe('String.endsWith', function(){
  it('works if the string actually ends with the suffix', function(){
    assert('Hello world'.agvendsWith('world'));
  });
  it('handles trying to check if something ends in something larger than itself', function(){
    assert.equal('world'.agvendsWith('Hello world'), false);
  });
});

describe('String.startsWith', function(){
  it('works if the string actually starts with the prefix', function(){
    assert('Hello world'.agvstartsWith('Hello'));
  });
});

describe('String.repeat', function(){
  it('repeats strings accurately', function(){
    assert.equal('Hello world'.agvrepeat(3), 'Hello worldHello worldHello world');
  });
});

describe('String.reverse', function(){
  it('reverses strings accurately', function(){
    assert.equal('Hello world'.agvreverse(), 'dlrow olleH');
  });
});

describe('String.leftStrip', function(){
  it('strips from the left accurately', function(){
    assert.equal('Hello world'.agvleftStrip('Hle'), 'o world');
  });
});

describe('String.rightStrip', function(){
  it('strips from the right accurately', function(){
    assert.equal('Hello world'.agvrightStrip('ldr'), 'Hello wo');
  });
});

describe('String.rightStrip', function(){
  it('strips from the left accurately with a single character', function(){
    assert.equal('a'.agvleftStrip('a'), '');
  });
});

describe('String.strip', function(){
  it('strips from the both sides accurately', function(){
    assert.equal('Hello world'.agvstrip('Hld'), 'ello wor');
  });
});

describe('Object.getKeys', function(){
  it('fetches keys accurately', function(){
    assert.deepEqual(mockObject.agvgetKeys(), ["foo","baz","null"] );
  });
});

describe('Object.getSize', function(){
  it('counts keys accurately', function(){
    assert.equal(mockObject.agvgetSize(), 3);
  });
});

describe('Array.findItem', function(){
  it('correctly finds items that match the function', function(){
    assert.equal(['one','two','three'].agvfindItem(function(item){
      return (item === 'three');
    }), 'three');
  });
});

describe('Object.getPath', function(){
  it('returns undefined when a value is missing', function(){
    assert.equal(mockObject.agvgetPath(['foo','pineapple']), undefined);
  });
  it('returns the value when the provided keys exist', function(){
    assert.equal(mockObject.agvgetPath(['baz','zar','zog']), 'victory');
  });
  it('returns the value when the provided keys exist, even if null is on the path', function(){
    assert.equal(mockObject.agvgetPath([null,'yarr','parrot']), 'ahoy');
  });
  it('works using Unix-style paths', function(){
    assert.equal(mockObject.agvgetPath('/baz/zar/zog'), 'victory');
  });
});

describe('Agave really doesn\'t affect for loops', function(){
  it ('doesn\'t. really', function(){
    for ( var key in mockObject ) {
      assert( ! ['getKeys','getSize','getPath'].agvcontains(key) );
    }
  });
});

describe('Prefixing', function(){
  agave.enable('av');
  it('allows methods to be found under the prefix', function(){
    assert('hamparty'.avcontains('art') );
  });
});

describe('NodeList.forEach', function(){
  it('iterates over nodes properly', function(){
    var results = [];
    var paras = document.querySelectorAll('p');

    paras.avforEach(function(para){
      results.push(para.textContent)
    })
    var correctResults = [
      'Carles portland banh mi lomo twee.',
      'Narwhal bicycle rights keffiyeh beard.',
      'Pork belly beard pop-up kale chips.'
    ]
    // Just check the first 3 results as other tests may add paragraphs
    assert.deepEqual(results.slice(0,3),correctResults);
  });
});

describe('Element.createChild', function(){
  var sillyText = 'ethical messenger bag';
  var article = document.querySelector('article');
  article.agvcreateChild('p',{'id':'testpara'},sillyText);
  it('creates children with the specified attributes', function(){
    var paraCount = document.querySelector('#testpara');
    assert(paraCount);
  });
  it('creates children with the specified text', function(){
    assert(document.querySelector('#testpara').textContent === sillyText );
  });
});

describe('Element.getParents', function(){
  it('returns all parent nodes', function(){
    var ancestors = document.querySelector('heading').avgetParents();
    var results = [];
    ancestors.avforEach(function(ancestor){
      results.push(ancestor.tagName)
    })
    var correctResults = ["ARTICLE","BODY","HTML"];
    assert.deepEqual(results, correctResults);
  });
});

describe('Element.applyStyles', function(){
  it('styles elements', function(){
    var heading = document.querySelector('heading');
    heading.agvapplyStyles({'font-size':'18em'})
    assert.equal(heading.style['font-size'], '18em');
  });
});