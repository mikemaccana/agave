# Agave.JS

A lightweight library for cleaner, simpler Javascript.

You can use it on the browser and in node.

 - Only adds things you use every day. See 'What does Agave provide?' below
 - Is tiny. <1K unminified.
 - Built for ES5:
   - Leverages ES5’s native methods
   - Doesn’t try and re-implement anything in ES5. 
 - Is an AMD module

## What does Agave provide?

### Object

getKeys() returns an array of keys

getSize() return the number of properties in the object

getPath() get the value of the nested keys provided in the object. 
If any are missing, return undefined. Used for checking JSON results.  

### Array

hasItem() returns true if an array has an item

findItem(test_function) returns the first item that matches the test_function

### String

hasSubstring() returns true if a string contains a substring

## But Adding Methods to Inbuilt Objects is Bad!

If you're project already has a String.prototype.hasSubstring(), and it does something other than tell you whether a string has a substring, you should consider many things, the least of which is whether you should use Agave.

If, like most people, your code is filled with: 

    if ( mystring.indexof(substring) !== −1 ) { }

Then you can. and probably should,use Agave.

## Using Agave

Agave is currently provided as an AMD module. 

    requirejs(['agave'], function () {  
      // Your code hhere
    })

## Tests

Install node.js, and run
Run:

    npm install .
    mocha

Inside the app folder.

## License

BSD license.

## Author

Mike MacCana (mike.maccana@gmail.com)