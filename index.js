var enabledPrefixes = {}; // Only allow agave to be enabled once per prefix

// Extend objects with Agave methods, using the prefix provided.
var enable = function(prefix){
  "use strict";

  prefix = prefix || '';

  if ( enabledPrefixes[prefix] ) {
    return;
  }

  const MILLISECONDS_IN_SECOND = 1000,
    SECONDS_IN_MINUTE = 60,
    MINUTES_IN_HOUR = 60,
    HOURS_IN_DAY = 24,
    DAYS_IN_WEEK = 7,
    DAYS_IN_MONTH = 30,
    DAYS_IN_YEAR = 365;

  const SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6;

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
      // Note result could be zero characters
      if ( ! stripChars.includes(result.charAt(0)) || ! result) {
        return result;
      } else {
        result = result.slice(1);
      }
    }
  };

  // string.rightStrip(stripChars) returns the string with the trailing chars removed
  var rightStrip = function(stripChars) {
    return this[prefix+'reverse']()[prefix+'leftStrip'](stripChars)[prefix+'reverse']();
  };

  // string.strip(stripChars) returns the string with the leading and trailing chars removed
  var strip = function(stripChars) {
    return this[prefix+'leftStrip'](stripChars)[prefix+'rightStrip'](stripChars);
  };

  // object.getPath - get the value of the nested keys provided in the object.
  // If any are missing, return undefined. Used for checking JSON results.
  var getPath = function(pathItems) {
    var currentObject = this;
    var delim = '/';
    var result;
    var stillChecking = true;
    // Handle Unix style paths
    if ( typeof(pathItems) === 'string' ) {
      pathItems = pathItems[prefix+'strip'](delim).split(delim);
    }
    pathItems.forEach( function(pathItem) {
      if ( stillChecking ) {
        if ( ( currentObject === null ) || ( ! currentObject.hasOwnProperty(pathItem) ) ) {
          result = undefined;
          stillChecking = false;
        } else {
          result = currentObject[pathItem];
          currentObject = currentObject[pathItem];
        }
      }
    });
    return result;
  };

  // object.extent(object) adds the keys/values from the newObject provided
  var objectExtend = function(newObject) {
    for ( var key in newObject ) {
      this[key] = newObject[key];
    }
    return this;
  };

  // array.findItem(testFunction) returns the first item that matches the testFunction
  var findItem = function(testFunction){
    var lastIndex;
    var found = this.some(function(item, index) {
      lastIndex = index;
      return testFunction(item);
    });
    if ( found ) {
      return this[lastIndex];
    } else {
      return null;
    }
  };

  // Run after it hasn't been invoked for 'wait' ms.
  // Useful to stop repeated calls to a function overlapping each other (sometimes called 'bouncing')
  var throttle = function(wait, immediate) {
    var timeoutID;
    var originalFunction = this;
    return function() {
      var context = this;
      var delayedFunction = function() {
        timeoutID = null;
        if ( ! immediate ) {
          originalFunction.apply(context, arguments);
        }
      };
      var callNow = immediate && ! timeoutID;
      clearTimeout(timeoutID);
      timeoutID = setTimeout(delayedFunction, wait);
      if (callNow) {
        originalFunction.apply(context, arguments);
      }
    };
  };

  // Run repeatedly
  var functionRepeat = function(first, second, third){
    var args, interval, leadingEdge;
    if ( arguments.length === 2 ) {
      args = [];
      interval = first;
      leadingEdge = second;
    } else {
      args = first;
      interval = second;
      leadingEdge = third;
    }
    if ( leadingEdge ) {
      this.apply(null, args);
    }
    return setInterval(function(){
      this.apply(null, args);
    }.bind(this), interval);
  };

  // Extend an array with another array.
  // Cleverness alert: since .apply() accepts an array of args, we use the newArray as all the args to push()
  var arrayExtend = function(newArray) {
    Array.prototype.push.apply(this, newArray);
    return this;
  };

  // string.toHash() return a hashed value of a string
  // From http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
  var toHash = function(){
    var hash = 0,
      length = this.length,
      char;
    if ( ! length ) {
      return hash;
    }
    for (var index = 0; index < length; index++) {
      char = this.charCodeAt(index);
      hash = ((hash<<5)-hash)+char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  // Clone an object recursively
  var clone = function() {
    var newObj = (this instanceof Array) ? [] : {};
    for (var key in this) {
      if (this[key] && typeof this[key] == "object") {
        newObj[key] = this[key][prefix+'clone']();
      } else {
        newObj[key] = this[key];
      }
    }
    return newObj;
  };

  // compare an object with another object
  var compare = function(otherObject){
    var hashObject = function(object){
      return JSON.stringify(object)[prefix+'toHash']();
    };
    return ( hashObject(this) === hashObject(otherObject) );
  };

  // Iterate over an objects keys
  // Unlike a regular for ( var key in object )
  // an additional scope is created, which avoids last-item looping probs
  var objectForEach = function(callback){
    for ( var key in this ) {
      callback(key, this[key]);
    }
  };

  var arrayClone = function(){
    return this.slice();
  };

  // Array remove removes an item from an array, if it exists
  var arrayRemove = function(member){
    var index = this.indexOf(member);
    if (index !== -1 ) {
      this.splice(index, 1);
      return true;
    }
    return false;
  };

  var arrayFirst= function(count){
    if ( ! count ) {
      return this[0];
    } else {
      return this.slice(Math.max(arr.length - count, 1));
    }
  };

  var arrayLast = function(count){
    if ( ! count ) {
      return this[this.length - 1];
    } else {
      return this.slice(Math.max(this.length - count, 1));
    }
  };

  // Helper function for before() and after()
  var getTimeOrNow = function(date) {
    return (date || new Date()).getTime();
  };

  // Return Number of seconds to time delta from date (or now if not specified)
  var before = function(date) {
    var time = getTimeOrNow(date);
    return new Date(time-(+this));
  };

  // Return Number of seconds to time delta after date (or now if not specified)
  var after = function(date) {
    var time = getTimeOrNow(date);
    return new Date(time+(+this));
  };

  var toSeconds = function() {
    return this * MILLISECONDS_IN_SECOND;
  }

  var toMinutes = function() {
    return this.seconds * SECONDS_IN_MINUTE;
  }

  var toHours = function() {
    return this.minutes * MINUTES_IN_HOUR;
  }

  var toDays = function() {
    return this.hours * HOURS_IN_DAY;
  }

  var toWeeks = function() {
    return this.days * DAYS_IN_WEEK;
  }

  var toMonths = function() {
    return this.days * DAYS_IN_MONTH;
  }

  var toYears = function() {
    return this.days * DAYS_IN_YEAR;
  }

  var isOnWeekend = function(){
    return this.getDay() === SUNDAY || this.getDay() === SATURDAY
  }

  var withoutTime = function(){
    var copy = new Date(this)
    copy.setHours(0, 0, 0, 0, 0)
    return copy;
  }

  var dateClone = function(){
    return new Date(this.getTime())
  }

  var kind = function(item) {
    var getPrototype = function(item) {
      return Object.prototype.toString.call(item).slice(8, -1);
    };
    var kind, Undefined;
    if (item === null ) {
      kind = 'null';
    } else {
      if ( item === Undefined ) {
        kind = 'undefined';
      } else {
        var prototype = getPrototype(item);
        if ( ( prototype === 'Number' ) && isNaN(item) ) {
          kind = 'NaN';
        } else {
          kind = prototype;
        }
      }
    }
    return kind;
  };

  // Polyfill if Element.prototype.matches doesn't exist.
  var prefixedMatchesMethod = ( ! global.Element || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector);

  // Add method as a non-enumerable property on obj with the name methodName
  var addMethod = function( global, objectName, prefix, methodName, method) {
    var objectToExtend = global[objectName];
    methodName = prefix ? prefix+methodName: methodName;
    // Check - NodeLists and Elements don't always exist on all JS implementations
    if ( objectToExtend ) {
      // Don't add if the method already exists
      if ( ! objectToExtend.prototype.hasOwnProperty(methodName) ) {
        Object.defineProperty( objectToExtend.prototype, methodName, {
          value: method,
          writable: true
        });
      }
    }
  };

  // There's not always a 1:1 match of functions to method names. Eg, some objects share methods,
  // others re-use inbuilt methods from other objects.
  var newMethods = {
    'Array':{
      'findItem':findItem,
      'extend':arrayExtend,
      'includes': String.prototype.includes,
      'clone':arrayClone,
      'remove':arrayRemove,
      'first':arrayFirst,
      'last':arrayLast
    },
    'Object':{
      'getKeys':getKeys,
      'getSize':getSize,
      'getPath':getPath,
      'clone':clone,
      'forEach':objectForEach,
      'extend':objectExtend,
      'compare':compare
    },
    'String':{
      'reverse':reverse,
      'leftStrip':leftStrip,
      'rightStrip':rightStrip,
      'strip':strip,
      'toHash':toHash,
      'forEach':Array.prototype.forEach // Strings and NodeLists don't have .forEach() standard but the one from Array works fine
    },
    'Function':{
      'throttle':throttle,
      'repeat':functionRepeat
    },
    'Number':{
      'before':before,
      'after':after
    },
    'Date':{
      'isOnWeekend': isOnWeekend,
      'withoutTime': withoutTime,
      'clone': dateClone
    }
  };

  for ( var objectName in newMethods ) {
    for ( var methodName in newMethods[objectName] ) {
      addMethod(global, objectName, prefix, methodName, newMethods[objectName][methodName]);
    }
  }

  // Add sttribute as a non-enumerable property on obj with the name methodName
  var addNewAttribute = function( global, objectName, prefix, methodName, method) {
    var objectToExtend = global[objectName];
    methodName = prefix ? prefix+methodName: methodName;
    // Check - NodeLists and Elements don't always exist on all JS implementations
    if ( objectToExtend ) {
      // Don't add if the method already exists
      if ( ! objectToExtend.prototype.hasOwnProperty(methodName) ) {
        Object.defineProperty( objectToExtend.prototype, methodName, {
          get: method
        });
      }
    }
  };

  var addTimeExtension = function(name, getterFunction){
    Object.defineProperty(Number.prototype, name, {
      get: getterFunction
    })
  }

  var newAttributes = {
    'Number':{
      'second':toSeconds,
      'seconds':toSeconds,
      'minute':toMinutes,
      'minutes':toMinutes,
      'hour':toHours,
      'hours':toHours,
      'day':toDays,
      'days':toDays,
      'week':toWeeks,
      'weeks':toWeeks,
      'month':toMonths,
      'months':toMonths,
      'year':toYears,
      'years':toYears
    }
  }

  for ( var objectToGetNewAttribute in newAttributes ) {
    for ( var attributeName in newAttributes[objectToGetNewAttribute] ) {
      addNewAttribute(global, objectToGetNewAttribute, prefix, attributeName, newAttributes[objectToGetNewAttribute][attributeName]);
    }
  }

  // Add a function to the global
  var addGlobal = function( global, globalName, prefix, globalFunction) {
    globalName = prefix ? prefix+globalName: globalName;
    // Don't add if the global already exists
    if ( ! global.hasOwnProperty(globalName) ) {
      global[globalName] = globalFunction;
    }
  };
  addGlobal(global, 'kind', prefix, kind);

  enabledPrefixes[prefix] = true;
}.bind();

module.exports = enable;
