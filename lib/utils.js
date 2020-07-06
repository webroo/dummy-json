var seedrandom = require('seedrandom');

// Create an instance of the prng without a seed (so it'll be a random sequence every time)
var prng = seedrandom();

var utils = {
  setRandomSeed: function(seed) {
    prng = seedrandom(seed);
  },

  random: function() {
    return prng();
  },

  randomInt: function(min, max) {
    return Math.floor(utils.random() * (max - min + 1)) + min;
  },

  randomFloat: function(min, max) {
    return utils.random() * (max - min) + min;
  },

  randomBoolean: function() {
    return utils.random() < 0.5;
  },

  randomDate: function(min, max) {
    // We add the timezone offset to avoid the date falling outside the supplied range
    var d = new Date(Math.floor(utils.random() * (max - min)) + min);
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60000);
    return d;
  },

  randomArrayItem: function(array) {
    return array[utils.randomInt(0, array.length - 1)];
  },

  randomChar: function(charset) {
    charset = charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return charset.charAt(utils.randomInt(0, charset.length - 1));
  }
};

module.exports = utils;
