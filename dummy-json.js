var Handlebars = require('handlebars');

var _firstNames = ['Leanne','Edward','Haydee','Lyle','Shea','Curtis','Roselyn','Marcus','Lyn','Lloyd','Isabelle','Francis','Olivia','Roman','Myong','Jamie','Alexis','Vernon','Chloe','Max','Kirstie','Tyler','Katelin','Alejandro','Hannah','Gavin','Lynetta','Russell','Neida','Kurt','Dannielle','Aiden','Janett','Vaughn','Michelle','Brian','Maisha','Theo','Emma','Cedric','Jocelyn','Darrell','Grace','Ivan','Rikki','Erik','Madeleine','Rufus','Florance','Raymond','Jenette','Danny','Kathy','Michael','Layla','Rolf','Selma','Anton','Rosie','Craig','Victoria','Andy','Lorelei','Drew','Yuri','Miles','Raisa','Rico','Rosanne','Cory','Dori','Travis','Joslyn','Austin','Haley','Ian','Liza','Rickey','Susana','Stephen','Richelle','Lance','Jetta','Heath','Juliana','Rene','Madelyn','Stan','Eleanore','Jason','Alexa','Adam','Jenna','Warren','Cecilia','Benito','Elaine','Mitch','Raylene','Cyrus'];
var _lastNames = ['Flinn','Young','Milligan','Keesee','Mercer','Chapman','Zobel','Carter','Pettey','Starck','Raymond','Pullman','Drolet','Higgins','Matzen','Tindel','Winter','Charley','Schaefer','Hancock','Dampier','Garling','Verde','Lenihan','Rhymer','Pleiman','Dunham','Seabury','Goudy','Latshaw','Whitson','Cumbie','Webster','Bourquin','Connor','Rikard','Brier','Luck','Porras','Gilmore','Turner','Sprowl','Rohloff','Magby','Wallis','Mullens','Correa','Murphy','Bryd','Gamble','Castleman','Pace','Durrett','Bourne','Hottle','Oldman','Paquette','Stine','Muldoon','Smit','Finn','Kilmer','Sager','White','Friedrich','Fennell','Miers','Carroll','Freeman','Hollis','Neal','Remus','Pickering','Woodrum','Bradbury','Caffey','Tuck','Jensen','Shelly','Hyder','Krumm','Hundt','Seal','Pendergast','Kelsey','Milling','Karst','Helland','Risley','Grieve','Paschall','Coolidge','Furlough','Brandt','Cadena','Rebelo','Leath','Backer','Bickers','Cappel'];
var _companies = ['Unilogic','Solexis','Dalserve','Terrasys','Pancast','Tomiatech','Kancom','Iridimax','Proline','Qualcore','Thermatek','VTGrafix','Sunopia','WestGate','Chromaton','Tecomix','Galcom','Zatheon','OmniTouch','Hivemind','MultiServ','Citisys','Polygan','Dynaroc','Storex','Britech','Thermolock','Cryptonica','LoopSys','ForeTrust','TrueXT','LexiconLabs','Bellgate','Dynalab','Logico','Terralabs','CoreMax','Polycore','Infracom','Coolinga','MultiLingua','Conixco','QuadNet','FortyFour','TurboSystems','Optiplex','Nitrocam','CoreXTS','PeerSys','FastMart','Westercom','Templatek','Cirpria','FastFreight','Baramax','Superwire','Celmax','Connic','Forecore','SmartSystems','Ulogica','Seelogic','DynaAir','OpenServ','Maxcast','SixtySix','Protheon','SkyCenta','Eluxa','GrafixMedia','VenStrategy','Keycast','Opticast','Cameratek','CorpTek','Sealine','Playtech','Anaplex','Hypervision','Xenosys','Hassifix','Infratouch','Airconix','StrategyLine','Helixicon','MediaDime','NitroSystems','Viewtopia','Cryosoft','DuoServe','Acousticom','Freecast','CoreRobotics','Quadtek','Haltheon','TrioSys','Amsquare','Sophis','Keysoft','Creatonix'];

// Used to keep a reference to the current people arrays when parsing
var firstNames, lastNames, companies, maxPersonIndex;

// We try to keep names, emails and companies in sync, so that when using them
// together in a loop they all relate to each other. To do this we link them all
// to an index which is incremented only when the same type of property is
// accessed twice in a row.
var personIndex = 0;
var usedPersonAttrs = [];

var checkPersonIndex = function(type) {
  if (usedPersonAttrs.indexOf(type) !== -1) {
    personIndex = (personIndex + 1) % maxPersonIndex; // Loop index
    usedPersonAttrs = [];
  }
  usedPersonAttrs.push(type);
};

var randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
};

var randomBoolean = function() {
  return Math.random() > 0.5;
};

var zeroPad = function(num, len) {
  num = num + '';
  while (num.length < len) {
    num = '0' + num;
  }
  return num;
}

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
      options = max;
      max = min;
      min = 0;
    }

    // Handlebars helpers don't accept numbers with decimal places as arguments
    // so floats must be passed as strings
    var isFloat = false;
    if (typeof min === 'string') {
      isFloat = true;
      min = parseFloat(min);
      max = parseFloat(max);
    }

    if (isFloat) {
      return randomFloat(min, max);
    } else {
      var n = randomInt(min, max);
      // Integers can optionally be padded with leading zeros
      return options.hash.pad ? zeroPad(n, max.toString().length) : n;
    }
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
  },

  firstName: function(options) {
    checkPersonIndex('firstName');
    return firstNames[personIndex];
  },

  lastName: function(options) {
    checkPersonIndex('lastName');
    return lastNames[personIndex];
  },

  company: function(options) {
    checkPersonIndex('company');
    return companies[personIndex];
  },

  email: function(options) {
    checkPersonIndex('email');
    return firstNames[personIndex].toLowerCase() +
      '.' + lastNames[personIndex].toLowerCase() +
      '@' + companies[personIndex].toLowerCase() + '.com';
  }
};

module.exports = {
  parse: function(string, options) {
    options = options || {};

    firstNames = options.firstNames || _firstNames;
    lastNames = options.lastNames || _lastNames;
    companies = options.companies || _companies;

    // In order to sync the people data we must loop over the smallest array
    maxPersonIndex = Math.min(firstNames.length, lastNames.length, companies.length);

    // Merge the built-in helpers with any that are passed in the options
    var combinedHelpers = {};
    Handlebars.Utils.extend(combinedHelpers, helpers);
    Handlebars.Utils.extend(combinedHelpers, options.helpers);

    // Reset indexes on each parse
    uniqueIndex = 0;
    personIndex = 0;
    usedPersonAttrs = [];

    return Handlebars.compile(string)(options.data, {helpers: combinedHelpers});
  },

  // Also export utility functions so everyone can use them
  randomInt: randomInt,
  randomFloat: randomFloat,
  randomBoolean: randomBoolean,
  zeroPad: zeroPad
};