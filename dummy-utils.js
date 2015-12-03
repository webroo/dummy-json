module.exports = {
  randomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randomFloat: function (min, max) {
    return Math.random() * (max - min) + min;
  },

  randomBoolean: function () {
    return Math.random() > 0.5;
  },

  zeroPad: function (num, len) {
    num = num + '';
    while (num.length < len) {
      num = '0' + num;
    }
    return num;
  }
};
