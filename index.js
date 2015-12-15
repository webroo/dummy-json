var Handlebars = require('handlebars');
var mockdata = require('./lib/mockdata');
var helpers = require('./lib/helpers');
var utils = require('./lib/utils');

module.exports = {
  parse: function (string, options) {
    options = options || {};

    // Merge any data or helpers passed in the options into the built-in versions,
    // passed-in options will override built-in ones
    options.data = Handlebars.Utils.extend(mockdata, options.data);
    options.helpers = Handlebars.Utils.extend(helpers, options.helpers);

    utils.setRandomSeed(options.seed || null);

    return Handlebars.compile(string)(options.data, {helpers: options.helpers});
  },

  data: mockdata,
  helpers: helpers,
  utils: utils
};
