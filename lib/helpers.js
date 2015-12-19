var os = require('os');
var Handlebars = require('handlebars');
var numbro = require('numbro');
var fecha = require('fecha');
var utils = require('./utils');

function getNumber (type, min, max, format, options) {
  var ret;

  // Juggle the arguments if the user didn't supply a format string
  if (!options) {
    options = format;
    format = null;
  }

  if (type === 'int') {
    ret = utils.randomInt(min, max);
  } else if (type === 'float') {
    ret = utils.randomFloat(min, max);
  }

  if (typeof options.hash.round === 'number') {
    ret = utils.nearestMultiple(ret, options.hash.round);
  }

  if (format) {
    ret = numbro(ret).format(format);
  }

  return ret;
}

function getDate (type, min, max, format, options) {
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

  ret = utils.randomDate(min, max);

  if (format === 'unix') {
    ret = Math.floor(ret.getTime() / 1000);
  } else if (format) {
    ret = fecha.format(ret, format);
  } else if (type === 'time') {
    // Time has a default format if one is not specified
    ret = fecha.format(ret, 'HH:mm');
  }

  return ret;
}

function getFirstName (options) {
  // The value is cached so that other helpers can use it. Each helper is allowed to use the
  // cached value just once.
  var cache = options.data.root.__cache;
  var first = utils.randomFromArray(options.data.root.firstNames);
  cache.firstName = first;
  cache.username_firstName = first;
  cache.email_firstName = first;
  return first;
}

function getLastName (options) {
  // The value is cached so that other helpers can use it. Each helper is allowed to use the
  // cached value just once.
  var cache = options.data.root.__cache;
  var last = utils.randomFromArray(options.data.root.lastNames);
  cache.lastName = last;
  cache.username_lastName = last;
  cache.email_lastName = last;
  return last;
}

function getCompany (options) {
  // The value is cached so that other helpers can use it. Each helper is allowed to use the
  // cached value just once.
  var cache = options.data.root.__cache;
  var company = utils.randomFromArray(options.data.root.companies);
  cache.company = company;
  cache.domain_company = company;
  cache.email_company = company;
  return company;
}

function getTld (options) {
  // The value is cached so that other helpers can use it. Each helper is allowed to use the
  // cached value just once.
  var cache = options.data.root.__cache;
  var tld = utils.randomFromArray(options.data.root.tlds);
  cache.tld = tld;
  cache.domain_tld = tld;
  cache.email_tld = tld;
  return tld;
}

var helpers = {
  repeat: function (min, max, options) {
    var ret = '';
    var total = 0;
    var data;
    var i;

    if (arguments.length === 3) {
      // If given two numbers then pick a random one between the two
      total = utils.randomInt(min, max);
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
      // Clear the linked values on each iteration so a new set of names/companies is generated
      options.data.root.__cache = {};

      // You can access these in your template using @index, @total, @first, @last
      data.index = i;
      data.total = total;
      data.first = i === 0;
      data.last = i === total - 1;

      // By using 'this' as the context the repeat block will inherit the current scope
      ret = ret + options.fn(this, {data: data});

      if (options.hash.comma !== false) {
        // Trim any whitespace left by handlebars and add a comma if it doesn't already exist,
        // also trim any trailing comma that might be at the end of the loop
        ret = ret.trimRight();
        if (i < total - 1 && ret.charAt(ret.length - 1) !== ',') {
          ret += ',';
        } else if (i === total - 1 && ret.charAt(ret.length - 1) === ',') {
          ret = ret.slice(0, -1);
        }
        ret += os.EOL;
      }
    }

    return ret;
  },

  int: function (min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The int helper requires two numeric params');
    }
    return getNumber('int', min, max, format, options);
  },

  float: function (min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The float helper requires two numeric params');
    }
    return getNumber('float', min, max, format, options);
  },

  boolean: function () {
    return utils.randomBoolean().toString();
  },

  date: function (min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The date helper requires two string params');
    }
    return getDate('date', min, max, format, options);
  },

  time: function (min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The time helper requires two string params');
    }
    return getDate('time', min, max, format, options);
  },

  title: function (options) {
    return utils.randomFromArray(options.data.root.titles);
  },

  firstName: function (options) {
    // Try to use the cached values first, otherwise generate a new value. The cached values are
    // then cleared so they can't be used again.
    var cache = options.data.root.__cache;
    var first = cache.firstName || getFirstName(options);
    cache.firstName = null;
    return first;
  },

  lastName: function (options) {
    // Try to use the cached values first, otherwise generate a new value. The cached values are
    // then cleared so they can't be used again.
    var cache = options.data.root.__cache;
    var last = cache.lastName || getLastName(options);
    cache.lastName = null;
    return last;
  },

  username: function (options) {
    // Try to use the cached values first, otherwise generate a new value. The cached values are
    // then cleared so they can't be used again.
    var cache = options.data.root.__cache;
    var first = cache.username_firstName || getFirstName(options);
    var last = cache.username_lastName || getLastName(options);
    cache.username_firstName = null;
    cache.username_lastName = null;
    return first.substr(0, 1).toLowerCase() + last.toLowerCase();
  },

  company: function (options) {
    // Try to use the cached values first, otherwise generate a new value. The cached values are
    // then cleared so they can't be used again.
    var cache = options.data.root.__cache;
    var company = cache.company || getCompany(options);
    cache.company = null;
    return company;
  },

  tld: function (options) {
    // Try to use the cached values first, otherwise generate a new value. The cached values are
    // then cleared so they can't be used again.
    var cache = options.data.root.__cache;
    var tld = cache.tld || getTld(options);
    cache.tld = null;
    return tld;
  },

  domain: function (options) {
    // Try to use the cached values first, otherwise generate a new value. The cached values are
    // then cleared so they can't be used again.
    var cache = options.data.root.__cache;
    var company = cache.domain_company || getCompany(options);
    var tld = cache.domain_tld || getTld(options);
    cache.domain_company = null;
    cache.domain_tld = null;
    return company.toLowerCase() + '.' + tld;
  },

  email: function (options) {
    // Try to use the cached values first, otherwise generate a new value. The cached values are
    // then cleared so they can't be used again.
    var cache = options.data.root.__cache;
    var first = cache.email_firstName || getFirstName(options);
    var last = cache.email_lastName || getLastName(options);
    var company = cache.email_company || getCompany(options);
    var tld = cache.email_tld || getTld(options);
    cache.email_firstName = null;
    cache.email_lastName = null;
    cache.email_company = null;
    cache.email_tld = null;
    return first.toLowerCase() + '.' + last.toLowerCase() +
      '@' + company.toLowerCase() + '.' + tld;
  },

  street: function (options) {
    return utils.randomFromArray(options.data.root.streets);
  },

  city: function (options) {
    return utils.randomFromArray(options.data.root.cities);
  }
};

module.exports = helpers;
