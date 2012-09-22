// Tests. Mocha/assert style. See 
// http://visionmedia.github.com/mocha/ 
// http://nodejs.org/docs/latest/api/assert.html

// RequireJS setup
var requirejs = require('requirejs');
requirejs.config({ nodeRequire: require, baseUrl: "lib" });
requirejs(['assert', './agave.js'], function (assert) {  
  
  describe('Array.contains', function(){
    it('fetches the item accurately', function(){
      assert(['one','two','three'].contains('two') )
    })
    it('handles missing items accurately', function(){
      assert( ! ['one','two','three'].contains('notthere') )
    })  
  })
  
  describe('Array.extend', function(){
    it('extends the array accurately', function(){
      assert.deepEqual([1,2,3].extend([4,5]), [1,2,3,4,5] )
    })
  })
  
  describe('String.contains', function(){
    it('checks for the substring accurately', function(){
      assert('elephantine'.contains('tin') )
    })  
    it('handles missing substrings accurately', function(){
      assert( ! 'elephantine'.contains('zam') )
    })  
  })
  
  describe('String.endsWith', function(){
    it('works if the string actually ends with the suffix', function(){
      assert('Hello world'.endsWith('world'))
    })
    it('handles trying to check if something ends in something larger than itself', function(){
      assert.equal('world'.endsWith('Hello world'), false)
    })
  })  
  
  describe('String.startsWith', function(){
    it('works if the string actually starts with the prefix', function(){
      assert('Hello world'.startsWith('Hello'))
    })
  })
  
  describe('String.repeat', function(){
    it('repeats strings accurately', function(){
      assert.equal('Hello world'.repeat(3), 'Hello worldHello worldHello world')
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
  
  describe('Agave really doesn\'t affect for loops', function(){
    it ('doesn\'t. really', function(){
      for ( var key in mockObject ) {
        assert( ! ['getKeys','getSize','getPath'].contains(key) ) 
      }
    })
  })

})