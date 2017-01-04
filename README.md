# Dummy JSON

Dummy JSON is a Node utility that allows you to generate random JSON data using Handlebars templates. It comes with a built-in collection of Handlebars helpers that return common data values, such as names, numbers, dates, and also allows you to write your own.

* [Getting started](#getting-started)
* [Available helpers](#available-helpers)
* [Using your own data](#using-your-own-data)
* [Writing your own helpers](#writing-your-own-helpers)
* [Seeded random data](#seeded-random-data)
* [Advanced usage](#advanced-usage)

## Example

Please view the following example on the [github page](https://github.com/webroo/dummy-json) if it's not formatted correctly.

<table>
<thead><tr><td width="50%">Template string</td><td width="50%">Output string</td></tr></thead>
<tbody><tr><td align="left" valign="top">
<pre style="padding: 0">
{
  "users": [
    {{#repeat 2}}
    {
      "id": {{@index}},
      "name": "{{firstName}} {{lastName}}",
      "work": "{{company}}",
      "email": "{{email}}",
      "dob": "{{date '1900' '2000' 'YYYY'}}",
      "address": "{{int 1 100}} {{street}}",
      "city": "{{city}}",
      "optedin": {{boolean}}
    }
    {{/repeat}}
  ],
  "images": [
    {{#repeat 3}}
    "img{{@index}}.png"
    {{/repeat}}
  ],
  "coordinates": {
    "x": {{float -50 50 '0.00'}},
    "y": {{float -25 25 '0.00'}}
  },
  "price": "${{int 0 99999 '0,0'}}"
}
</pre>
</td><td align="left" valign="top">
<pre style="padding: 0">
{
  "users": [
    {
      "id": 0,
      "name": "Adam Carter",
      "work": "Unilogic",
      "email": "adam.carter@unilogic.com",
      "dob": "1978",
      "address": "83 Warner Street",
      "city": "Boston",
      "optedin": true
    },
    {
      "id": 1,
      "name": "Leanne Brier",
      "work": "Connic",
      "email": "leanne.brier@connic.org",
      "dob": "13/05/1987",
      "address": "9 Coleman Avenue",
      "city": "Toronto",
      "optedin": false
    }
  ],
  "images": [
    "img0.png",
    "img1.png",
    "img2.png"
  ],
  "coordinates": {
  	"x": 35.12,
  	"y": -21.49
  },
  "price": "$59,395"
}
</pre>
</td></tr></tbody></table>

## Getting started

Install via npm:

    npm install dummy-json

### API

`dummyjson.parse(template, {options})` Parses the given template and returns a string

* `template` Handlebars template string
* `options` Options object containing any of the following properties:
  * `helpers` Custom helpers (see [Writing your own helpers](#writing-your-own-helpers))
  * `mockdata` Custom mockdata (see [Advanced usage](#advanced-usage))
  * `partials` Custom Handlebars partials (see [Advanced usage](#advanced-usage))
  * `seed` Seed for the random number generator (see [Seeded random data](#seeded-random-data))

#### Generate JSON string

```js
var dummyjson = require('dummy-json');
var template = '{\
	"name": {{firstName}},\
	"age": {{int 18 65}}\
  }';
var result = dummyjson.parse(template); // Returns a string
```

Note: if you're using ES6 you can write multi-line strings using [template strings](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings).

#### Generate from a file

Instead of writing multi-line strings in Javascript you can load the template from a file using Node's `fs` utility:

```js
var fs = require('fs');
var dummyjson = require('./dummy-json');

var template = fs.readFileSync('template.hbs', {encoding: 'utf8'});
var result = dummyjson.parse(template);
```

#### Converting to JavaScript object

If the output string is properly formatted it can be parsed into a JavaScript object:

```js
var result = dummyjson.parse(template);
var obj = JSON.parse(result);
```

#### Using with a HTTP response

A common use of Dummy JSON is to create a mock API service that returns random data. Here's a quick example using Express:

```js
var fs = require('fs');
var express = require('express');
var dummyjson = require('./dummy-json');

var template = fs.readFileSync('template.hbs', {encoding: 'utf8'});
var app = express();

app.get('/people', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(dummyjson.parse(template));
});

app.listen(3000);
```

#### Command line iterface

If you install the utility globally with `npm install -g dummy-json` you can use it from the command line to parse files:

	dummyjson template.hbs > output.json

## Available helpers

### Repeat

`{{#repeat count [comma=true]}} ... {{/repeat}}`

* `count` The number of times to repeat the content (required)
* `comma` Adds or removes the separating comma between blocks of content (optional, default is true)

Repeats blocks of content, similar to Handlebars' built-in `each`. Can be used anywhere in your template, not just inside arrays. Automatically adds a comma and line break between blocks.

```js
// Repeat the block 3 times, automatically adding a comma between blocks
var messages = [
  {{#repeat 3}}
  "hello"
  {{/repeat}}
];

// Output
var messages = [
  "hello",
  "hello",
  "hello"
];
```

You can omit the comma and line break by using `comma=false`, for example:

```js
{{#repeat 3 comma=false}}hello{{/repeat}} // hellohellohello
```

You can get the iteration position using the standard Handlebars variables `@index`, `@first`, `@last`. The total number of iterations is available using `@total`.

```js
// Repeat the block 3 times using @index to modify the filename
{{#repeat 3}}
"img{{@index}}.png"
{{/repeat}}

// Output
"img0.png",
"img1.png",
"img2.png"
```

### Integer

`{{int min max [format] [round=1]}}`

* `min` Minimum value (required)
* `max` Maximum value (required)
* `format` Formatting string (optional, default is null)
* `round` Rounds to the nearest multiple of the given value (optional, default is null - no rounding)

Generates a random integer from `min` (inclusive) up to and including `max` (inclusive). The optional `round` parameter will round the number to the nearest multiple of the given value.

The output can be formatted using a numeric format string, provided by numbro. For a complete list of formatting options see [http://numbrojs.com/format.html](http://numbrojs.com/format.html).

```js
// Generates a random integer between 0 and 100
{{int 0 100}} // 43

// Rounds the random integer to the nearest multiple of 5
{{int 0 100 round=5}} // 65

// Formats the random integer using numbro
{{int 10000 50000 '0,0.00'}} // 23,462.00
```

### Float

`{{float min max [format] [round=1]}}`

* `min` Minimum value (required)
* `max` Maximum value (required)
* `format` Formatting string (optional, default is null)
* `round` Rounds to the nearest multiple of the given value (optional, default is null - no rounding)

Generates a random floating point number from `min` (inclusive) up to but excluding `max` (exclusive). The optional `round` parameter will round the number to the nearest multiple of the given value.

The output can be formatted using a numeric format string, provided by numbro. For a complete list of formatting options see [http://numbrojs.com/format.html](http://numbrojs.com/format.html).

```js
// Generates a random float between 0 and 1
{{float 0 1}} // 0.4319351462490857

// Rounds the random float to the nearest multiple of 0.1
{{float 0 1 round=0.1}} // 0.4

// Formats the random float using numbro
{{float 10000 50000 '0,0.00'}} // 33,127.39
```

### Date

`{{date min max [format]}}`

* `min` Minimum value (required)
* `max` Maximum value (required)
* `format` Formatting string (optional, default is null)

Generates a random date between the two values. Both `min` and `max` can be represented by any string that the [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) method accepts.

By default the output uses [Date.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString). Alternatively the output can be formatted using a format string provided by fecha. For a complete list of formatting options see [https://github.com/taylorhakes/fecha](https://github.com/taylorhakes/fecha)

```js
// Generate a random date between midnight 2010-01-01 and midnight 2015-01-01
{{date '2010' '2015'}} // Thu Jan 26 2012 03:04:15 GMT+0000 (GMT)

// Generate a random date between more specific values
{{date '2015-06-01' '2015-06-30'}} // Mon Jun 22 2015 01:02:36 GMT+0100 (BST)

// Generate a random date between even more specific values (inc. time)
{{date '2015-06-01T09:00' '2015-06-30T17:30'}} // Sun Jun 07 2015 23:55:16 GMT+0100 (BST)

// Format the date using fecha
{{date '2010' '2015' 'DD/MM/YYYY'}} // 16/06/2012

// Format the date using a unix timestamp
{{date '2010' '2015' 'unix'}} // 1340417344
```

### Time

`{{time min max [format]}}`

* `min` Minimum value (required)
* `max` Maximum value (required)
* `format` Formatting string (optional, default is null)

This is a shorthand helper for generating the time portion of a date, without needing to put the full date into the min and max values. Both `min` and `max` can be represented by any string in the 24h format `HH:mm:ss`, for example `17:48:34.`, or if you want to ignore seconds: `17:48`

By default the output uses `HH:mm`. Alternatively the output can be formatted using a format string provided by fecha. For a complete list of formatting options see [https://github.com/taylorhakes/fecha](https://github.com/taylorhakes/fecha)

```js
// Generate a random time
{{time '09:00' '17:30'}} // 14:08

// Format the time using fecha
{{time '09:00' '17:30' 'h:mm a'}} // 2:08 pm
```

### Boolean

`{{boolean}}`

Generates a random `true` or `false` value.

### Title

`{{title}}`

Generates a random title prefix, from a predefined list, such as "Mr", "Mrs", "Dr", etc.

### First name

`{{firstName}}`

Generates a random first name, from a predefined list. This helper is kept in sync with other name-related helpers, such as username and email - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Last name

`{{lastName}}`

Generates a random last name, from a predefined list. This helper is kept in sync with other name-related helpers, such as username and email - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Company

`{{company}}`

Generates a random company name, from a predefined list. This helper is kept in sync with the email and domain helpers, such as username and email - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Domain

`{{domain}}`

Generates a random domain name in the format "domain.tld", from a predefined list. This helper is kept in sync with the company and email helpers - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### TLD

`{{tld}}`

Generates a random top-level domain name, from a predefined list. This helper is kept in sync with the email helper - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Email

`{{email}}`

Generates a random email address. This helper is kept in sync with other name-related helpers, such as username and email - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Street

`{{street}}`

Generates a random street name, from a predefined list.

### City

`{{city}}`

Generates a random city name, from a predefined list.

### Country

`{{country}}`

Generates a random country name, from a predefined list based on [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1). This helper is kept in sync with the country code helper - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

If you want to export the entire list then you can use the following snippet in your template:

```js
{{#each countries}}
"name": "{{this}}"
{{/each}}
```

### Country code

`{{countryCode}}`

Generates a random 2-character country code, from a predefined list based on [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1). This helper is kept in sync with the country helper - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

If you want to export the entire list then you can use the following snippet in your template:

```js
{{#each countryCodes}}
"code": "{{this}}"
{{/each}}
```
### Zipcode

`{{zipcode}}`

Generates a random US-style 5 digit zipcode.

### Postcode

`{{postcode}}`

Generates a random UK-style postcode in the format `AA9 9AA`.

### Latitude

`{{lat}}`

Generates a random latitude from -90 to +90, to 6 decimal places (roughly 10cm of precision).

### Longitude

`{{long}}`

Generates a random longitude from -180 to +180, to 6 decimal places (roughly 10cm of precision).

### Phone number

`{{phone [format]}}`

* `format` Formatting string (optional, default is `xxx-xxx-xxxx`)

Generates a random phone number in the format `xxx-xxx-xxxx`, for example "123-456-7890". To use a different format pass a string to the `format` parameter containing a series of lowercase "x" characters for each random integer.

```js
// Generate a random phone number in the default format
{{phone}} // 445-295-1044

// Generate a random phone number with a custom format
{{phone "+64 (x) xxx xxxx"}} // +64 (5) 883 4711
```

### Color

`{{color}}`

Generates a random CSS color name, from a predefined list, such as "forestgreen", "black", etc

### Hex color

`{{hexColor [websafe=false]}}`

* `websafe` Generates a websafe color if true (optional, default is false)

Generates a random hexadecimal color value with leading hash symbol.

```js
// Generates a hex color with leading hash symbol
{{hexColor}} // #34D92C

// Generates a websafe hex color
{{hexColor websafe=true}} // #33CC99
```

### GUID

`{{guid}}`

Generates a random 32 digit GUID.

### IPv4 address

`{{ipv4}}`

Generates a random IPv4 address.

### IPv6 address

`{{ipv6}}`

Generates a random IPv6 address.

### Lorem ipsum

`{{lorem [wordCount]}}`

* `wordcount` Number of words to generate (optional, default is 25)

Generates random sentences of lorem ipsum text, with occasional punctuation (commas and periods/full-stops).

```js
// Generates 25 words of lorem ipsum
{{lorem}} // Amet vel aliquam laoreet accumsan adipiscing velit... etc...

// Generates 5 words of lorem ipsum
{{lorem 5}} //  Orci nisi laoreet maximus dictum.
```

### Lowercase

`{{lowercase (helper)}}`

* `helper` Any helper that returns a string (required)

Converts the output of any string-based helper to lowercase. This uses the Handlebars' [subexpression syntax](http://handlebarsjs.com/expressions.html#subexpressions).

```js
// Change firstName to lowercase
{{lowercase (firstName)}} // ivan

// Change city to lowercase
{{lowercase (city)}} // boston
```

### Uppercase

`{{uppercase (helper)}}`

* `helper` Any helper that returns a string (required)

Converts the output of any string-based helper to uppercase. This uses the Handlebars' [subexpression syntax](http://handlebarsjs.com/expressions.html#subexpressions).

```js
// Change firstName to uppercase
{{uppercase (firstName)}} // IVAN

// Change city to uppercase
{{uppercase (city)}} // BOSTON
```

## Synchronized helpers

Several helpers, such as name and email, are linked together in order to synchronize their values. This gives the random data some continuity. Synchronization happens automatically and doesn't require any additional work, for example:

```js
"firstName": "{{firstName}}", // Michael
"lastName": "{{lastName}}",   // Turner
"email": "{{email}}"          // michael.turner@unilogic.com
```

The helpers can be placed in any order and will still synchronize:

```js
"email": "{{email}}"          // michael.turner@unilogic.com
"firstName": "{{firstName}}", // Michael
"lastName": "{{lastName}}",   // Turner
```

The synchronization is reset whenever the same helper is used twice, or in each iteration of a repeat block:

```js
"email": "{{email}}"          // michael.turner@unilogic.com
"firstName": "{{firstName}}", // Michael
"lastName": "{{lastName}}",   // Turner
"email": "{{email}}"          // grace.chapman@westgate.org (Note: syncing is reset here)
"firstName": "{{firstName}}", // Grace
"lastName": "{{lastName}}",   // Chapman
```

The following helpers synchronize their values:

* `firstName`, `lastName`, `username`, `company`, `domain`, `tld`, `email`
* `country`, `countryCode`

## Using your own data

If you want to use a different set of names or addresses then you can override the built-in data using the `mockdata` option:

```js
var myMockdata = {
  firstNames: ['Bob', 'Jane', 'Carl', 'Joan'],
  lastNames: ['Smith', 'Jones', 'Wallis', 'Gilmore']
};
var result = dummyjson.parse(template, {mockdata: myMockdata});
```

The following arrays are available to override:

* `firstNames`
* `lastNames`
* `companies`
* `tlds`
* `streets`
* `cities`
* `countries`
* `countryCodes`
* `colors`

## Writing your own helpers

To write your own helpers you need to create an object map of helper methods and pass it to the `options` param of `parse()`, for example:

```js
var myHelpers = {
  direction: function() {
    // Use dummyjson random to ensure the seeded random number generator is used
    return dummyjson.utils.random() > 0.5 ? 'left' : 'right';
  }
};
var template = '{{direction}}';
var result = dummyjson.parse(template, {helpers: myHelpers}); // Returns "left"
```

Your own helpers will be mixed with the built-in helpers, allowing you to use both in your template.

The helpers use the same syntax as regular Handlebars helpers, but instead of registering them with `Handlebars.registerHelper()` you pass them to `dummyjson.parse()`. For more information on writing helpers see the [Handlebars documentation](http://handlebarsjs.com/block_helpers.html).

When generating data using random numbers you should always use the `dummyjson.utils` module. This ensures you're using the seeded random number generator and means your results will be repeatable if you decide to use a seed. See the section on [Seeded random data](#seeded-random-data) for more information and a complete list of methods available in `dummyjson.utils`.

### Array-based helpers

One of the most common types of helper is one that pulls a random item from an array. You can use the following example as a basis for you own:

```js
var myHelpers = {
  orientation: function() {
    // Use randomArrayItem to ensure the seeded random number generator is used
    return dummyjson.utils.randomArrayItem(['North', 'South', 'East', 'West']);
  }
};
var template = '{{orientation}}';
var result = dummyjson.parse(template, {helpers: myHelpers}); // Returns "East"
```

## Seeded random data

By default dummyjson generates different results every time it's run. If you need repeatable dummy data then you can set a global seed for the pseudo random number generator:

```js
// Set the seed, can be any string value
dummyjson.seed = 'helloworld';

// Every subsequent call to parse() will now generate the same output
var result = dummyjson.parse(string);
```

Alternatively you can set a one-time seed for a specific `parse()` call:

```js
var result = dummyjson.parse(string, {seed: 'abc123'});
```

A one-time seed will not overwrite the global `dummyjson.seed`, meaning subsequent calls to `parse()` without a seed will use the original `dummyjson.seed` value.

### Ensuring your own helpers use the seed

To ensure your own helpers use the random seed you must use the `dummyjson.utils` module whenever you want a random number, character, or array item. The following methods are available to you:

* `dummyjson.utils`
  * `.random()` Generates a random float in the range [0, 1). Use this instead of `Math.random()`
  * `.randomInt(min, max)` Generates a random integer in the range [min, max]
  * `.randomFloat(min, max)` Generates a random float in the range [min, max)
  * `.randomBoolean()` Generates a random boolean (true or false)
  * `.randomDate(min, max)` Generates a random `Date` between the given min/max millisecond values
  * `.randomArrayItem(array)` Returns a random item from the given `array`
  * `.randomChar(charset)` Returns a random char from the given `charset` string

For example:

```js
var myHelpers = {
  temperature: function() {
    return dummyjson.utils.randomInt(0, 100) + '°C';
  }
};
```

## Advanced usage

### Overriding built-in helpers

You can replace any of the built-in helpers by simply creating your own with the same name:

```js
var myHelpers = {
  postcode: function() {
    // This version of {{postcode}} will now be used instead of the built-in one
    return 'helloworld';
  }
};
var result = dummyjson.parse(template, {helpers: myHelpers});
```

Note: If you replace any of the synchronized helpers then you will lose the syncing functionality. If you want to use a different set of names, addresses, etc, then use the technique described above in [Using your own data](#using-your-own-data).

### Using other data

The `mockdata` option can also be used to insert other data, like primitive values:

```js
var myMockdata = {
  copyright: 'Copyright Myself 2015'
};
var template = '{{copyright}}';
var result = dummyjson.parse(template, {mockdata: myMockdata}); // Returns "Copyright Myself 2015"
```

Or arrays which you can loop over using Handlebar's [each helper](http://handlebarsjs.com/builtin_helpers.html#iteration):

```js
var myMockdata = {
  animals: ['fox', 'badger', 'crow']
};
var template = '{{#each animals}}{{this}} {{/each}}';
var result = dummyjson.parse(template, {mockdata: myMockdata}); // Returns "fox badger crow"
```

### Using built-in helpers inside your own helpers

All the built-in helpers are available for you to use in your own helpers. They are available in `dummyjson.helpers`. Here's an example of using two existing helpers to make a new one:

```js
var myHelpers = {
  fullname: function(options) {
    // You must always forward the options argument to built-in helpers
    return dummyjson.helpers.firstName(options) + ' ' + dummyjson.helpers.lastName(options);
  }
};
var template = '{{fullname}}';
var result = dummyjson.parse(template, {helpers: myHelpers}); // Returns "Ivan Young"
```

As mentioned in the comment above you must always forward the `options` argument to built-in helpers. The `options` argument is automatically given to all helpers by Handlebars, and is always passed as the last argument. See the [Handlebars documentation](http://handlebarsjs.com/block_helpers.html) for more information.

### Using your own partials

You can use Handlebars partials to encapsulate content into a reusable blocks. Partials are passed via the `options` param of `parse()`.

```js
var myPartials = {
  user: '{\
    "id": {{@index}},\
    "firstName": "{{firstName}}",\
    "lastName": "{{lastName}}",\
    "email": "{{email}}"\
  }'
};

var template = '{\
    "users": [\
      {{#repeat 3}}\
        {{> user}}\
      {{/repeat}}\
    ]\
  }';

var result = dummyjson.parse(template, {partials: myPartials});
```

## Upgrading from 0.0.x releases to 1.0.0

* The `options.data` argument of `parse()` has been renamed `options.mockdata`
* Names and companies must now be overridden using `options.mockdata`
* The repeat helper no longer accepts an array, use the default Handlebars `{{#each}}` instead
* Use `{{@index}}` instead of `{{index}}` inside repeat blocks, as per default Handlebars functionality
* The `{{number}}` helper no longer exists and has been separated into `{{int}}` and `{{float}}`
* The `{{uniqueIndex}}` helper no longer exists, consider using `{{guid}}` instead