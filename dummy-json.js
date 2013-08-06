var Handlebars = require('handlebars');

var randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
};

var randomBoolean = function() {
  return Math.random() > 0.5;
};

var uniqueIndex;

var helpers = {
  repeat: function(min, max, options) {
    // By default repeat will work with it's current context, unless it's
    // given an array in which case it'll work with that
    var context = this;
    var contextIsArray = false;
    var count = 0;

    if (Array.isArray(min)) {
      // If the helper was given an array then juggle the arguments
      options = max;
      context = min;
      count = context.length;
      contextIsArray = true;
    } else {
      if (arguments.length === 3) {
        // If given two numbers then pick a random one between the two
        count = randomInt(min, max);
      } else if (arguments.length === 2) {
        // If given one number then just use it as a fixed repeat count
        options = max;
        count = min;
      }
    }

    var ret = '';
    for (var i = 0; i < count; i++) {
      // index and count are passed as private variables so they don't pollute
      // the context scope
      ret += options.fn(
        contextIsArray ? context[i] : context,
        {data: {index: i, count: count}}
      );
      // Trim whitespace left by handlebars and add commas between items
      ret = ret.trim();
      if (i < count - 1) ret += ',';
    }

    return ret;
  },

  number: function(min, max, options) {
    // If only one number is provided then generate from 0 to that number
    if (arguments.length === 2) {
      max = min;
      min = 0;
    }
    // Handlebars helpers don't accept numbers with decimal places as arguments
    // so they must be passed as strings
    min = parseFloat(min);
    max = parseFloat(max);
    // Return a random int or float depending on what the user passed in
    return (min % 1 === 0) ? randomInt(min, max) : randomFloat(min, max);
  },

  boolean: function(options) {
    return randomBoolean().toString();
  },

  index: function(options) {
    // Outside of a repeat loop this will return undefined
    return options.data.index;
  },

  uniqueIndex: function(options) {
    return uniqueIndex++;
  }
};

module.exports = {
  parse: function(string, options) {
    options = options || {};

    // Merge the built-in helpers with any that are passed in the options
    var combinedHelpers = {};
    Handlebars.Utils.extend(combinedHelpers, helpers);
    Handlebars.Utils.extend(combinedHelpers, options.helpers);

    // Reset uniqueIndex on each parse
    uniqueIndex = 0;

    return Handlebars.compile(string)(options.data, {helpers: combinedHelpers});
  },

  // Also export utility functions so everyone can use them
  randomInt: randomInt,
  randomFloat: randomFloat,
  randomBoolean: randomBoolean
};