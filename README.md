# Dummy JSON

Dummy JSON is a Node utility that allows you to generate random JSON data using Handlebars templates. It comes with a built-in collection of Handlebars helpers that generate common data values, such as names, numbers, dates, and also allows you to write your own.

* [Getting started](#getting-started)
* [Built-in helpers](#built-in-helpers)
* [Writing your own helpers](#writing-your-own-helpers)
* [Replacing default mock data](#replacing-default-mock-data)
* [Seeded random data](#seeded-random-data)
* [Advanced usage](#advanced-usage)
* [API](#api)

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
      "dob": "1987",
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

#### Generate a JSON string

```js
import dummyjson from 'dummy-json';

const template = `{
  "name": "{{firstName}}",
  "age": "{{int 18 65}}"
}`;
const result = dummyjson.parse(template); // Returns a string
```

#### Generate from a template file

Instead of using template strings directly in your code you can create a template file and load it using Node's `fs` utility:

```js
import fs from 'fs';
import dummyjson from 'dummy-json';

const template = fs.readFileSync('mytemplate.hbs', { encoding: 'utf8' });
const result = dummyjson.parse(template);
```

#### Converting the generated string to a JavaScript object

If the generated output is a valid JSON string then it can be parsed into a JavaScript object:

```js
const result = dummyjson.parse(template);
const obj = JSON.parse(result);
```

#### Create a dummy API endpoint

A common use of Dummy JSON is to create a mock API endpoint that returns random data. Here's a quick example using Express:

```js
import fs from 'fs';
import express from 'express';
import dummyjson from 'dummy-json';

const template = fs.readFileSync('template.hbs', { encoding: 'utf8' });
const app = express();

app.get('/api/people', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.status(200).send(dummyjson.parse(template));
});

app.listen(3000);
```

#### Command line iterface

If you install Dummy JSON globally with `npm install -g dummy-json` you can use it from the command line. Dummy JSON will write to stdout by default but you can redirect to a file like so:

	dummyjson template.hbs > output.json

## Built-in helpers

Dummy JSON uses custom Handlebars helpers to generate the random data. Handlebars helpers are functions that are called whenever an expression is encountered in a template, such as `{{firstName}}`. You can learn how to write your own helpers in the section: [Writing your own helpers](#writing-your-own-helpers).

### Repeat

`{{#repeat count [comma=true]}} ... {{/repeat}}`

* `count: number` The number of times to repeat the content (required)
* `comma?: boolean` Add or remove the separating comma between blocks of content (optional, default is true)

`{{#repeat min=number max=number [comma=true]}} ... {{/repeat}}`

* `min: number` Minimum range for the random repeat count (required)
* `max: number` Maximum range for the random repeat count (required)
* `comma?: boolean` Add or remove the separating comma between blocks of content (optional, default is true)

There are two ways in which this helper can be used. Both repeat blocks of content, similar to Handlebars' built-in `each`, and can be used anywhere in your template, not just inside arrays. It automatically adds a comma between repeated blocks unless specified.

The first way it can be used is to repeat the block a fixed a number of times:

```js
// Repeat the block 3 times, automatically adding a comma between blocks
"messages": [
  {{#repeat 3}}
  "hello"
  {{/repeat}}
]

// Output
"messages": [
  "hello",
  "hello",
  "hello"
]
```

The second way it can be used is to repeat the block a random number of times:

```js
// Repeat the block a random number of times between 1 and 5
"messages": [
  {{#repeat min=1 max=5}}
  "hello"
  {{/repeat}}
];

// Output
"messages": [
  "hello",
  "hello"
];
```

You can omit the comma by using `comma=false`, for example:

```js
{{#repeat 3 comma=false}}hello{{/repeat}} // hellohellohello
```

You can get iteration position information inside the repeat block using the standard Handlebars variables `@index`, `@first`, `@last` and `@total`. Check out the helpers [Add](#add) and [Step](#step) to see how you can further modify the position values to create interesting indexes.

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

`{{int min max [format] [round=null]}}`

* `min: number` Minimum value (required)
* `max: number` Maximum value (required)
* `format?: string` Formatting string (optional, default is null)
* `round?: number` Rounds to the nearest multiple of the value (optional, default is no rounding)

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

`{{float min max [format] [round=null]}}`

* `min: number` Minimum value (required)
* `max: number` Maximum value (required)
* `format?: string` Formatting string (optional, default is null)
* `round?: number` Rounds to the nearest multiple of the value (optional, default is no rounding)

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

* `min: number` Minimum value (required)
* `max: number` Maximum value (required)
* `format?: string` Formatting string (optional, default is null)

Generates a random date between the two values. Both `min` and `max` can be represented by any string that the [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) method accepts.

By default the output uses [Date.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString). Alternatively the output can be formatted using a format string provided by fecha. For a complete list of formatting options see [https://github.com/taylorhakes/fecha](https://github.com/taylorhakes/fecha)

```js
// Generate a random date between midnight 2010-01-01 and midnight 2015-01-01
{{date '2010' '2015'}} // Thu Jan 26 2012 03:04:15 GMT+0000 (GMT)

// Generate a random date between more specific values
{{date '2015-06-01' '2015-06-30'}} // Mon Jun 22 2015 01:02:36 GMT+0100 (BST)

// Generate a random date between even more specific values (including time)
{{date '2015-06-01T09:00' '2015-06-30T17:30'}} // Sun Jun 07 2015 23:55:16 GMT+0100 (BST)

// Format the date using fecha
{{date '2010' '2015' 'DD/MM/YYYY'}} // 16/06/2012

// Format the date using a unix timestamp
{{date '2010' '2015' 'unix'}} // 1340417344
```

### Time

`{{time min max [format]}}`

* `min: number` Minimum value (required)
* `max: number` Maximum value (required)
* `format?: string` Formatting string (optional, default is null)

This is a shorthand helper for generating the time portion of a date, without needing to put the full date into the min and max values. Both `min` and `max` can be represented by any string in the 24h format `HH:mm:ss`, for example `17:48:34`, or if you want to ignore seconds: `17:48`

By default the output uses `HH:mm`. Alternatively the output can be formatted using a format string provided by fecha. For a complete list of formatting options see [https://github.com/taylorhakes/fecha](https://github.com/taylorhakes/fecha)

```js
// Generate a random time
{{time '09:00' '17:30'}} // 14:08

// Format the time using fecha
{{time '09:00' '17:30' 'h:mm a'}} // 2:08 pm
```

### Random item

`{{random ...items}}`

* `items: string | number` One or more parameters from which to pick a random item (required)

Picks a random item from the given parameters. This is a convenient way to create small, inline random lists of your own. For more lengthy lists or ones you wish to reuse see the section on [Helpers that pick a random item from an array](#helpers-that-pick-a-random-item-from-an-array).

```js
// Randomly pick one of the provided strings
{{random 'North' 'South' 'East' 'West'}} // South

// You can also provide numbers
{{random 50 100 150 200}} // 150
```

### Boolean

`{{boolean}}`

Generates a random `true` or `false` value.

### Title

`{{title}}`

Generates a random title prefix, from a predefined list, such as "Mr", "Mrs", "Dr", etc.

### First name

`{{firstName}}`

Generates a random first name, from a predefined list. This helper is kept in sync with other name-related helpers, such as username and email - see the section on [Synchronized helpers](#a-note-on-synchronized-helpers) for more information.

### Last name

`{{lastName}}`

Generates a random last name, from a predefined list. This helper is kept in sync with other name-related helpers, such as username and email - see the section on [Synchronized helpers](#a-note-on-synchronized-helpers) for more information.

### Company

`{{company}}`

Generates a random company name, from a predefined list. This helper is kept in sync with the email and domain helpers, such as username and email - see the section on [Synchronized helpers](#a-note-on-synchronized-helpers) for more information.

### Domain

`{{domain}}`

Generates a random domain name in the format "domain.tld", from a predefined list. This helper is kept in sync with the company and email helpers - see the section on [Synchronized helpers](#a-note-on-synchronized-helpers) for more information.

### TLD

`{{tld}}`

Generates a random top-level domain name, from a predefined list. This helper is kept in sync with the email helper - see the section on [Synchronized helpers](#a-note-on-synchronized-helpers) for more information.

### Email

`{{email}}`

Generates a random email address. This helper is kept in sync with other name-related helpers, such as username and email - see the section on [Synchronized helpers](#a-note-on-synchronized-helpers) for more information.

### Street

`{{street}}`

Generates a random street name, from a predefined list.

### City

`{{city}}`

Generates a random city name, from a predefined list.

### Country

`{{country}}`

Generates a random country name, from a predefined list based on [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1). This helper is kept in sync with the country code helper - see the section on [Synchronized helpers](#a-note-on-synchronized-helpers) for more information.

If you want to export the entire list then you can use the following snippet in your template:

```js
"countries": [
  {{#each countries}}
  "{{this}}"
  {{/each}}
]
```

### Country code

`{{countryCode}}`

Generates a random 2-character country code, from a predefined list based on [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1). This helper is kept in sync with the country helper - see the section on [Synchronized helpers](#a-note-on-synchronized-helpers) for more information.

If you want to export the entire list then you can use the following snippet in your template:

```js
"countryCodes": [
  {{#each countryCodes}}
  "{{this}}"
  {{/each}}
]
```
### Zipcode

`{{zipcode}}`

Generates a random US-style 5 digit zipcode.

### Postcode

`{{postcode}}`

Generates a random UK-style postcode in the format `AB9 9CD`.

### Latitude

`{{lat}}`

Generates a random latitude from -90 to +90, to 6 decimal places (roughly 10cm of precision).

### Longitude

`{{long}}`

Generates a random longitude from -180 to +180, to 6 decimal places (roughly 10cm of precision).

### Phone number

`{{phone [format]}}`

* `format?: string` Formatting string (optional, default is `xxx-xxx-xxxx`)

Generates a random phone number in the format `xxx-xxx-xxxx`, for example "123-456-7890". To use a different format pass a string to the `format` parameter containing a series of lowercase "x" characters for each random integer.

```js
// Generate a random phone number in the default format
{{phone}} // 445-295-1044

// Generate a random phone number with a custom format
{{phone "+64 (x) xxx xxxx"}} // +64 (5) 883 4711
```

### Color

`{{color}}`

Generates a random CSS color name from a predefined list, such as "forestgreen", "black", etc.

### Hex color

`{{hexColor [websafe=false] [withHash=true]}}`

* `websafe?: boolean` Generates a websafe color if true (optional, default is false)
* `withHash?: boolean` Whether the color has a leading hash symbol (optional, default is true)

Generates a random hexadecimal color value with an optional leading hash symbol.

```js
// Generates a hex color with a leading hash symbol
{{hexColor}} // #34D92C

// Generates a websafe hex color
{{hexColor websafe=true}} // #33CC99

// Generates a hex color without a leading hash symbol
{{hexColor withHash=false}} // 34D92C
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

### Character

`{{char charset}}`

* `charset: string` String of characters to pick from (required)

Picks a single character from the given character set.

```js
// Randomly pick one of the characters, in this case to generate a grade
{{char "ABCDEF"}} // B

// Generates a random currency symbol
{{char "$€£¥"}} // €
```

### Lorem ipsum

`{{lorem [wordCount]}}`

* `wordcount?: number` Number of words to generate (optional, default is 25)

`{{lorem min=number max=number}}`

* `min: number` Minimum range for the random word count (required)
* `max: number` Maximum range for the random word count (required)

There are two ways this helper can be used. Both generate random sentences of lorem ipsum text with occasional punctuation (commas and periods/full-stops).

```js
// Generates 25 words of lorem ipsum
{{lorem}} // Amet vel aliquam laoreet accumsan adipiscing velit... (etc)

// Generates 5 words of lorem ipsum
{{lorem 5}} // Orci nisi laoreet maximus dictum.

// Generates a random number of words between 10 and 20
{{lorem min=10 max=20}} // Felis velit aliquam aliquet sollicitudin consequat... (etc)
```

### Lowercase

`{{lowercase (helper)}}`

* `helper` Any other helper that returns a string (required)

Converts the output of any string-based helper to lowercase. This uses the Handlebars' [subexpression syntax](https://handlebarsjs.com/guide/expressions.html#subexpressions).

```js
// Change firstName to lowercase
{{lowercase (firstName)}} // ivan

// Change city to lowercase
{{lowercase (city)}} // boston
```

### Uppercase

`{{uppercase (helper)}}`

* `helper` Any other helper that returns a string (required)

Converts the output of any string-based helper to uppercase. This uses the Handlebars' [subexpression syntax](https://handlebarsjs.com/guide/expressions.html#subexpressions).

```js
// Change firstName to uppercase
{{uppercase (firstName)}} // IVAN

// Change city to uppercase
{{uppercase (city)}} // BOSTON
```

### Add

`{{add number1 number2}}`

* `number1: number` First number to add (required)
* `number2: number` Second number to add (required)

Adds the two numbers together. This can be useful in creating 1-based indexes inside repeat blocks using the `@index` variable (which is normally zero-based).

```js
// The built-in @index variable is zero-based, but we can add 1 to it
"images": [
  {{#repeat 3}}
  "image{{add @index 1}}.jpg"
  {{/repeat}}
]

// Output
"images": [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg"
]
```

### Step

`{{step increment}}`

* `increment: number` How much to increment the generated index on each iteration (required)

Creates a numeric step inside a repeat block that is a multiple of the index. (Note: this uses the `@index` variable internally and so can only be used inside `{{#repeat}}` and `{{#each}}` blocks).

```js
// Increment the image index by 10 each time
"images": [
  {{#repeat 3}}
  "image{{step 10}}.jpg"
  {{/repeat}}
]

// Output
"images": [
  "image0.jpg",
  "image10.jpg",
  "image20.jpg"
]
```

You can use this in conjunction with the [Add](#add) helper and [subexpression syntax](https://handlebarsjs.com/guide/expressions.html#subexpressions) to create indexes that start at higher values:

```js
// Increment the image index by 10 each time, starting at 1000
"images": [
  {{#repeat 3}}
  "image{{add (step 10) 1000}}.jpg"
  {{/repeat}}
]

// Output
"images": [
  "image1000.jpg",
  "image1010.jpg",
  "image1020.jpg"
]
```

## A note on synchronized helpers

Several helpers, such as name and email, are linked together in order to synchronize their values. This helps gives the random data some continuity. Synchronization happens automatically and doesn't require any additional work, for example:

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
"email": "{{email}}"          // grace.chapman@westgate.org (NOTE: sync is reset here)
"firstName": "{{firstName}}", // Grace
"lastName": "{{lastName}}",   // Chapman
```

The following helpers synchronize their values:

* `firstName`, `lastName`, `username`, `company`, `domain`, `tld`, `email`
* `country`, `countryCode`

## Writing your own helpers

To write your own helpers you need to create an object map of helper methods and pass it to the `options` param of `dummyjson.parse()`, for example:

```js
const myHelpers = {
  direction() {
    // We use dummyjson's random() method to ensure the seeded random number generator is used
    return dummyjson.utils.random() > 0.5 ? 'left' : 'right';
  }
};
const template = '{{direction}}';
const result = dummyjson.parse(template, { helpers: myHelpers }); // Returns "left"
```

Your own helpers will be mixed with the built-in helpers, allowing you to use both in your template.

The helpers use the same syntax as regular Handlebars helpers, but instead of registering them with `Handlebars.registerHelper()` you pass them to `dummyjson.parse()`. For more information on writing helpers see the [Handlebars documentation](https://handlebarsjs.com/guide/block-helpers.html).

Note: when generating data using random numbers you should always use the functions from the `dummyjson.utils` module. This ensures you're using the seeded random number generator and means your results will be repeatable if you ever decide to use a seed. See the section on [Seeded random data](#seeded-random-data) for more information, and the [API](#api) for complete list of methods available in `dummyjson.utils`.

### Helpers that pick a random item from an array

One of the most common types of helper is one that picks a random item from an array. If you are only dealing with a small number of items and don't need to reuse the helper consider using the inline [Random item](#random-item) helper, like so:

```js
{{random 'North' 'South' 'East' 'West'}} // Will randomly pick on of the four values
```

However if you are dealing with a large array or don't want to repeat it throughout the template then it's better to write your own helper. You can use the following example as a basis for you own:

```js
const myHelpers = {
  direction() {
    // Use randomArrayItem() to ensure the seeded random number generator is used
    return dummyjson.utils.randomArrayItem(['North', 'South', 'East', 'West']);
  }
};
const template = '{{direction}}';
const result = dummyjson.parse(template, { helpers: myHelpers }); // Returns "East"
```

## Replacing default mock data

If you want to use a different set of names, addresses, colors and so on, then you can override the built-in data using the `mockdata` option. Here's is an example with a complete list of built-in arrays you can replace:

```js
const myMockdata = {
  // These are all the possible arrays you can replace:
  firstNames: ['Bob', 'Jane', 'Carl', 'Joan'],
  lastNames: ['Smith', 'Jones', 'Wallis', 'Gilmore'],
  companies: ['Apple', 'Microsoft'],
  tlds: ['etc'],
  streets: ['etc'],
  cities: ['etc'],
  countries: ['etc'],
  countryCodes: ['etc'],
  colors: ['etc'],
};
const result = dummyjson.parse(template, { mockdata: myMockdata });
```

## Seeded random data

By default dummyjson generates different results every time it's run. If you need reproducible dummy data then you can set a global seed for the pseudo random number generator:

```js
// Set the global seed, can be any string value
dummyjson.seed = 'helloworld';

// Every subsequent call to parse() will now generate the same output
const result = dummyjson.parse(string);
```

Alternatively you can set a one-time seed for a specific `dummyjson.parse()` call:

```js
const result = dummyjson.parse(string, { seed: 'abc123' });
```

Note: a one-time seed will not overwrite the global `dummyjson.seed`, meaning subsequent calls to `parse()` without a seed will use the original `dummyjson.seed` value.

### Ensuring your own helpers use the seed

To ensure your own helpers generate reproducible data you must use the functions from the `dummyjson.utils` module whenever you want a random value. See the [API](#api) section for a complete list of functions.

```js
const myHelpers = {
  temperature() {
    // Using randomInt() guarantees reproducible results when using a seed
    return dummyjson.utils.randomInt(0, 100) + '°C';
  }
};
```

## Advanced usage

### Replacing built-in helpers

You can replace any of the built-in helpers by simply creating your own with the same name:

```js
const myHelpers = {
  // This version of {{postcode}} will now be used instead of the built-in one
  postcode() {
    return 'helloworld';
  }
};
const result = dummyjson.parse(template, { helpers: myHelpers });
```

Note: If you replace any of the synchronized helpers then you will lose the syncing functionality. If you want to use a different set of names, addresses, etc, then use the technique described in [Replacing default mock data](#replacing-default-mock-data).

### Using other static data

The `mockdata` option can also be used to insert static data for use in your template:

```js
const myMockdata = {
  copyright: 'Copyright Myself 2015'
};
const template = '{{copyright}}';
const result = dummyjson.parse(template, { mockdata: myMockdata }); // Returns "Copyright Myself 2015"
```

Or arrays which you can loop over using Handlebar's [each helper](https://handlebarsjs.com/guide/builtin-helpers.html#each):

```js
const myMockdata = {
  animals: ['fox', 'badger', 'crow']
};
const template = '{{#each animals}}{{this}},{{/each}}';
const result = dummyjson.parse(template, { mockdata: myMockdata }); // Returns "fox,badger,crow,"
```

### Using built-in helpers inside your own helpers

All the built-in helpers are available for you to use from within your own helpers. They can be found on the `dummyjson.helpers` object. Here's an example of using two existing helpers to make a new one:

```js
const myHelpers = {
  fullname(options) {
    // You must always forward the Handlerbars `options` argument to built-in helpers
    return dummyjson.helpers.firstName(options) + ' ' + dummyjson.helpers.lastName(options);
  }
};
const template = '{{fullname}}';
const result = dummyjson.parse(template, { helpers: myHelpers }); // Returns "Ivan Young"
```

As mentioned in the comment above you must always forward the `options` argument to built-in helpers. The `options` argument is automatically given to all helpers by Handlebars, and is always passed as the last argument. See the [Handlebars documentation](https://handlebarsjs.com/guide/block-helpers.html) for more information.

### Using your own partials

You can use [Handlebars partials](https://handlebarsjs.com/guide/partials.html) to encapsulate content into a reusable blocks. Partials are passed via the `options` param of `dummyjson.parse()`.

```js
const myPartials = {
  user: `{
    "id": {{@index}},
    "firstName": "{{firstName}}",
    "lastName": "{{lastName}}",
    "email": "{{email}}"
  }`
};

const template = `{
  "users": [
    {{#repeat 3}}
    {{> user}}
    {{/repeat}}
  ]
}`;

const result = dummyjson.parse(template, { partials: myPartials });
```

## API

#### Parse

`dummyjson.parse(template: string, options: ParseOptions): string`

* `template: string` Handlebars template string
* `options: ParseOptions` Options object containing any of the following properties:
  * `helpers: {}` Object map of custom helper functions (see [Writing your own helpers](#writing-your-own-helpers))
  * `mockdata: {}` Object map of mockdata (see [Replacing default mock data](#replacing-default-mock-data))
  * `partials: {}` Object map of custom partials (see [Using your own partials](#using-your-own-partials))
  * `seed: string` Seed for the random number generator (see [Seeded random data](#seeded-random-data))

#### Utils

`dummyjson.utils`

  * `.random()` Returns a random float in the range [0, 1). Use this instead of `Math.random()`
  * `.randomInt(min: number, max: number): number` Returns a random integer in the range [min, max]
  * `.randomFloat(min: number, max: number): number` Returns a random float in the range [min, max)
  * `.randomBoolean(): boolean` Returns a random boolean
  * `.randomDate(min: number, max: number): Date` Returns a random date between min/max millisecond values
  * `.randomArrayItem(array: any[]): any` Returns a random item from the given `array`
  * `.randomChar(charset: string): string` Returns a random char from the given `charset`
