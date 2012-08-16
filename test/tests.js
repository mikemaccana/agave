// Tests. Mocha/assert style. See 
// http://visionmedia.github.com/mocha/ 
// http://nodejs.org/docs/latest/api/assert.html

// RequireJS setup
var requirejs = require('requirejs');
requirejs.config({ nodeRequire: require, baseUrl: "lib" });
requirejs(['assert', './agave.js'], function (assert) {  
  
  describe('Array.hasItem', function(){
    it('fetches the item accurately', function(){
      assert.ok(['one','two','three'].hasItem('two') )
    })
    it('handles missing items accurately', function(){
      assert.ok( ! ['one','two','three'].hasItem('notthere') )
    })  
  })  
  
  describe('String.hasSubstring', function(){
    it('fetches the substring accurately', function(){
      assert.ok('elephantine'.hasSubstring('tin') )
    })  
    it('handles missing substrings accurately', function(){
      assert.ok( ! 'elephantine'.hasSubstring('zam') )
    })  
  })  
  
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
  
  describe('Object.getKeys', function(){
    it('fetches keys accurately', function(){
      assert.deepEqual(mockObject.getKeys(), ["foo","baz","null"] )
    })  
  })
  
  describe('Object.getSize', function(){
    it('counts keys accurately', function(){
      assert.equal(mockObject.getSize(), 3)
    })   
  })
  
  describe('Array.findItem', function(){
    it('correctly finds items that match the function', function(){
      assert.equal(['one','two','three'].findItem(function(item){
        return (item === 'three')
      }), 'three')
    })   
  })
  
  describe('Object.getPath', function(){
    it('returns undefined when a value is missing', function(){
      var result = mockObject.getPath(['foo','pineapple']);
      assert.equal(result, undefined);       
    })    
    it('returns the value when the provided keys exist', function(){
      var result = mockObject.getPath(['baz','zar','zog']);
      assert.equal(result, 'victory')
    })
    it('returns the value when the provided keys exist, even if null is on the path', function(){
      var result = mockObject.getPath([null,'yarr','parrot']);
      assert.equal(result, 'ahoy')
    })
  })

})