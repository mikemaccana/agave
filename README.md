# Agave.JS

## Cleaner, simpler Javascript for ES5 environments

Agave.js safely extends native Javascript objects with helpful, intuitive methods that make your code shorter and more readable.

 - Adds things you use every day. See 'What does Agave provide?' below.
 - Built only for ES5 enviroments like Chrome, Firefox, Safari, IE9/10 and node.js. Agave always leverages ES5’s fast native methods, and ES5 specific features allow us to safely extend inbuilt objects. Unlike other libraries, Agave is free of code to create semi-featured ES5 implementations in ES3 browsers like IE8.
 - Is tiny. Around 2K unminified.
 - Is an AMD module, easily loadable by requirejs in both the browser and node.

## What does Agave provide?

### Object methods

#### .getKeys() 
Returns an array of the object’s keys.

#### .getSize() 
Returns the number of properties in the object.

#### .getPath([_array_,_of_,_keys_]) 
Provided an array of keys, get the value of the nested keys in the object. 
If any of the keys are missing, return undefined. This is very useful for useful for checking JSON API responses where something useful is buried deep inside an object. Eg, given:

    var mockObject = {
      foo: 'bar',
      baz: {
        bam:'boo',
        zar:{
          zog:'something useful'
        }
      }
    }

The following code:
    
    mockObject.getPath(['baz','zar','zog']    

will return:

    'something useful'
    
Keys, of course, could be strings, array indices, or anything else.

### Array methods

#### .contains(_item_) 
returns true if the array contains the item.

#### .findItem(_testfunction_) 
When provided with a function to test each item against, returns the first item that where testfunction returns true.

#### .extend(_newarray_) 
Adds the items from _newarray_ to the end of this array.

### String methods

#### .contains(_substring_) 
returns true if a string contains the substring

#### .startsWith(_substring_) 
returns true if a string starts with the substring

#### .endsWith(_substring_) 
returns true if a string ends with the substring

#### .forEach(_iterationfunction_)
Runs _iterationfunction_ over each character in the String. Just like ES5’s inbuilt Array.forEach().

#### .repeat(_times_)
Repeat the string _times_ times.

### NodeList methods

#### .forEach(_iterationfunction_)
Runs _iterationfunction_ over each node in the NodeList. Just like ES5’s inbuilt Array.forEach().

Here’s an example of changing every paragraph in a document to say ‘Hello’ (look ma, No JQuery!).

    var paragraphs = document.getElementsByTagName('p');
    paragraphs.forEach(function(paragraph){
      paragraph.innerHTML = 'Hello.';
    })

## Why would I want to use Agave?

Agave will make your code shorter and more readable.

## How Does Agave Compare to Sugar.js?

[Sugar.js](http://sugarjs.com/) is an excellent project and was the inspiration for Agave. Like Sugar, Agave provides useful additional methods on native objects.
 - Agave focuses only on things JS programmers do every day, and is much smaller than Sugar.js. Sugar.js has String.prototype.humanize() and String.prototype.hankaku(). Agave won’t ever have those. 
 - Agave has a more explicit method naming style that’s consistent with the ES5 specification.
 - Agave does not attempt to support IE8 and other ES3 browsers, resulting in a much smaller code base that is free of ES3 shims.

## How Does Agave Compare to Underscore.js and Lodash?

 - Agave.js provides additional methods to complement those provided by ES5, rather than functions attached to punctuation. 
 - Agave doesn’t require a separate string library.
 - Agave does not attempt to support IE8 and other ES3 browsers, resulting in a much smaller code base that is free of ES3 shims.

## But Adding Methods to Inbuilt Objects is Bad!

Adding methods to inbuilt objects _was_ bad, back in ES3 days, on browsers like IE8 and Firefox 3. There wasn’t a way for developers to add their own non-enumerable properties to inbuilt objects. 

For example, Javascript objects have always had an inbuilt non-enumerable .toString() method. If you run ‘for (var key in someobject)’, ‘toString’ won’t show up as one of the keys because it was non-enumerable. However if a developer using ES3 wanted objects to have a new method - say .myMethod(), and thus created Object.prototype.myMethod(), then myMethod would be enumerable, and things like ‘for (var key in someobject)’ would include ‘myMethod’ as one of the keys. This would break things and was indeed bad.

**ES5 - the current version of Javascript created in 2009 that Chrome, Firefox, and IE9/10, as well as node.js use - specifically allows for the addition of new non-enumerable properties via Object.defineProperty()**

And that’s exactly what Agave uses.  As a result, Agave’s methods will never show up in for loops. 

So if you’re OK with Agave’s requirements - ie, you support only ES5 environments like current generation browsers and node - you can use Agave. 

Another concern may be naming or implementation conflicts - ie, some other code that uses the same method name but does something different. Agave, like ES5 itself, uses very specific method naming. 

 - If your project already has a String.prototype.contains(), and it does something other than tell you whether a string contains a substring, you should consider many things, the least of which is whether you should use this library.
 - If however, like most people, your code is filled with things like: 

        if ( myarray.indexof(myitem) !== −1 ) { ... }

Then your code will be improved by using Agave.

        if ( myarray.hasItem(myitem) ) { ... }  

## Using Agave

Agave is currently provided as an AMD module. You’d normally load it (either in the browser or on node.js) using [RequireJS](http://requirejs.org/):

    requirejs(['agave'], function () {  
      // Your code here
    })

## Tests

Install [node.js](http://nodejs.org/), and run:

    npm install mocha requirejs
    mocha

Inside the folder you downloaded Agave to.

## What About IE8 and Firefox 3 support?

Sorry, but this isn’t possible. ES3 browsers don’t support Object.defineProperty() and it cannot be emulated via shims.

## License

[MIT license](https://github.com/mikemaccana/agave/blob/master/MIT-LICENSE.md).

## Author

Mike MacCana (mike.maccana@gmail.com)