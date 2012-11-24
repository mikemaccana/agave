// I'm a UMD module (works in RequireJS and CommonJS-like environments)
// See https://github.com/umdjs
(function (root, factory) {
  if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, function () {

  // Agave.JS

  // object.getKeys() returns an array of keys
  var getKeys = function(){
    return Object.keys(this);
  };

  // object.getSize() returns the number of properties in the object
  var getSize = function() {
    return Object.keys(this).length;
  };

  // string.reverse()
  var reverse = function() {
    return this.split("").reverse().join("");
  };

  // string.leftStrip(stripChars) returns the string with the leading chars removed
  var leftStrip = function(stripChars) {
    var result = this;
    while ( true ) {
      if ( ! stripChars.contains(result.charAt(0)) ) {
        return result;
      } else {
        result = result.slice(1);
      }
    }
  };

  // string.rightStrip(stripChars) returns the string with the trailing chars removed
  var rightStrip = function(stripChars) {
    return this.reverse().leftStrip(stripChars).reverse();
  };

  // string.strip(stripChars) returns the string with the leading and trailing chars removed
  var strip = function(stripChars) {
    return this.leftStrip(stripChars).rightStrip(stripChars);
  };
 
  // object.getPath - get the value of the nested keys provided in the object. 
  // If any are missing, return undefined. Used for checking JSON results.  
  var getPath = function(pathItems) {
    var obj = this;
    var delim = '/';
    var result;
    var still_checking = true;
    // Handle Unix style paths
    if ( typeof(pathItems) === 'string' ) {
      pathItems = pathItems.strip(delim).split(delim);
    }
    pathItems.forEach( function(pathItem) {
      if ( still_checking ) {
        if ( ! obj.hasOwnProperty(pathItem) ) {
          result = undefined;
          still_checking = false;
        } else {
          result = obj[pathItem];
        }
        obj = obj[pathItem];
      }      
    });
    return result;
  };
  
  // array.findItem(test_function) returns the first item that matches the test_function
  var findItem = function(test_function){
    var arr = this;
    var last_index;
    var found = arr.some(function(item, index) {
      last_index = index;
      return test_function(item);
    });
    if ( found ) {
      return arr[last_index];
    } else {
      return null;
    }
  };
  
  // string.endsWith(suffix) returns true if string ends with the suffix
  var endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
  
  // string.endsWith(prefix) returns true if string ends with the prefix
  var startsWith = function(prefix){
    return this.slice(0, prefix.length) === prefix;
  };
  
  // array.contains(item) returns true if an array contains an item
  // string.contains(substring) returns true if a string contains a substring
  var contains = function(item){
    return ( this.indexOf(item) !== -1);
  }; 
  
  // Extend an array with another array. 
  // Cleverness alert: since .apply() accepts an array of args, we use the new_array as all the args to push()
  var extend = function(new_array) {
    Array.prototype.push.apply(this, new_array);
    return this;
  };
  
  // string.repeat() repeat a string 'times' times. Borrowed from ES6 shim at https://github.com/paulmillr/es6-shim
  var repeat = function(times) {
    if (times < 1) return '';
    if (times % 2) return this.repeat(times - 1) + this;
    var half = this.repeat(times / 2);
    return half + half;
  };

  // Clone an object recursively
  var clone = function() {
    var newObj = (this instanceof Array) ? [] : {};
    for (var key in this) {
      if (this[key] && typeof this[key] == "object") {
        newObj[key] = this[key].clone();
      } else {
        newObj[key] = this[key];
      }
    }
    return newObj;
  };

  var arrayClone = function(){return this.slice();};

  // Add a new element as a child of this element
  var createChild = function(name, attributes, text) {
    var newElement = document.createElement(name);
    if ( attributes ) {
      for (var attribute in attributes) {
        newElement.setAttribute(attribute, attributes[attribute]);
      }  
    }
    if ( text ) {
      newElement.textContent = text;
    }
    return this.appendChild(newElement);
  };

  // Apply the CSS styles
  var applyStyles = function(styles) {
    for ( var style in styles ) {
      this.style[style] = styles[style];
    }
    return this;
  };

  // Return array of an elements parent elements from closest to farthest
  var getParents = function(selector) {
    var parents = [];
    var parent = this.parentNode;
    // While parents are 'element' type nodes
    // See https://developer.mozilla.org/en-US/docs/DOM/Node.nodeType
    while ( parent && parent.nodeType && parent.nodeType === 1 ) {
      if ( selector ) {
        if ( parent.matches(selector) ) {
          parents.push(parent);
        } 
      } else {
        parents.push(parent);        
      } 
      parent = parent.parentNode;
    }
    return parents;
  };

  // Polyfill if Element.prototype.matches doesn't exist.
  var prefixedMatchesMethod = ( !this.Element || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector);

  // Add method as a non-enumerable property on obj with the name methodName
  var addMethod = function( obj, methodName, method) {
    // Check - NodeLists and Elements don't always exist on all JS implementations
    if ( obj ) {
      // Don't add if the method already exists
      if ( ! obj.method ) {
        Object.defineProperty( obj.prototype, methodName, {value: method, enumerable: false});
      }  
    }  
  };

  // Extend objects with Agave methods, using 
  var enable = function(prefix){
    var global = this;
    var newMethods = {
      'Array':{
        'findItem':findItem,
        'extend':extend,
        'contains':contains,
        'clone':arrayClone
      },
      'Object':{
        'getKeys':getKeys,
        'findItem':findItem,
        'getSize':getSize,
        'getPath':getPath,
        'contains':contains
      },
      'String':{
        'endsWith':endsWith,
        'startsWith':startsWith,
        'repeat':repeat,
        'reverse':reverse,
        'leftStrip':leftStrip,
        'rightStrip':rightStrip,
        'strip':strip,
        'contains':contains,
        'forEach':Array.prototype.forEach // Strings and NodeLists don't have .forEach() standard but the one from Array works fine
      },
      'Element':{
        'createChild':createChild,
        'getParents':getParents,
        'matches':prefixedMatchesMethod,
        'applyStyles':applyStyles
      },
      'NodeList':{
        'forEach':Array.prototype.forEach,
        'reverse':Array.prototype.reverse
      }
    };
    for ( var obj in newMethods ) {
      for ( var method in newMethods[obj] ) {
        if ( prefix ) { 
          methodName = prefix+method;
        } else {
          methodName = method;
        }
        addMethod(global[obj], methodName, newMethods[obj][method]);      
      } 
    }
  }.bind();

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {
    enable:enable
  };
}));