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

Handlebars.registerHelper('dateFormatter', function (date) {
  var isoString = date.toISOString();
  return isoString.substring(0, isoString.indexOf('T'));
});

Handlebars.registerHelper('timeFormatter', function (date) {
  var isoString = date.toISOString();
  return isoString.substr(isoString.indexOf('T') + 1, 5);
});

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
      return dummyUtils.randomFloat(min, max);
    } else {
      var n = dummyUtils.randomInt(min, max);
      // Integers can optionally be padded with leading zeros
      return options.hash.pad ? dummyUtils.zeroPad(n, max.toString().length) : n;
    }
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

  email: function (options) {
    // Use the last generated names and company, or generate new ones
    var firstName = lastUsedFirstName || getFirstName(options.data.root.firstNames);
    var lastName = lastUsedLastName || getLastName(options.data.root.lastNames);
    var company = lastUsedCompany || getCompany(options.data.root.companies);
    return firstName.toLowerCase() +
      '.' + lastName.toLowerCase() +
      '@' + company.toLowerCase() +
      '.com';
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
