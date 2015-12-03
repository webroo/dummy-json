var os = require('os');
var Handlebars = require('handlebars');

Handlebars.registerHelper('dateFormatter', function (date) {
  var isoString = date.toISOString();
  return isoString.substring(0, isoString.indexOf('T'));
});

Handlebars.registerHelper('timeFormatter', function (date) {
  var isoString = date.toISOString();
  return isoString.substr(isoString.indexOf('T') + 1, 5);
});

// Used to keep a reference to the current people arrays when parsing
var maxPersonIndex;

// We try to keep names, emails and companies in sync, so that when using them
// together in a loop they all relate to each other. To do this we link them all
// to an index which is incremented only when the same type of property is
// accessed twice in a row.
var personIndex = 0;
var usedPersonAttrs = [];

var checkPersonIndex = function (type, rootData) {
  // In order to sync the people data we must loop over the smallest array
  maxPersonIndex = Math.min(
    rootData.firstNames.length,
    rootData.lastNames.length,
    rootData.companies.length
  );

  if (usedPersonAttrs.indexOf(type) !== -1) {
    personIndex = (personIndex + 1) % maxPersonIndex; // Loop index
    usedPersonAttrs = [];
  }
  usedPersonAttrs.push(type);
};

var randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomFloat = function (min, max) {
  return Math.random() * (max - min) + min;
};

var randomBoolean = function () {
  return Math.random() > 0.5;
};

var zeroPad = function (num, len) {
  num = num + '';
  while (num.length < len) {
    num = '0' + num;
  }
  return num;
};

var uniqueIndex = 0;

var helpers = {
  repeat: function (min, max, options) {
    // This is a lightweight copy of the built-in #each method
    var ret = '';
    var count = 0;
    var data;
    var i;

    if (arguments.length === 3) {
      // If given two numbers then pick a random one between the two
      count = randomInt(min, max);
    } else if (arguments.length === 2) {
      // If given one number then just use it as a fixed repeat count
      options = max;
      count = min;
    } else {
      throw new Error('Must pass a number to #repeat');
    }

    // Create a shallow copy of data so we can add variables without modifying the original
    data = Handlebars.Utils.extend({}, options.data);

    for (i = 0; i < count; i++) {
      // You can access these in your template using @index, @count, etc
      data.index = i;
      data.count = count;
      data.first = i === 0;
      data.last = i === count - 1;

      // By using 'this' as the context the repeat block won't create a new scope, just reuse it
      ret = ret + options.fn(this, {data: data});

      // Trim whitespace left by handlebars and add commas between items
      ret = ret.trimRight();
      if (i < count - 1) {
        ret += ',';
      }
      ret += os.EOL;
    }

    return ret;
  },

  number: function (min, max, options) {
    // If only one number is provided then generate from 0 to that number
    if (arguments.length === 2) {
      options = max;
      max = min;
      min = 0;
    }

    // Handlebars helpers don't accept numbers with decimal places as arguments
    // so floats must be passed as strings
    var isFloat = false;
    if (typeof min === 'string') {
      isFloat = true;
      min = parseFloat(min);
      max = parseFloat(max);
    }

    if (isFloat) {
      return randomFloat(min, max);
    } else {
      var n = randomInt(min, max);
      // Integers can optionally be padded with leading zeros
      return options.hash.pad ? zeroPad(n, max.toString().length) : n;
    }
  },

  boolean: function (options) {
    return randomBoolean().toString();
  },

  uniqueIndex: function (options) {
    return uniqueIndex++;
  },

  firstName: function (options) {
    checkPersonIndex('firstName', options.data.root);
    return options.data.root.firstNames[personIndex];
  },

  lastName: function (options) {
    checkPersonIndex('lastName', options.data.root);
    return options.data.root.lastNames[personIndex];
  },

  company: function (options) {
    checkPersonIndex('company', options.data.root);
    return options.data.root.companies[personIndex];
  },

  email: function (options) {
    checkPersonIndex('email', options.data.root);
    return options.data.root.firstNames[personIndex].toLowerCase() +
      '.' + options.data.root.lastNames[personIndex].toLowerCase() +
      '@' + options.data.root.companies[personIndex].toLowerCase() + '.com';
  },

  date: function (start, end, options) {
    // If dates are provided then use them, otherwise fall back to defaults
    if (arguments.length === 3) {
      start = new Date(start).getTime();
      end = new Date(end).getTime();
    } else {
      start = new Date('1900-01-01').getTime();
      end = new Date('1999-12-31').getTime();
    }
    var newDate = new Date(start + Math.random() * (end - start));
    return Handlebars.helpers.dateFormatter(newDate);
  },

  time: function (start, end, options) {
    // If times are provided then use them, otherwise fall back to defaults
    if (arguments.length === 3) {
      start = new Date('2000T' + start).getTime();
      end = new Date('2000T' + end).getTime();
    } else {
      start = new Date('2000T00:00').getTime();
      end = new Date('2000T23:59').getTime();
    }
    var newTime = new Date(start + Math.random() * (end - start));
    return Handlebars.helpers.timeFormatter(newTime);
  }
};

module.exports = helpers;
