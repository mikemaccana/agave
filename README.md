# Agave.JS [![Build Status](https://secure.travis-ci.org/mikemaccana/agave.png?branch=master)](https://travis-ci.org/mikemaccana/agave)

## Cleaner, simpler Javascript for ES5 environments

Agave.js safely extends native Javascript objects with helpful, intuitive methods that make your code shorter and more readable.

 - Adds things you use every day. See 'What does Agave provide?' below.
 - Built only for ES5 enviroments like Chrome, Firefox, Safari, IE9, IE10 and node.js. Agave uses ES5 specific features to safely extend inbuilt objects.
 - Is tiny. <320 lines of code. Agave also uses ES5 to stay small.
 - Is loadable both as a regular node module and via RequireJS as an AMD module.

### What does Agave provide?

#### Object methods

    var mockObject = {
      foo: 'bar',
      baz: {
        bam:'boo',
        zar:{
          zog:'something useful'
        }
      }
    }

##### .getKeys()
Returns an array of the object’s keys.

    mockObject.getKeys()

Returns:

    [‘foo’,’bar’]

##### .getSize()
Returns the number of properties in the object.

    mockObject.getSize()

Returns:

    2

##### .getPath(path)

Provided with either a '/' separated path, or an array of keys, get the value of the nested keys in the object.
If any of the keys are missing, return undefined. This is very useful for useful for checking JSON API responses where something useful is buried deep inside an object. Eg, the following code:

    mockObject.getPath('/baz/zar/zog')

or, alternatively:

    mockObject.getPath(['baz','zar','zog'])

will return:

    'something useful'

Keys, of course, could be strings, array indices, or anything else.

#### Array methods

##### .clone()
Returns a shallow clone of the object.

##### .contains(_item_)

returns true if the array contains the item.

    ['one','two','three'].contains('two')

Returns:

    true

##### .findItem(_testfunction_)
When provided with a function to test each item against, returns the first item that where testfunction returns true.

##### .extend(_newarray_)
Adds the items from _newarray_ to the end of this array.

##### .toNodeList()
Turns an array of Elements into a NodeList.

#### String methods

##### .contains(_substring_)
returns true if a string contains the substring

    'elephantine'.contains('tin')

Returns:

    true

##### .startsWith(_substring_)
returns true if a string starts with the substring

##### .endsWith(_substring_)
returns true if a string ends with the substring

    'Hello world'.endsWith('world'))

Returns:

    true

##### .strip(_chars_)
returns the string, with the specified chars removed from the beginning and end.

    'Hello world'.strip('Hld')

Returns:

    'ello wor'

##### .leftStrip(_chars_)
returns the string, with the specified chars removed from the beginning.

##### .rightStrip(_chars_)
returns the string, with the specified chars removed from the end.

##### .forEach(_iterationfunction_)
Runs _iterationfunction_ over each character in the String. Just like ES5’s inbuilt Array.forEach().

##### .repeat(_times_)
Repeat the string _times_ times.

#### Number methods

Note numbers in Javascript have to be wrapped in brackets to use methods on them, otherwise the '.' is interpreted as the decimal point in a Float.

##### .seconds, .hours(), .days(), and .weeks()

Converts a number into the amount of milliseconds for a timespan. For example:

    (5).days()

Returns:

    432000000

Since 5 days is 432000000 milliseconds.

##### .before(), .after()

