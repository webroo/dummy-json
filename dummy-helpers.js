var os = require('os');
var Handlebars = require('handlebars');
var dummyUtils = require('./dummy-utils');

// Keep track of the last generated names and company, for use in email
var lastUsedFirstName;
var lastUsedLastName;
var lastUsedCompany;

function getFirstName (firstNames) {
  lastUsedFirstName = firstNames[dummyUtils.randomInt(0, firstNames.length - 1)];
  return lastUsedFirstName;
}

function getLastName (lastNames) {
  lastUsedLastName = lastNames[dummyUtils.randomInt(0, lastNames.length - 1)];
  return lastUsedLastName;
}

function getCompany (companies) {
  lastUsedCompany = companies[dummyUtils.randomInt(0, companies.length - 1)];
  return lastUsedCompany;
}

function getTld (tlds) {
  return tlds[dummyUtils.randomInt(0, tlds.length - 1)];
}

var helpers = {
  repeat: function (min, max, options) {
    // This is a lightweight copy of the built-in #each method
    var ret = '';
    var count = 0;
    var data;
    var i;

    if (arguments.length === 3) {
      // If given two numbers then pick a random one between the two
      count = dummyUtils.randomInt(min, max);
    } else if (arguments.length === 2) {
      // If given one number then just use it as a fixed repeat count
      options = max;
      count = min;
    } else {
      throw new Error('The repeat helper requires an integer value');
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

  int: function (min, max, options) {
    var ret;

    if (arguments.length >= 4) {
      throw new Error('The int helper only accepts a maximum of 2 values');
    } else if (arguments.length === 2) {
      // If only one number is provided then generate from 0 to that number
      options = max;
      max = min;
      min = 0;
    } else if (arguments.length === 1) {
      // If no numbers are sent through then use some default values
      options = min;
      min = 0;
      max = 9007199254740991; // Number.MAX_SAFE_INTEGER as defined in ES6
    }

    ret = dummyUtils.randomInt(min, max);

    // Integers can be rounded to the nearest multiple
    if (typeof options.hash.round === 'number') {
      ret = dummyUtils.nearestMultiple(ret, options.hash.round);
    }

    // Integers can be padded with leading zeros
    if (options.hash.zeropad === true) {
      ret = dummyUtils.zeroPad(ret, max.toString().length);
    }

    return ret;
  },

  float: function (min, max, options) {
    var ret;

    if (arguments.length >= 4) {
      throw new Error('The float helper only accepts a maximum of 2 values');
    } else if (arguments.length === 2) {
      // If only one number is provided then generate from 0 to that number
      options = max;
      max = min;
      min = 0;
    } else if (arguments.length === 1) {
      // If no numbers are sent through then use some default values
      options = min;
      min = 0;
      max = 1;
    }

    ret = dummyUtils.randomFloat(min, max);

    // Floats can be rounded to decimal places
    if (typeof options.hash.decimals === 'number') {
      ret = ret.toFixed(options.hash.decimals);
    }

    return ret;
  },

  boolean: function (options) {
    return dummyUtils.randomBoolean().toString();
  },

  firstName: function (options) {
    return getFirstName(options.data.root.firstNames);
  },

  lastName: function (options) {
    return getLastName(options.data.root.lastNames);
  },

  company: function (options) {
    return getCompany(options.data.root.companies);
  },

  tld: function (options) {
    return getTld(options.data.root.tlds);
  },

  email: function (options) {
    // Use the last generated names and company, or generate new ones
    var firstName = lastUsedFirstName || getFirstName(options.data.root.firstNames);
    var lastName = lastUsedLastName || getLastName(options.data.root.lastNames);
    var company = lastUsedCompany || getCompany(options.data.root.companies);

    // Clear the stored names and company so new ones are generated if this helper is called again
    lastUsedFirstName = null;
    lastUsedLastName = null;
    lastUsedCompany = null;

    return firstName.toLowerCase() +
      '.' + lastName.toLowerCase() +
      '@' + company.toLowerCase() +
      '.' + getTld(options.data.root.tlds);
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
    return new Date(start + Math.random() * (end - start));
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
    return new Date(start + Math.random() * (end - start));
  },

  dateFormatter: function (date) {
    return date.toDateString();
  },

  timeFormatter: function (date) {
    return date.toTimeString();
  }
};

module.exports = helpers;
