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
    })
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
  
  // array.hasItem() returns true if an array has an item
  // string.hasSubstring() returns true if a string contains a substring
  var contains = function(item){
    return ( this.indexOf(item) !== -1);
  }; 
  
  // Strings don't have .forEach() standard but the one from Array works fine
  String.prototype.forEach = Array.prototype.forEach
  
  // The existing array.forEach() works fine for NodeLists too (if our JS environment has NodeLists)
  if ( this.hasOwnProperty('NodeList') ) {
    Object.defineProperty( this['NodeList'].prototype, "forEach", {value: Array.prototype.forEach, enumerable: false});            
  }
  
  Object.defineProperty( Array.prototype, "findItem", {value: findItem, enumerable: false});
  Object.defineProperty( Object.prototype, "getKeys", {value: getKeys, enumerable: false});
  Object.defineProperty( Object.prototype, "getSize", {value: getSize, enumerable: false});
  Object.defineProperty( Object.prototype, "getPath", {value: getPath, enumerable: false});
  Object.defineProperty( Array.prototype, "hasItem", {value: contains, enumerable: false});
  Object.defineProperty( String.prototype, "hasSubstring", {value: contains, enumerable: false});
});