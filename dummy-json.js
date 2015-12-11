var Handlebars = require('handlebars');
var dummyData = require('./dummy-data');
var dummyHelpers = require('./dummy-helpers');
var dummyUtils = require('./dummy-utils');

module.exports = {
  parse: function (string, options) {
    options = options || {};

    // Merge any data or helpers passed in the options into the built-in versions,
    // passed-in options will override built-in ones
    options.data = Handlebars.Utils.extend(dummyData, options.data);
    options.helpers = Handlebars.Utils.extend(dummyHelpers, options.helpers);

    dummyUtils.setRandomSeed(options.seed || null);

    return Handlebars.compile(string)(options.data, {helpers: options.helpers});
  },

  data: dummyData,
  helpers: dummyHelpers,
  utils: dummyUtils
};
