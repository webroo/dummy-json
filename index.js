var Handlebars = require('handlebars');
var mockdata = require('./lib/mockdata');
var helpers = require('./lib/helpers');
var utils = require('./lib/utils');

var dummyjson = {
  seed: null,

  parse: function (string, options) {
    options = options || {};

    // Merge custom mockdata/helpers into the defaults, items with the same name will override
    options.mockdata = Handlebars.Utils.extend({}, mockdata, options.mockdata);
    options.helpers = Handlebars.Utils.extend({}, helpers, options.helpers);

    // If a seed is passed in the options it will override the default one
    utils.setRandomSeed(options.seed || dummyjson.seed);

    return Handlebars.compile(string)(options.mockdata, {helpers: options.helpers});
  },

  mockdata: mockdata,
  helpers: helpers,
  utils: utils
};

module.exports = dummyjson;
