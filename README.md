# Dummy JSON

Dummy JSON is a Node utility that allows you to generate random JSON data using Handlebars templates. It uses a collection of Handlebars helpers designed to return common data values, such as names and addresses, numbers, dates, booleans, and so on. Best used in conjunction with a mock API service to return test data.

* [Getting started](#getting-started)
* [Available helpers](#available-helpers)
* [Writing your own helpers](#writing-your-own-helpers)
* [Seeded random data](#seeded-random-data)
* [Advanced usage](#advanced-usage)

## Example

To correctly format the table in this example please ensure you are viewing it on the [github page](https://github.com/webroo/dummy-json)

<table>
<thead><tr><td width="50%">Template string</td><td width="50%">Output string</td></tr></thead>
<tbody><tr><td align="left" valign="top">
<pre style="padding: 0">
{
  "users": [
    {{#repeat 2}}
    {
      "id": {{index}},
      "firstName": "{{firstName}}",
      "lastName": "{{lastName}}",
      "email": "{{email}}",
      "work": "{{company}}",
      "age": {{int 20 50}},
      "optedin": {{boolean}}
    }
    {{/repeat}}
  ],
  "images": [
    {{#repeat 3}}
    "img{{@index}}.png"
    {{/repeat}}
  ],
  "tolerance": {{float '0' '2'}},
}
</pre>
</td><td align="left" valign="top">
<pre style="padding: 0">
{
  "users": [
    {
      "id": 0,
      "firstName": "Leanne",
      "lastName": "Flinn",
      "email": "leanne.flinn@unilogic.com",
      "work": "Unilogic",
      "age": 26,
      "optedin": true
    },
    {
      "id": 1,
      "firstName": "Edward",
      "lastName": "Young",
      "email": "edward.young@solexis.com",
      "work": "Solexis",
      "age": 31,
      "optedin": false
    }
  ],
  "images": [
    "img0.png",
    "img1.png",
    "img2.png"
  ],
  "tolerance": 1.7508240924216807,
}
</pre>
</td></tr></tbody></table>

## Getting started

Install via npm:

    npm install dummy-json

#### Generate JSON String

```js
var dummyjson = require('dummy-json');
var template = '{\
	"name": {{firstName}},\
	"age": {{number 18 65}}\
  }';
var result = dummyjson.parse(template); // Returns a string
```

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

Repeats blocks of content, similar to Handlebars' built-in `each`. Can be used anywhere in your template, not just inside arrays. Automatically adds a comma between blocks and tidies up whitespace.

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

If necessary you can omit the comma by using `comma=false`, for example:

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
{{number 0 100}} // 43

// Rounds the random integer to the nearest multiple of 5
{{number 0 100 round=5}} // 65

// Formats the random integer using numbro
{{number 10000 50000 '0,0.00'}} // 23,462.00
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
{{number 0 1 round=0.1}} // 0.4

// Formats the random float using numbro
{{number 10000 50000 '0,0.00'}} // 33,127.39
```

### Date

`{{date min max [format]}}`

* `min` Minimum value (required)
* `max` Maximum value (required)
* `format` Formatting string (optional, default is null)

Generates a random date between the two values. Both `min` and `max` can be represented by any string that the [Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) method accepts.

By default the output uses [Date.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString). Alternatively the output can be formatted using a format string provided by fecha. For a complete list of formatting options see [https://github.com/taylorhakes/fecha](https://github.com/taylorhakes/fecha)

```js
// Generate a random date between midnight 2010-01-01 and midnight 2015-01-01
{{date "2010" "2015"}} // Thu Jan 26 2012 03:04:15 GMT+0000 (GMT)

// Generate a random date between more specific values
{{date '2015-06-01' '2015-06-30'}} // Mon Jun 22 2015 01:02:36 GMT+0100 (BST)

// Generate a random date between even more specific values (inc. time)
{{date '2015-06-01T09:00' '2015-06-30T:17:30'}} // Sun Jun 07 2015 23:55:16 GMT+0100 (BST)

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

This is a shorthand method for generating the time portion of a date, without needing to put the full date into the min and max values. Both `min` and `max` can be represented by any string in the 24h format `HH:mm:ss`, for example `17:48:34.`, or if you want to ignore seconds `17:48`.

By default the output uses `HH:mm`. Alternatively the output can be formatted using a format string provided by fecha. For a complete list of formatting options see [https://github.com/taylorhakes/fecha](https://github.com/taylorhakes/fecha)

```js
// Generate a random time
{{date "09:00" "17:30"}} // 14:08

// Format the time using fecha
{{date '09:00' '17:30' 'h:mm a'}} // 2:08 pm
```

### Boolean

`{{boolean}}`

Generates a random `true` or `false` value.

### First name

`{{firstName}}`

Generates a random first name, from a predefined list. This helper is kept in sync with other name-related helpers, such as username and email - see the section on Linked Helpers for more information.

### Last name

`{{lastName}}`

Generates a random last name, from a predefined list. This helper is kept in sync with other name-related helpers, such as username and email - see the section on Linked Helpers for more information.

### Company

`{{company}}`

Generates a random company name, from a predefined list. This helper is kept in sync with the email and domain helpers, such as username and email - see the section on Linked Helpers for more information.

### Domain

`{{domain}}`

Generates a random domain name in the format "domain.tld", from a predefined list. This helper is kept in sync with the company and email helpers - see the section on Linked Helpers for more information.

### TLD

`{{tld}}`

Generates a random top-level domain name, from a predefined list. This helper is kept in sync with the email helper - see the section on Linked Helpers for more information.

### Email

`{{email}}`

Generates a random email address. This helper is kept in sync with other name-related helpers, such as username and email - see the section on Linked Helpers for more information.

### Street

`{{street}}`

Generates a random street name, from a predefined list.

### City

`{{city}}`

Generates a random city name, from a predefined list.

### Country

`{{country}}`

Generates a random country name, from a predefined list based on [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1). This helper is kept in sync with the country code helper - see the section on Linked Helpers for more information.

If you want to export the entire list then you can use the following snippet in your template:

```js
{{#each countries}}
  "name": "{{this}}"
{{/each}}
```

### Country code

`{{countryCode}}`

Generates a random 2-character country code, from a predefined list based on [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1). This helper is kept in sync with the country helper - see the section on Linked Helpers for more information.

If you want to export the entire list then you can use the following snippet in your template:

```js
{{#each countryCodes}}
  "code": "{{this}}"
{{/each}}
```
### Zipcode

`{{zipcode}}`

Generates a random 5 digit zipcode.

### Postcode

`{{postcode}}`

Generates a random UK-style postcode in the format `AA9 9AA`.

### Latitude

`{{lat}}`

Generates a random latitude to 6 decimal places (roughly 10cm of precision).

### Longitude

`{{long}}`

Generates a random longitude to 6 decimal places (roughly 10cm of precision).

### Phone number

`{{phone [format]}}`

* `format` Formatting string (optional, default is `xxx-xxx-xxxx`)

Generates a random phone number in the format `xxx-xxx-xxxx`, for example "123-456-7890". To use an different format pass a string to the `format` parameter containing a series of lowercase `x` characters for each random integer.

```js
// Generate a random phone number in the default format
{{phone}} // 445-295-1044

// Generate a random phone number with a custom format
{{phone "+64 (x) xxx xxxx"}} // +64 (5) 883 4711
```

### Color

`{{color}}`

Generates a CSS color name, from a predefined list. For example: `forestgreen`

### Hex color

`{{hexColor [websafe=false]}}`

* `websafe` Generates a websafe color if true (optional, default is false)

Generates a hexadecimal color value with leading hash symbol.

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
{{lorem}} // Amet vel aliquam laoreet accumsan adipiscing... etc...

// Generates 5 words of lorem ipsum
{{lorem 5}} //  Orci nisi laoreet maximus dictum.
```

### Lowercase

{{lowercase (helper)}}

* `helper` Any helper that returns a string (required)

Converts the output of any string-based helper to lowercase. This uses Handlebars' [subexpression syntax](http://handlebarsjs.com/expressions.html#subexpressions).

```js
// Change firstName to lowercase
{{lowercase (firstName)}} // ivan

// Change city to lowercase
{{lowercase (city)}} // boston
```

### Uppercase

{{uppercase (helper)}}

* `helper` Any helper that returns a string (required)

Converts the output of any string-based helper to uppercase. This uses Handlebars' [subexpression syntax](http://handlebarsjs.com/expressions.html#subexpressions).

```js
// Change firstName to uppercase
{{uppercase (firstName)}} // IVAN

// Change city to uppercase
{{uppercase (city)}} // BOSTON
```

## Synchronized helpers

Several helpers, such as name and email, are linked together and attempt to synchronize their values. This gives the random data some continuity:

```js
"firstName": "{{firstName}}", // Michael
"lastName": "{{lastName}}",   // Turner
"email": "{{email}}"          // michael.turner@unilogic.com
```

The helpers can be placed in any order and will still attempt to synchronize:

```js
"email": "{{email}}"          // michael.turner@unilogic.com
"firstName": "{{firstName}}", // Michael
"lastName": "{{lastName}}",   // Turner
```

This synchronization is reset whenever the same helper is used twice (or at the beginning of a repeat block):

```js
"email": "{{email}}"          // michael.turner@unilogic.com
"firstName": "{{firstName}}", // Michael
"lastName": "{{lastName}}",   // Turner
"email": "{{email}}"          // grace.chapman@westgate.org
"firstName": "{{firstName}}", // Grace
"lastName": "{{lastName}}",   // Chapman
```

The following helpers sync their values:

* firstName, lastName, username, company, domain, tld, email
* country, countryCode

## Writing your own helpers

The `parse` method accepts a second parameter where you can pass an object map of custom helper functions. The key of each property becomes the helper name in the template, for example:

```js
var helpers = {
  direction: function() {
    return Math.random() > 0.5 ? 'left' : 'right';
  }
};
var template = '"direction": "{{direction}}"';
var result = dummyjson.parse(template, {helpers: helpers});

// Output
"direction": "left"
```

For more information on writing helpers see the [Handlebars documentation](http://handlebarsjs.com/block_helpers.html).

### Using parameters

TODO

### Array-based helpers

TODO

### Overriding existing helpers

***TODO Just pass in helpers with the same name to override existing ones***

## Seeded random data

If you need repeatable mock data then you can set a seed for the pseudo random number generator:

```js
// Set the seed, can be any string value
dummyjson.seed = 'helloworld';

// Every subsequent call to parse() will now generate the same data values
var result = dummyjson.parse(string);
```

Alternatively you can set a one-time seed for a specific `parse()` call:

```js
var result = dummyjson.parse(string, {seed: 'abc123'});
```

Note: A one-time seed will not overwrite `dummyjson.seed`, and any subsequent call to `parse()` without a seed will use the original `dummyjson.seed` value.

## Advanced usage

### Using your own data

```js
var data = {
  animals: ['cat', 'dog', 'cow', 'wolf', 'giraffe']
};
var template = '{ "pets": [ {{#each animals}}{{this}}{{/each}} ] }';
var result = dummyjson.parse(template, {data: data});
```

Useful for splicing bits of real data into the generated reponse. All the regular Handlebars functionality is available to work with the data.

### Using your own partials
It's even possible to separate your entities/resources in small pieces of code to promote reuse and encapsulation.

```js
var personTmpl = {
  "id": {{index}},
  "firstName": "{{firstName}}",
  "lastName": "{{lastName}}",
  "email": "{{email}}",
  "work": "{{company}}",
  "age": {{number 20 50}},
  "optedin": {{boolean}}
};

var partials = {
  person: personTmpl
};

var template = {
  "people": [
    {{#repeat 3}}
      {{> person }}
    {{/repeat}}
  ]
};

var result = dummyjson.parse(template, {partials: partials});
```

### The API

`dummyjson.parse(string, options)` Parses the given string and returns a new string

* `string` Template string to parse
* `options` Object that can contain one or more of the following properties:
  * `options.seed` Random seed for this particular parse routine
  * `options.helpers` Object map of custom helper functions
  * `options.partials` Object map of custom partial strings

`dummyjson.seed` Set the seed for all future parsing. Default is null.

`dummyjson.mockdata`

`dummyjson.helpers`

`dummyjson.utils`

## Migrating from 0.0.x releases to 1.0.0

* The repeat helper no longer accepts an array, use the Handlebars `{{#each}}` helper instead
* Use `{{@index}}` instead of `{{index}}` inside repeat blocks, as per default Handlebars functionality
* The `{{number}}` helper no longer exists and has been separated into `{{int}}` and `{{float}}`
* The `{{uniqueIndex}}` helper no longer exists, consider using `{{guid}}` instead