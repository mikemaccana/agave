// Agave.JS

define(function () {
  // object.getKeys() returns an array of keys
  var getKeys = function(){
    return Object.keys(this);
  };

  // object.getSize() returns the number of properties in the object
  var getSize = function() {
    return Object.keys(this).length;
  };
  
  // object.getPath - get the value of the nested keys provided in the object. 
  // If any are missing, return undefined. Used for checking JSON results.  
  var getPath = function(pathItems) {
    var obj = this;
    var result;
    var still_checking = true;
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
  
  Object.defineProperty( Array.prototype, "findItem", {value: findItem, enumerable: false});
  Object.defineProperty( Array.prototype, "extend", {value: extend, enumerable: false});
  Object.defineProperty( Object.prototype, "getKeys", {value: getKeys, enumerable: false});
  Object.defineProperty( Object.prototype, "getSize", {value: getSize, enumerable: false});
  Object.defineProperty( Object.prototype, "getPath", {value: getPath, enumerable: false});
  Object.defineProperty( Array.prototype, "contains", {value: contains, enumerable: false});
  Object.defineProperty( String.prototype, "contains", {value: contains, enumerable: false});
  Object.defineProperty( String.prototype, "endsWith", {value: endsWith, enumerable: false});
  Object.defineProperty( String.prototype, "startsWith", {value: startsWith, enumerable: false});
  Object.defineProperty( String.prototype, "repeat", {value: repeat, enumerable: false});
  
  // Strings don't have .forEach() standard but the one from Array works fine
  String.prototype.forEach = Array.prototype.forEach;
  
  // The existing array.forEach() works fine for NodeLists too (if our JS environment has NodeLists)
  if ( this.hasOwnProperty('NodeList') ) {
    Object.defineProperty( this.NodeList.prototype, "forEach", {value: Array.prototype.forEach, enumerable: false});            
  }
});