var os = require('os');
var Handlebars = require('handlebars');
var numbro = require('numbro');
var fecha = require('fecha');
var utils = require('./utils');

// Generating int and floats is very similar so both use this function
function getNumber(type, min, max, format, options) {
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
    ret = Math.round(ret / options.hash.round) * options.hash.round;
  }

  if (format) {
    ret = numbro(ret).format(format);
  }

  return ret;
}

// Generating time and dates is very similar so both use this function
function getDate(type, min, max, format, options) {
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
    // We need to undo the timezone offset fix from utils.randomDate()
    ret = Math.floor((ret.getTime() - ret.getTimezoneOffset() * 60000) / 1000);
  } else if (format) {
    ret = fecha.format(ret, format);
  } else if (type === 'time') {
    // Time has a default format if one is not specified
    ret = fecha.format(ret, 'HH:mm');
  }

  return ret;
}

function getFirstName(options) {
  // The value is cached so that other helpers can use it.
  // Each helper is allowed to use the cached value just once.
  var cache = options.data.root.__cache;
  var ret = utils.randomArrayItem(options.data.root.firstNames);
  cache.firstName = ret;
  cache.username_firstName = ret;
  cache.email_firstName = ret;
  return ret;
}

function getLastName(options) {
  // The value is cached so that other helpers can use it.
  // Each helper is allowed to use the cached value just once.
  var cache = options.data.root.__cache;
  var ret = utils.randomArrayItem(options.data.root.lastNames);
  cache.lastName = ret;
  cache.username_lastName = ret;
  cache.email_lastName = ret;
  return ret;
}

function getCompany(options) {
  // The value is cached so that other helpers can use it.
  // Each helper is allowed to use the cached value just once.
  var cache = options.data.root.__cache;
  var ret = utils.randomArrayItem(options.data.root.companies);
  cache.company = ret;
  cache.domain_company = ret;
  cache.email_company = ret;
  return ret;
}

function getTld(options) {
  // The value is cached so that other helpers can use it.
  // Each helper is allowed to use the cached value just once.
  var cache = options.data.root.__cache;
  var tld = utils.randomArrayItem(options.data.root.tlds);
  cache.tld = tld;
  cache.domain_tld = tld;
  cache.email_tld = tld;
  return tld;
}

