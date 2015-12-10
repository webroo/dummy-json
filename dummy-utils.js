module.exports = {
  randomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randomFloat: function (min, max) {
    return Math.random() * (max - min) + min;
  },

  randomBoolean: function () {
    return Math.random() < 0.5;
  },

  randomDate: function (min, max) {
    return new Date(Math.floor(Math.random() * (max - min)) + min);
  },

  nearestMultiple: function (value, multiple) {
    return Math.round(value / multiple) * multiple;
  }
};
