var os = require('os');
var Handlebars = require('handlebars');
var numbro = require('numbro');
var fecha = require('fecha');
var dummyUtils = require('./dummy-utils');

// Keep track of the last generated names and company, for use in email
// TODO: Make the helpers stateless
var lastUsedFirstName;
var lastUsedLastName;
var lastUsedCompany;

function numberHelper (type, min, max, format, options) {
  var ret;

  // Juggle the arguments if the user didn't supply a format string
  if (!options) {
    options = format;
    format = null;
  }

  if (type === 'int') {
    ret = dummyUtils.randomInt(min, max);
  } else if (type === 'float') {
    ret = dummyUtils.randomFloat(min, max);
  }

  if (typeof options.hash.round === 'number') {
    ret = dummyUtils.nearestMultiple(ret, options.hash.round);
  }

  if (format) {
    ret = numbro(ret).format(format);
  }

  return ret;
}

function dateHelper (type, min, max, format, options) {
  var ret;

  // Juggle the arguments if the user didn't supply a format string
  if (!options) {
    options = format;
    format = null;
  }

  if (type === 'date') {
    min = Date.parse(min);
    max = Date.parse(max);
  } else if (type === 'time') {
    min = Date.parse('1970-01-01T' + min);
    max = Date.parse('1970-01-01T' + max);
  }

  ret = dummyUtils.randomDate(min, max);

  if (format === 'unix') {
    ret = Math.floor(ret.getTime() / 1000);
  } else if (format) {
    ret = fecha.format(ret, format);
  }

  return ret;
}

var helpers = {
  repeat: function (min, max, options) {
    var ret = '';
    var total = 0;
    var data;
    var i;

    if (arguments.length === 3) {
      // If given two numbers then pick a random one between the two
      total = dummyUtils.randomInt(min, max);
    } else if (arguments.length === 2) {
      // If given one number then just use it as a fixed repeat total
      options = max;
      total = min;
    } else {
      throw new Error('The repeat helper requires a numeric param');
    }

    // Create a shallow copy of data so we can add variables without modifying the original
    data = Handlebars.Utils.extend({}, options.data);

    for (i = 0; i < total; i++) {
      // You can access these in your template using @index, @total, @first, @last
      data.index = i;
      data.total = total;
      data.first = i === 0;
      data.last = i === total - 1;

      // By using 'this' as the context the repeat block will inherit the current scope
      ret = ret + options.fn(this, {data: data});

      // Trim any whitespace left by handlebars and add a comma
      ret = ret.trimRight();
      if (i < total - 1) {
        ret += ',';
      }
      ret += os.EOL;
    }

    return ret;
  },

  int: function (min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The int helper requires two numeric params');
    }

    return numberHelper('int', min, max, format, options);
  },

  float: function (min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The float helper requires two numeric params');
    }

    return numberHelper('float', min, max, format, options);
  },

  boolean: function (options) {
    return dummyUtils.randomBoolean().toString();
  },

  firstName: function (options) {
    // Cache the last used value so it can be used in the email helper
    lastUsedFirstName = options.data.root.firstNames[dummyUtils.randomInt(0, options.data.root.firstNames.length - 1)];
    return lastUsedFirstName;
  },

  lastName: function (options) {
    // Cache the last used value so it can be used in the email helper
    lastUsedLastName = options.data.root.lastNames[dummyUtils.randomInt(0, options.data.root.lastNames.length - 1)];
    return lastUsedLastName;
  },

  company: function (options) {
    // Cache the last used value so it can be used in the email helper
    lastUsedCompany = options.data.root.companies[dummyUtils.randomInt(0, options.data.root.companies.length - 1)];
    return lastUsedCompany;
  },

  tld: function (options) {
    return options.data.root.tlds[dummyUtils.randomInt(0, options.data.root.tlds.length - 1)];
  },

  email: function (options) {
    // Use the last generated names and company, or generate new ones
    var firstName = lastUsedFirstName || helpers.firstName(options);
    var lastName = lastUsedLastName || helpers.lastName(options);
    var company = lastUsedCompany || helpers.company(options);

    // Clear the stored names and company so new ones are generated if this helper is called again
    lastUsedFirstName = null;
    lastUsedLastName = null;
    lastUsedCompany = null;

    return firstName.toLowerCase() +
      '.' + lastName.toLowerCase() +
      '@' + company.toLowerCase() +
      '.' + helpers.tld(options);
  },

  date: function (min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The date helper requires two string params');
    }

    return dateHelper('date', min, max, format, options);
  },

  time: function (min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The time helper requires two string params');
    }

    return dateHelper('time', min, max, format, options);
  }
};

module.exports = helpers;