var helpers = {
  repeat: function(min, max, options) {
    var ret = '';
    var total = 0;
    var data;
    var i;
    var errorMsg = 'The repeat helper requires either a repeat count or min and max values, eg: {{#repeat 5}} or {{#repeat min=5 max=10}}';

    if (arguments.length === 3) {
      // If given two numbers then pick a random one between the two
      total = utils.randomInt(min, max);
    } else if (arguments.length === 2) {
      // If given one number then just use it as a fixed repeat total
      options = max;
      total = min;
    } else if (arguments.length === 1) {
      options = min;
      if (typeof options.hash.min === 'number' && typeof options.hash.max === 'number') {
        total = utils.randomInt(options.hash.min, options.hash.max);
      } else {
        throw new Error(errorMsg);
      }
    } else {
      throw new Error(errorMsg);
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
        // also trim any trailing commas that might be at the end of the loop
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

  int: function(min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The int helper requires two numeric params, eg: {{int 2 6}}');
    }
    return getNumber('int', min, max, format, options);
  },

  float: function(min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error('The float helper requires two numeric params, eg: {{float 5 8}}');
    }
    return getNumber('float', min, max, format, options);
  },

  boolean: function() {
    return utils.randomBoolean().toString();
  },

  date: function(min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error(`The date helper requires two string params, eg: {{date '2015-01-01' '2015-12-31'}}`);
    }
    return getDate('date', min, max, format, options);
  },

  time: function(min, max, format, options) {
    if (arguments.length !== 3 && arguments.length !== 4) {
      throw new Error(`The time helper requires two string params, eg: {{time '09:30' '14:00'}}`);
    }
    return getDate('time', min, max, format, options);
  },

  title: function(options) {
    return utils.randomArrayItem(options.data.root.titles);
  },

  firstName: function(options) {
    // Try to use the cached values first, otherwise generate a new value
    var cache = options.data.root.__cache;
    var ret = cache.firstName || getFirstName(options);

    // The cached values are cleared so they can't be used again
    cache.firstName = null;
    return ret;
  },

  lastName: function(options) {
    // Try to use the cached values first, otherwise generate a new value
    var cache = options.data.root.__cache;
    var ret = cache.lastName || getLastName(options);

    // The cached values are cleared so they can't be used again
    cache.lastName = null;
    return ret;
  },

  username: function(options) {
    // Try to use the cached values first, otherwise generate a new value
    var cache = options.data.root.__cache;
    var first = cache.username_firstName || getFirstName(options);
    var last = cache.username_lastName || getLastName(options);

    // The cached values are cleared so they can't be used again
    cache.username_firstName = null;
    cache.username_lastName = null;

    function sanitize(str) {
      return str.toLowerCase().replace(/\s/g, '');
    }

    return sanitize(first).substr(0, 1).toLowerCase() +
      sanitize(last).toLowerCase();
  },

  company: function(options) {
    // Try to use the cached values first, otherwise generate a new value
    var cache = options.data.root.__cache;
    var company = cache.company || getCompany(options);

    // The cached values are cleared so they can't be used again
    cache.company = null;
    return company;
  },

  tld: function(options) {
    // Try to use the cached values first, otherwise generate a new value
    var cache = options.data.root.__cache;
    var tld = cache.tld || getTld(options);

    // The cached values are cleared so they can't be used again
    cache.tld = null;
    return tld;
  },

  domain: function(options) {
    // Try to use the cached values first, otherwise generate a new value
    var cache = options.data.root.__cache;
    var company = cache.domain_company || getCompany(options);
    var tld = cache.domain_tld || getTld(options);

    // The cached values are cleared so they can't be used again
    cache.domain_company = null;
    cache.domain_tld = null;

    return company.toLowerCase() + '.' + tld;
  },

  email: function(options) {
    // Try to use the cached values first, otherwise generate a new value
    var cache = options.data.root.__cache;
    var first = cache.email_firstName || getFirstName(options);
    var last = cache.email_lastName || getLastName(options);
    var company = cache.email_company || getCompany(options);
    var tld = cache.email_tld || getTld(options);

    // The cached values are cleared so they can't be used again
    cache.email_firstName = null;
    cache.email_lastName = null;
    cache.email_company = null;
    cache.email_tld = null;

    function sanitize(str) {
      return str.toLowerCase().replace(/\s/g, '');
    }

    return sanitize(first) + '.' + sanitize(last) +
      '@' + sanitize(company) + '.' + tld;
  },

  street: function(options) {
    return utils.randomArrayItem(options.data.root.streets);
  },

  city: function(options) {
    return utils.randomArrayItem(options.data.root.cities);
  },

  country: function(options) {
    var ret;
    var rootData = options.data.root;
    var cache = rootData.__cache;

    // Try to use the cached values first, otherwise generate a new value
    if (cache.country) {
      ret = cache.country;
    } else {
      var pos = utils.randomInt(0, rootData.countries.length - 1);
      ret = rootData.countries[pos];
      cache.countryCode = rootData.countryCodes[pos];
    }

    // The cached values are cleared so they can't be used again
    cache.country = null;
    return ret;
  },

  countryCode: function(options) {
    var ret;
    var rootData = options.data.root;
    var cache = rootData.__cache;

    // Try to use the cached values first, otherwise generate a new value
    if (cache.countryCode) {
      ret = cache.countryCode;
    } else {
      var pos = utils.randomInt(0, rootData.countries.length - 1);
      ret = rootData.countryCodes[pos];
      cache.country = rootData.countries[pos];
    }

    // The cached values are cleared so they can't be used again
    cache.countryCode = null;
    return ret;
  },

  zipcode: function() {
    return ('0' + utils.randomInt(1000, 99999).toString()).slice(-5);
  },

  postcode: function() {
    return utils.randomChar() + utils.randomChar() + utils.randomInt(0, 9) + ' ' +
      utils.randomInt(0, 9) + utils.randomChar() + utils.randomChar();
  },

  lat: function(options) {
    return getNumber('float', -90, 90, '0.000000', options);
  },

  long: function(options) {
    return getNumber('float', -180, 180, '0.000000', options);
  },

  phone: function(format) {
    // Provide a default format if one is not given
    format = (typeof format === 'string') ? format : 'xxx-xxx-xxxx';
    return format.replace(/x/g, function() {
      return utils.randomInt(0, 9);
    });
  },

  guid: function() {
    var ret = '';
    var i = 0;
    var mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    var c, r, v;

    while (i++ < 36) {
      c = mask[i - 1];
      r = utils.random() * 16 | 0;
      v = (c === 'x') ? r : (r & 0x3 | 0x8);
      ret += (c === '-' || c === '4') ? c : v.toString(16);
    }

    return ret;
  },

  ipv4: function() {
    return utils.randomInt(1, 255) + '.' + utils.randomInt(0, 255) + '.' +
      utils.randomInt(0, 255) + '.' + utils.randomInt(0, 255);
  },

  ipv6: function() {
    return utils.randomInt(1, 0xffff).toString(16) + ':' +
      utils.randomInt(0, 0xffff).toString(16) + ':' +
      utils.randomInt(0, 0xffff).toString(16) + ':' +
      utils.randomInt(0, 0xffff).toString(16) + ':' +
      utils.randomInt(0, 0xffff).toString(16) + ':' +
      utils.randomInt(0, 0xffff).toString(16) + ':' +
      utils.randomInt(0, 0xffff).toString(16) + ':' +
      utils.randomInt(0, 0xffff).toString(16);
  },

  color: function(options) {
    return utils.randomArrayItem(options.data.root.colors);
  },

  hexColor: function(options) {
    var r = utils.randomInt(0, 0xff);
    var g = utils.randomInt(0, 0xff);
    var b = utils.randomInt(0, 0xff);

    if (options.hash.websafe === true) {
      r = Math.round(r / 0x33) * 0x33;
      g = Math.round(g / 0x33) * 0x33;
      b = Math.round(b / 0x33) * 0x33;
    }

    // Ensure that single digit values are padded with leading zeros
    return (options.hash.withHash === false ? '' : '#') +
      ('0' + r.toString(16)).slice(-2) +
      ('0' + g.toString(16)).slice(-2) +
      ('0' + b.toString(16)).slice(-2);
  },

  char: function(charset) {
    if (arguments.length !== 2 || typeof charset !== 'string') {
      throw new Error(`The char helper requires a string param, eg: {{char 'ABC'}}`);
    }
    return utils.randomChar(charset)
  },

  lorem: function(totalWords, options) {
    var ret = '';
    var i, word;
    var isNewSentence = true;
    var lastPunctuationIndex = 0;
    var errorMsg = 'The lorem helper requires either a word count or min and max values, eg: {{lorem 5}} or {{lorem min=5 max=10}}';

    if (arguments.length === 1) {
      // Juggle the arguments as totalWords wasn't provided
      options = totalWords;

      if (options.hash.min || options.hash.max) {
        if (typeof options.hash.min === 'number' && typeof options.hash.max === 'number') {
          totalWords = utils.randomInt(options.hash.min, options.hash.max);
        } else {
          throw new Error(errorMsg);
        }
      } else {
        totalWords = 25;
      }
    } else if (arguments.length === 2) {
      if (options.hash.min || options.hash.max) {
        throw new Error(errorMsg);
      }
    } else {
      throw new Error(errorMsg);
    }

    for (i = 0; i < totalWords; i++) {
      word = utils.randomArrayItem(options.data.root.lorem);

      // If the last iteration triggered a new sentence then capitalize the first letter
      if (isNewSentence) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
        isNewSentence = false;
      }

      // Only introduce new punctuation if we're more then 3 words away from the end,
      // and more than 3 words since the last punctuation, and a 1 in 3 chance.
      if (i < totalWords - 3 && i - lastPunctuationIndex > 3 && utils.random() < 0.3) {
        isNewSentence = utils.random() < 0.6;
        word = word + (isNewSentence ? '.' : ',');
        lastPunctuationIndex = i;
      }

      ret = ret + word + ' ';
    }

    // Add a period/full-stop at the very end
    ret = ret.trimRight() + '.';
    return ret;
  },

  random: function() {
    if (arguments.length < 2) {
      throw new Error(`The random helper requires at least one param, eg: {{random 'north' 'south'}}`);
    }
    var arr = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
    return utils.randomArrayItem(arr);
  },

  lowercase: function(value) {
    return value.toLowerCase();
  },

  uppercase: function(value) {
    return value.toUpperCase();
  },

  add: function(a, b) {
    if (arguments.length !== 3 || typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('The add helper requires two number params, eg: {{add 2 4}}');
    }
    return a + b;
  },

  step: function(inc, options) {
    if (arguments.length !== 2 || options.data.index == null) {
      throw new Error('The step helper requires a numeric value and can only be used inside #repeat and #each blocks, eg: {{step 10}}');
    }
    return options.data.index * inc;
  }
};

module.exports = helpers;