Turns a number (assumed to be an amount of milliseconds) into the Date in the past (using .before() or the future (using .after()). You'd typically combine this with .seconds, .hours(), .days(), and .weeks() to  For example:

    (2).days().ago()

Returns a Date object, eg:

    Tue Jun 04 2013 22:16:50 GMT+0100 (BST)

Whereas:

    var joinedCompanyDate = new Date('Tue Jun 04 2013 1:00:00 GMT+0100 (BST)')
    (2).weeks().before(joinedCompanyDate)

#### NodeList methods

NodeLists are what's returned when you use the document.querySelectorAll(), or similar methods.

For example, given the following document:

    <html>
      <body>
        <article>
          <heading>Sample document</heading>
          <author></author>
          <p>Carles portland banh mi lomo twee.</p>
          <p>Narwhal bicycle rights keffiyeh beard.</p>
          <p>Pork belly beard pop-up kale chips.</p>
        </article>
      </body>
    </html>

We can fetch a list of all paragraphs:

    var paragraphs = document.getElementsByTagName('p');

Agave adds a number of useful methods that you can use both server-side and client side.

##### .reverse()
Returns a reversed version of the nodeList.

##### .forEach(_iterationfunction_)
Runs _iterationfunction_ over each node in the NodeList. Just like ES5’s inbuilt Array.forEach().

Here’s an example of changing every paragraph in a document to say ‘Hello’ (look ma, No JQuery!).

    paragraphs.forEach(function(paragraph){
      paragraph.innerText = 'Hello.';
    })

#### Element methods

Agave also provides useful methods for Elements.

##### .createChild(name, attributes, innerText)

Make a new child element, with the tag name, any attributes, and inner text specified.

    var article = document.querySelector('article');
    article.createChild('p',{'id':'testpara'},'hey there');

Would create a new

    <p id="testpara">hey there</p>

element beneath

     <article>

##### .matches(_selector_)

Returns true if the element matches the selector provided.

##### .applyStyles(_styles_)

Apply the styles mentioned to the element.

##### .ancestorNodes(_selector_)

Returns a NodeList of an element’s parents, from closest to farthest ancestor. If selector is provided, only the parents which match the selector will be returned.

## Why would I want to use Agave?

Agave will make your code shorter and more readable.

### How Does Agave Compare to Sugar.js?

[Sugar.js](http://sugarjs.com/) is an excellent project and was the inspiration for Agave. Like Sugar, Agave provides useful additional methods on native objects.
 - Agave focuses only on things JS programmers do every day, and is much smaller than Sugar.js. Sugar.js has String.prototype.humanize() and String.prototype.hankaku(). Agave won’t ever have those.
 - Agave does not attempt to support IE8 and other ES3 browsers, resulting in a much smaller code base that is free of ES3 shims.
 - Agave has a more explicit method naming style that’s consistent with the ES5 specification.

### How Does Agave Compare to Underscore.js and Lodash?

 - Agave.js provides additional methods to complement those provided by ES5, rather than functions attached to punctuation.
 - Agave doesn’t require a separate string library.
 - Agave does not attempt to support IE8 and other ES3 browsers, resulting in a much smaller code base that is free of ES3->ES5 shims.
 - Agave is probably not as fast as lodash - it deliberately chooses simple, more obvious code over faster but more obscure options. This shouldn’t make much different to most people, but if it does, you can easily patch Agave to use any preferred techniques.

### I read that adding methods to prototypes is bad

Agave addresses a number of concerns people have raised over the years since Prototype.JS first began extending built ins. [Andrew Dupont’s talk at JSConf 2011](http://blip.tv/jsconf/jsconf2011-andrew-dupont-everything-is-permitted-extending-built-ins-5211542) provides an excellent overview on how the JS community has approached this topic over time.

### Q. Will Agave methods appear when iterating over objects?
### A. No. Methods will never appear when iterating over objects.

Adding methods to inbuilt objects _was_ bad, back on ES3 browsers like IE8 and Firefox 3 and older. ES3 didn’t provide a way for developers to add their own non-enumerable properties to inbuilt objects.

Let's see the problem: open your browser console right now and add a method, the traditional way:

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

The answer is that inbuilt methods in Javascript have always been non-enumerable. But __in ES3, you never had the ability to make your own non-enumerable methods__.

ES5 - the current version of Javascript created in 2009 that Chrome, Firefox, and IE9/10, as well as node.js use - specifically allows for the [addition of new non-enumerable properties via Object.defineProperty()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty).

So open a new tab. Let’s try again, ES5-style:

    Object.defineProperty( Object.prototype, "newStyleMethod", {value: function newStyleMethod(){}, enumerable: false});

    for (var key in myobject) { console.log(key) };

Hrm, it seems newStyleMethod(), just like toString(), doesn’t interfere with our loops.

This is exactly what Agave uses.  As a result, Agave’s methods will **never** show up in for loops.

So if you’re OK with Agave’s requirements - ie, you support only ES5 environments like current generation browsers and node - you can use Agave.

### Q. Future ES versions or other libraries might use the same method names to do different stuff
### A. That’s why we let you prefix all method names

Another concern may be naming or implementation conflicts - ie, another library or perhaps a new version of ES includes some code that uses the same method name to do something differently. This is why  __Agave allows you to prefix every method it provides__. Just start it with:

    agave.enable(‘av’);

or the prefix of your choice to have all the methods prefixed with whatever string you like.

Using a prefix is the preferred mechanism for publicly distributed libraries that use Agave.

You may still prefer unprefixed, for the following reasons:

 - You may find the benefits of shorter code ourweigh the rish of a possible future conflict.
 - Agave's developers track ES6 updates and specifically try to avoid conflicts with what’s proposed.

### Q. There are new methods on my window object!
### A. Yes, window is an object. This is how JS works.

Everything’s an object in JS, so eveerything has has object methods. We mentioned object.toString() earlier - there’s a window.toSting() in your browser, and a global.toString() in Node that JS provides because window and global are objects.

When running agave, the additional methods added to Object.prototype will appear on window and global just like the inbuilt ones. You might find this odd, but it’s expected behavior.

You may find this useful - for example, if you wanted to find out whether some deeply nested set of keys exists underneath window, then .getKeys() or it’s equivalent.

### Using Agave

#### On the server (node.js)

Just run:

    npm install agave

Then in your code:

    var agave = require('agave');

#### In the browser, on the server using RequireJS, or shared between the browser and server.

Agave is provided as an AMD module. You’d normally load it as a dependency for your own module, either in the browser or on node.js, using [RequireJS](http://requirejs.org/):

    define('yourmodulename', ['agave'], function (agave) {
      // Start Agave, optionally you can also provide a prefix of your choice.
      agave.enable(_optionalprefix_);

      // Your code here...

    })

All the methods above are now available.

### I’ve got stuff to add!

Awesome. Fork the repo, add your code, add your tests to tests.js and send me a pull request.

### Tests

Install [node.js](http://nodejs.org/), and run:

    npm install .
    mocha

Inside the folder you downloaded Agave to.

### What About IE8 and Firefox 3 support?

Sorry, but this isn’t possible. ES3 browsers don’t support Object.defineProperty() and it cannot be emulated via shims.

### License

[MIT license](https://github.com/mikemaccana/agave/blob/master/MIT-LICENSE.md).

### Author

Mike MacCana (mike.maccana@gmail.com)