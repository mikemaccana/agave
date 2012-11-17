# Agave.JS

## Cleaner, simpler Javascript for ES5 environments

Agave.js safely extends native Javascript objects with helpful, intuitive methods that make your code shorter and more readable.

 - Adds things you use every day. See 'What does Agave provide?' below.
 - Built only for ES5 enviroments like Chrome, Firefox, Safari, IE9/10 and node.js. Agave always leverages ES5’s fast native methods, and ES5 specific features allow us to safely extend inbuilt objects. Unlike other libraries, Agave is free of code to create semi-featured ES5 implementations in ES3 browsers like IE8.
 - Is tiny. Around 1.5K unminified.
 - Is an AMD module, easily loadable by requirejs in both the browser and node.

### What does Agave provide?

#### Object methods

##### .getKeys() 
Returns an array of the object’s keys.

##### .getSize() 
Returns the number of properties in the object.

##### .getPath([_array_,_of_,_keys_]) 
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
    
    mockObject.getPath(['baz','zar','zog'])

or, alternatively:

    mockObject.getPath('/baz/zar/zog')

will return:

    'something useful'
    
Keys, of course, could be strings, array indices, or anything else.

#### Array methods

##### .clone() 
Returns a shallow clone of the object.

##### .contains(_item_) 
returns true if the array contains the item.

##### .findItem(_testfunction_) 
When provided with a function to test each item against, returns the first item that where testfunction returns true.

##### .extend(_newarray_) 
Adds the items from _newarray_ to the end of this array.

#### String methods

##### .contains(_substring_) 
returns true if a string contains the substring

##### .startsWith(_substring_) 
returns true if a string starts with the substring

##### .endsWith(_substring_) 
returns true if a string ends with the substring

##### .strip(_chars_) 
returns the string, with the specified chars removed from the beginning and end.

##### .leftStrip(_chars_) 
returns the string, with the specified chars removed from the beginning.

##### .rightStrip(_chars_) 
returns the string, with the specified chars removed from the end.

##### .forEach(_iterationfunction_)
Runs _iterationfunction_ over each character in the String. Just like ES5’s inbuilt Array.forEach().

##### .repeat(_times_)
Repeat the string _times_ times.

#### NodeList methods
##### .reverse()
Returns a reversed version of the string.

##### .forEach(_iterationfunction_)
Runs _iterationfunction_ over each node in the NodeList. Just like ES5’s inbuilt Array.forEach().

Here’s an example of changing every paragraph in a document to say ‘Hello’ (look ma, No JQuery!).

    var paragraphs = document.getElementsByTagName('p');
    paragraphs.forEach(function(paragraph){
      paragraph.innerHTML = 'Hello.';
    })

#### Element methods

##### .matches(_selector_)

Returns true if the element matches the selector provided.

##### .getParents(_selector_)

Returns a list of an element’s parents, from closest to farthest ancestor. If selector is provided, only the parents which match the selector will be returned.

## Why would I want to use Agave?

Agave will make your code shorter and more readable.

### How Does Agave Compare to Sugar.js?

[Sugar.js](http://sugarjs.com/) is an excellent project and was the inspiration for Agave. Like Sugar, Agave provides useful additional methods on native objects.
 - Agave focuses only on things JS programmers do every day, and is much smaller than Sugar.js. Sugar.js has String.prototype.humanize() and String.prototype.hankaku(). Agave won’t ever have those. 
 - Agave has a more explicit method naming style that’s consistent with the ES5 specification.
 - Agave does not attempt to support IE8 and other ES3 browsers, resulting in a much smaller code base that is free of ES3 shims.

### How Does Agave Compare to Underscore.js and Lodash?

 - Agave.js provides additional methods to complement those provided by ES5, rather than functions attached to punctuation. 
 - Agave doesn’t require a separate string library.
 - Agave does not attempt to support IE8 and other ES3 browsers, resulting in a much smaller code base that is free of ES3 shims.

### But Adding Methods to Inbuilt Objects is Bad!

There are two common concerns raised around this issue. Let’s look at them both:

### Adding methods to objects is bad because they’ll show up when iterating over the object

This was the traditional and most common objectation to adding methods in ES3 days.

Adding methods to inbuilt objects _was_ bad, back in ES3 days, on browsers like IE8 and Firefox 3. There wasn’t a way for developers to add their own non-enumerable properties to inbuilt objects. 

Let's look at the problem: open your console and add a method, the traditional way:

    Object.prototype.oldStyleMethod = function oldStyleMethod (){}  

And make an object:

    var myobject = {};

Watch what happens when we iterate over the object:

    for (var key in myobject) { console.log(key) };

You can see the problem: 'old_style_method' shows up as one of myobject's keys. This will break things and is indeed bad.

But wait a sec: Objects already have some methods out of the box. Like toString():

    console.log(Object.prototype.toString)
    function toString() { [native code] }

    console.log(Object.prototype.oldStyleMethod)
    function oldStyleMethod(){}

Why are only our add-on methods showing up as keys? Why don't the native, inbuilt methods appear in our ‘for’ loop?

The answer is that inbuilt methods in Javascript have always been non-enumerable. But in ES3, you never had the ability to make your own non-enumerable methods.

ES5 - the current version of Javascript created in 2009 that Chrome, Firefox, and IE9/10, as well as node.js use - specifically allows for the [addition of new non-enumerable properties via Object.defineProperty()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty).

So let’s try again, ES5-style:

    Object.defineProperty( Object.prototype, "newStyleMethod", {value: function newStyleMethod(){}, enumerable: false});

    for (var key in myobject) { console.log(key) };

Hrm, it seems newStyleMethod(), just like toString(), doesn’t interfere with our loops. 

This is exactly what Agave uses.  As a result, Agave’s methods will **never** show up in for loops. 

So if you’re OK with Agave’s requirements - ie, you support only ES5 environments like current generation browsers and node - you can use Agave. 

### But what about future compatibility?

Another concern may be naming or implementation conflicts - ie, another library or perhaps a new version of ES includes some other code that uses the same method name but does something different. Agave, like ES5 itself, uses very specific method naming. 

 - If your project already has a String.prototype.contains(), and it does something other than tell you whether a string contains a substring, you should consider many things, the least of which is whether you should use this library.
 - We track ES6 updates. 
 - The small chance of a possible future change in implementation - fixable with a very short amount of work in this library in future, is a better price to pay than ugly, long code and with punctuation littered everywhere. 

### Using Agave

Agave is provided as an AMD module. You’d normally load it as a dependency for your own module, either in the browser or on node.js, using [RequireJS](http://requirejs.org/):

    define('yourmodulename', ['agave'], function () {  
      // Your code here
    })

### I’ve got stuff to add!

Awesome. Fork the repo, add your code, add your tests to tests.js and send me a pull request. 

### Tests

Install [node.js](http://nodejs.org/), and run:

    npm install mocha requirejs
    mocha

Inside the folder you downloaded Agave to.

### What About IE8 and Firefox 3 support?

Sorry, but this isn’t possible. ES3 browsers don’t support Object.defineProperty() and it cannot be emulated via shims.

### License

[MIT license](https://github.com/mikemaccana/agave/blob/master/MIT-LICENSE.md).

### Author

Mike MacCana (mike.maccana@gmail.com)