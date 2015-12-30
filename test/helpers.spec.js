var assert = require('assert');
var dummyjson = require('../index');

// Asserts the basic string output of dummyjson.parse() (by default dummyjson.parse() returns
// a string). If the template or expected params are arrays then the contents will be joined with
// line-breaks to create a multiline string.
function assertStringOutput (template, expected) {
  template = template.join ? template.join('\n') : template;
  expected = expected.join ? expected.join('\n') : expected;
  var actual = dummyjson.parse(template);
  assert.deepEqual(actual, expected);
}

// Asserts the output of dummyjson.parse() after it's been put through JSON.parse().
// If the template param is an array then the contents will be joined with line-breaks to create
// a multiline string.
function assertJSONOutput (template, expected) {
  template = template.join ? template.join('\n') : template;
  var actual = dummyjson.parse(template);
  assert.deepEqual(JSON.parse(actual), expected);
}

// We set a seed so that all the tests have expected outcomes
dummyjson.seed = 'helloworld';

// The helpers rely on Handlebars for their execution, so rather than test the helper functions
// directly we test them via the parse() method. This makes these more like integration tests.
describe('helpers', function () {
  describe('repeat', function () {
    it('should throw an error if not given a number', function () {
      var template = '{{#repeat}}{{/repeat}}';
      assert.throws(
        function () {
          dummyjson.parse(template);
        },
        Error
      );
    });

    it('should repeat the contents the set number of times and add commas between blocks', function () {
      var template = [
        '[',
        '  {{#repeat 2}}',
        '  "hello"',
        '  {{/repeat}}',
        ']'
      ];
      var expected = [
        'hello',
        'hello'
      ];
      assertJSONOutput(template, expected);
    });

    it('should remove the last comma if the block already has a trailing comma', function () {
      var template = [
        '[',
        '  {{#repeat 2}}',
        '  "hello",',
        '  {{/repeat}}',
        ']'
      ];
      var expected = [
        'hello',
        'hello'
      ];
      assertJSONOutput(template, expected);
    });

    it('should repeat the contents a random number of times between the range', function () {
      var template = [
        '[',
        '  {{#repeat 1 5}}',
        '  "hello"',
        '  {{/repeat}}',
        ']'
      ];
      var expected = [
        'hello',
        'hello',
        'hello'
      ];
      assertJSONOutput(template, expected);
    });

    it('should make positional values available inside the repeat block', function () {
      var template = [
        '[',
        '  {{#repeat 2}}',
        '  {',
        '    "index": {{@index}},',
        '    "total": {{@total}},',
        '    "first": {{@first}},',
        '    "last": {{@last}}',
        '  }',
        '  {{/repeat}}',
        ']'
      ];
      var expected = [
        {
          'index': 0,
          'total': 2,
          'first': true,
          'last': false
        },
        {
          'index': 1,
          'total': 2,
          'first': false,
          'last': true
        }
      ];
      assertJSONOutput(template, expected);
    });
  });

  describe('int', function () {
    it('should throw an error if not given range values', function () {
      var template = '{{int}}';
      assert.throws(
        function () {
          dummyjson.parse(template);
        },
        Error
      );
    });

    it('should throw an error if only given 1 range value', function () {
      var template = '{{int 100}}';
      assert.throws(
        function () {
          dummyjson.parse(template);
        },
        Error
      );
    });

    it('should return different integers when used repeatedly', function () {
      var template = '{{int 0 100}}, {{int 0 100}}, {{int 0 100}}';
      var expected = '43, 41, 9';
      assertStringOutput(template, expected);
    });

    it('should return integers rounded to the nearest multiple of the given value', function () {
      var template = '{{int 0 100 round=5}}, {{int 0 100 round=10}}, {{int 0 100 round=20}}';
      var expected = '45, 40, 0';
      assertStringOutput(template, expected);
    });

    it('should return an integer formatted using the format string', function () {
      var template = '{{int 1000 2000 "0,0.00"}}';
      var expected = '1,434.00';
      assertStringOutput(template, expected);
    });

    it('should return an integer formatted using the format string in single quotes', function () {
      var template = '{{int 1000 2000 \'0,0.00\'}}';
      var expected = '1,434.00';
      assertStringOutput(template, expected);
    });
  });

  describe('float', function () {
    it('should throw an error if not given range values', function () {
      var template = '{{float}}';
      assert.throws(
        function () {
          dummyjson.parse(template);
        },
        Error
      );
    });

    it('should throw an error if only given 1 range value', function () {
      var template = '{{float 100}}';
      assert.throws(
        function () {
          dummyjson.parse(template);
        },
        Error
      );
    });

    it('should return different floats when used repeatedly', function () {
      var template = '{{float 0 1}}, {{float 0 1}}, {{float 0 1}}';
      var expected = '0.4339404073209236, 0.4147789564935982, 0.0952744222319714';
      assertStringOutput(template, expected);
    });

    it('should return floats rounded to the nearest multiple of the given value', function () {
      var template = '{{float 0 1 round=0.1}}, {{float 0 1 round=0.1}}, {{float 0 1 round=0.1}}';
      var expected = '0.4, 0.4, 0.1';
      assertStringOutput(template, expected);
    });

    it('should return a float formatted using the format string', function () {
      var template = '{{float 1000 2000 "0,0.00"}}';
      var expected = '1,433.94';
      assertStringOutput(template, expected);
    });
  });

  describe('boolean', function () {
    it('should return different booleans when used repeatedly', function () {
      var template = '{{boolean}}, {{boolean}}, {{boolean}}, {{boolean}}';
      var expected = 'true, true, true, false';
      assertStringOutput(template, expected);
    });
  });

  describe('date', function () {
    it('should throw an error if not given range values', function () {
      var template = '{{date}}';
      assert.throws(
        function () {
          dummyjson.parse(template);
        },
        Error
      );
    });

    it('should throw an error if only given 1 range value', function () {
      var template = '{{date "2005"}}';
      assert.throws(
        function () {
          dummyjson.parse(template);
        },
        Error
      );
    });

    it('should return different dates when used repeatedly', function () {
      // Unix time is the only real safe way of testing this, as the default Date.toString()
      // will localise the value to the machine's timezone
      var template = '{{date "2005" "2015" "unix"}}, {{date "2005" "2015" "unix"}}, {{date "2005" "2015" "unix"}}';
      var expected = '1241460031, 1235413965, 1134599805';
      assertStringOutput(template, expected);
    });

    it('should return a date formatted using the format string', function () {
      var template = '{{date "2005" "2015" "YYYY"}}';
      var expected = '2009';
      assertStringOutput(template, expected);
    });
  });

  describe('time', function () {
    it('should throw an error if not given range values', function () {
      var template = '{{time}}';
      assert.throws(
        function () {
          dummyjson.parse(template);
        },
        Error
      );
    });

    it('should throw an error if only given 1 range value', function () {
      var template = '{{time "09:00"}}';
      assert.throws(
        function () {
          dummyjson.parse(template);
        },
        Error
      );
    });

    it('should return different time when used repeatedly', function () {
      var template = '{{time "09:00" "17:00"}}, {{time "09:00" "17:00"}}, {{time "09:00" "17:00"}}';
      var expected = '12:28, 12:19, 09:45';
      assertStringOutput(template, expected);
    });

    it('should return a time formatted using the format string', function () {
      var template = '{{time "09:00" "17:00" "HH:mm:ss"}}';
      var expected = '12:28:17';
      assertStringOutput(template, expected);
    });

    it('should return a time formatted in unix time', function () {
      var template = '{{time "09:00" "17:00" "unix"}}';
      var expected = '44897';
      assertStringOutput(template, expected);
    });
  });

  describe('title', function () {
    it('should return different titles when used repeatedly', function () {
      var template = '{{title}}, {{title}}, {{title}}, {{title}}';
      var expected = 'Prof, Prof, Mr, Lord';
      assertStringOutput(template, expected);
    });
  });

  describe('firstName', function () {
    it('should return different first names when used repeatedly', function () {
      var template = '{{firstName}}, {{firstName}}, {{firstName}}';
      var expected = 'Ivan, Darrell, Lloyd';
      assertStringOutput(template, expected);
    });
  });

  describe('lastName', function () {
    it('should return different last names when used repeatedly', function () {
      var template = '{{lastName}}, {{lastName}}, {{lastName}}';
      var expected = 'Magby, Sprowl, Starck';
      assertStringOutput(template, expected);
    });
  });

  describe('username', function () {
    it('should return different usernames when used repeatedly', function () {
      var template = '{{username}}, {{username}}, {{username}}';
      var expected = 'isprowl, lsmit, twinter';
      assertStringOutput(template, expected);
    });
  });

  describe('company', function () {
    it('should return different companies when used repeatedly', function () {
      var template = '{{company}}, {{company}}, {{company}}';
      var expected = 'FortyFour, Conixco, Qualcore';
      assertStringOutput(template, expected);
    });
  });

  describe('tld', function () {
    it('should return different tlds when used repeatedly', function () {
      var template = '{{tld}}, {{tld}}, {{tld}}';
      var expected = 'co, gov, org';
      assertStringOutput(template, expected);
    });
  });

  describe('domain', function () {
    it('should return different domains when used repeatedly', function () {
      var template = '{{domain}}, {{domain}}, {{domain}}';
      var expected = 'fortyfour.gov, qualcore.name, polycore.net';
      assertStringOutput(template, expected);
    });
  });

  describe('email', function () {
    it('should return different emails when used repeatedly', function () {
      var template = '{{email}}, {{email}}, {{email}}';
      var expected = 'ivan.sprowl@qualcore.name, theo.winter@citisys.biz, florance.krumm@dalserve.biz';
      assertStringOutput(template, expected);
    });
  });

  describe('street', function () {
    it('should return different streets when used repeatedly', function () {
      var template = '{{street}}, {{street}}, {{street}}';
      var expected = 'Banner Street, Green Street, Cottontail Road';
      assertStringOutput(template, expected);
    });
  });

  describe('city', function () {
    it('should return different cities when used repeatedly', function () {
      var template = '{{city}}, {{city}}, {{city}}';
      var expected = 'Bristol, Spokane, Dover';
      assertStringOutput(template, expected);
    });
  });

  describe('country', function () {
    it('should return different countries when used repeatedly', function () {
      var template = '{{country}}, {{country}}, {{country}}';
      var expected = 'Iceland, Isle of Man, Burundi';
      assertStringOutput(template, expected);
    });
  });

  describe('countryCode', function () {
    it('should return different country codes when used repeatedly', function () {
      var template = '{{countryCode}}, {{countryCode}}, {{countryCode}}';
      var expected = 'IS, IM, BI';
      assertStringOutput(template, expected);
    });
  });

  describe('zipcode', function () {
    it('should return different zipcodes when used repeatedly', function () {
      // Temporarily set a new seed for this test so it generates values that provide
      // sufficient code coverage
      var originalSeed = dummyjson.seed;
      dummyjson.seed = 'xyz1234';

      var template = '{{zipcode}}, {{zipcode}}, {{zipcode}}';
      var expected = '86930, 02430, 73050';
      assertStringOutput(template, expected);

      dummyjson.seed = originalSeed;
    });
  });

  describe('postcode', function () {
    it('should return different postcodes when used repeatedly', function () {
      var template = '{{postcode}}, {{postcode}}, {{postcode}}';
      var expected = 'LK0 5JE, FN4 8AO, LT5 3VA';
      assertStringOutput(template, expected);
    });
  });

  describe('lat', function () {
    it('should return different latitude values when used repeatedly', function () {
      var template = '{{lat}}, {{lat}}, {{lat}}, {{lat}}';
      var expected = '-11.890727, -15.339788, -72.850604, 17.676792';
      assertStringOutput(template, expected);
    });
  });

  describe('long', function () {
    it('should return different longitude values when used repeatedly', function () {
      var template = '{{long}}, {{long}}, {{long}}, {{long}}';
      var expected = '-23.781453, -30.679576, -145.701208, 35.353584';
      assertStringOutput(template, expected);
    });
  });

  describe('phone', function () {
    it('should return different phone numbers when used repeatedly', function () {
      var template = '{{phone}}, {{phone}}, {{phone}}';
      var expected = '440-531-2548, 054-753-8054, 023-013-3024';
      assertStringOutput(template, expected);
    });

    it('should allow custom phone number format strings', function () {
      var template = '{{phone "+1 (xxx) xxx-xxxx"}}, {{phone "(x) 1xx 9xxx"}}';
      var expected = '+1 (440) 531-2548, (0) 154 9753';
      assertStringOutput(template, expected);
    });
  });

  describe('guid', function () {
    it('should return different guids when used repeatedly', function () {
      var template = '{{guid}}, {{guid}}';
      var expected = '66195238-c087-46d0-a145-36504604fe17, 595be376-f0e9-49ed-adb2-a756f15c11ce';
      assertStringOutput(template, expected);
    });
  });

  describe('ipv4', function () {
    it('should return different IPv4s when used repeatedly', function () {
      var template = '{{ipv4}}, {{ipv4}}, {{ipv4}}';
      var expected = '111.106.24.153, 95.43.54.128, 124.206.5.138';
      assertStringOutput(template, expected);
    });
  });

  describe('ipv6', function () {
    it('should return different IPv6s when used repeatedly', function () {
      var template = '{{ipv6}}, {{ipv6}}';
      var expected = '6f17:6a2e:1863:9923:5f10:2b49:36fd:80dc, 7c7a:ceac:569:8a67:7442:c1e0:815e:6416';
      assertStringOutput(template, expected);
    });
  });

  describe('color', function () {
    it('should return different colors when used repeatedly', function () {
      var template = '{{color}}, {{color}}, {{color}}';
      var expected = 'lawngreen, khaki, cadetblue';
      assertStringOutput(template, expected);
    });
  });

  describe('hexColor', function () {
    it('should return different hexColors when used repeatedly', function () {
      var template = '{{hexColor}}, {{hexColor}}, {{hexColor}}, {{hexColor}}';
      var expected = '#6f6a18, #995f2b, #36807c, #ce058a';
      assertStringOutput(template, expected);
    });

    it('should return different websafe hexColors when used repeatedly', function () {
      var template = '{{hexColor websafe=true}}, {{hexColor websafe=true}}, {{hexColor websafe=true}}';
      var expected = '#666600, #996633, #339966';
      assertStringOutput(template, expected);
    });
  });

  describe('lorem', function () {
    it('should return 25 lorem ipsum words by default', function () {
      var template = '{{lorem}}';
      var expected = 'Quisque nam ut tincidunt sed. Metus euismod lacinia dolor maximus vehicula nibh. Quisque ut accumsan finibus. Sed placerat dolor in consectetur, commodo mi lobortis sed.';
      assertStringOutput(template, expected);
    });

    it('should return the specified number of lorem ipsum words', function () {
      var template = '{{lorem 10}}';
      var expected = 'Quisque nam ut tincidunt sed. Metus euismod lacinia dolor neque.';
      assertStringOutput(template, expected);
    });
  });

  describe('linked helpers', function () {
    it('should link all values when names are used first', function () {
      var template = [
        '{',
        '  "firstName": "{{firstName}}",',
        '  "lastName": "{{lastName}}",',
        '  "username": "{{username}}",',
        '  "company": "{{company}}",',
        '  "tld": "{{tld}}",',
        '  "domain": "{{domain}}",',
        '  "email": "{{email}}"',
        '}'
      ];
      var expected = {
        'firstName': 'Ivan',
        'lastName': 'Sprowl',
        'username': 'isprowl',
        'company': 'Qualcore',
        'tld': 'name',
        'domain': 'qualcore.name',
        'email': 'ivan.sprowl@qualcore.name'
      };
      assertJSONOutput(template, expected);
    });

    it('should link all values when username is used first', function () {
      var template = [
        '{',
        '  "username": "{{username}}",',
        '  "firstName": "{{firstName}}",',
        '  "lastName": "{{lastName}}",',
        '  "company": "{{company}}",',
        '  "tld": "{{tld}}",',
        '  "domain": "{{domain}}",',
        '  "email": "{{email}}"',
        '}'
      ];
      var expected = {
        'username': 'isprowl',
        'firstName': 'Ivan',
        'lastName': 'Sprowl',
        'company': 'Qualcore',
        'tld': 'name',
        'domain': 'qualcore.name',
        'email': 'ivan.sprowl@qualcore.name'
      };
      assertJSONOutput(template, expected);
    });

    it('should link all values when email is used first', function () {
      var template = [
        '{',
        '  "email": "{{email}}",',
        '  "username": "{{username}}",',
        '  "firstName": "{{firstName}}",',
        '  "lastName": "{{lastName}}",',
        '  "company": "{{company}}",',
        '  "tld": "{{tld}}",',
        '  "domain": "{{domain}}"',
        '}'
      ];
      var expected = {
        'email': 'ivan.sprowl@qualcore.name',
        'username': 'isprowl',
        'firstName': 'Ivan',
        'lastName': 'Sprowl',
        'company': 'Qualcore',
        'tld': 'name',
        'domain': 'qualcore.name'
      };
      assertJSONOutput(template, expected);
    });

    it('should link all values when domain is used first', function () {
      var template = [
        '{',
        '  "domain": "{{domain}}",',
        '  "firstName": "{{firstName}}",',
        '  "lastName": "{{lastName}}",',
        '  "username": "{{username}}",',
        '  "company": "{{company}}",',
        '  "tld": "{{tld}}",',
        '  "email": "{{email}}"',
        '}'
      ];
      var expected = {
        'domain': 'fortyfour.gov',
        'firstName': 'Lloyd',
        'lastName': 'Smit',
        'username': 'lsmit',
        'email': 'lloyd.smit@fortyfour.gov',
        'company': 'FortyFour',
        'tld': 'gov'
      };
      assertJSONOutput(template, expected);
    });

    it('should link all values when company is used first', function () {
      var template = [
        '{',
        '  "company": "{{company}}",',
        '  "domain": "{{domain}}",',
        '  "firstName": "{{firstName}}",',
        '  "lastName": "{{lastName}}",',
        '  "username": "{{username}}",',
        '  "tld": "{{tld}}",',
        '  "email": "{{email}}"',
        '}'
      ];
      var expected = {
        'company': 'FortyFour',
        'domain': 'fortyfour.gov',
        'firstName': 'Lloyd',
        'lastName': 'Smit',
        'username': 'lsmit',
        'email': 'lloyd.smit@fortyfour.gov',
        'tld': 'gov'
      };
      assertJSONOutput(template, expected);
    });

    it('should link all values when tld is used first', function () {
      var template = [
        '{',
        '  "tld": "{{tld}}",',
        '  "company": "{{company}}",',
        '  "domain": "{{domain}}",',
        '  "firstName": "{{firstName}}",',
        '  "lastName": "{{lastName}}",',
        '  "username": "{{username}}",',
        '  "email": "{{email}}"',
        '}'
      ];
      var expected = {
        'tld': 'co',
        'company': 'Conixco',
        'domain': 'conixco.co',
        'firstName': 'Lloyd',
        'lastName': 'Smit',
        'username': 'lsmit',
        'email': 'lloyd.smit@conixco.co'
      };
      assertJSONOutput(template, expected);
    });

    it('should not reuse lastName when email is repeatedly used', function () {
      var template = [
        '{',
        '  "firstName1": "{{firstName}}",',
        '  "lastName1": "{{lastName}}",',
        '  "email1": "{{email}}",',
        '  "firstName2": "{{firstName}}",',
        '  "email2": "{{email}}"',
        '}'
      ];
      var expected = {
        'firstName1': 'Ivan',
        'lastName1': 'Sprowl',
        'email1': 'ivan.sprowl@qualcore.name',
        'firstName2': 'Theo',
        'email2': 'theo.winter@citisys.biz'
      };
      assertJSONOutput(template, expected);
    });

    it('should not reuse lastName when username is repeatedly used', function () {
      var template = [
        '{',
        '  "firstName1": "{{firstName}}",',
        '  "lastName1": "{{lastName}}",',
        '  "username1": "{{username}}",',
        '  "firstName2": "{{firstName}}",',
        '  "username2": "{{username}}"',
        '}'
      ];
      var expected = {
        'firstName1': 'Ivan',
        'lastName1': 'Sprowl',
        'username1': 'isprowl',
        'firstName2': 'Lloyd',
        'username2': 'lsmit'
      };
      assertJSONOutput(template, expected);
    });

    it('should generate a new firstName when using a linked helper twice', function () {
      var template = [
        '{',
        '  "firstName1": "{{firstName}}",',
        '  "username1": "{{username}}",',
        '  "username2": "{{username}}",',
        '  "firstName2": "{{firstName}}",',
        '  "email1": "{{email}}",',
        '  "email2": "{{email}}",',
        '  "firstName3": "{{firstName}}"',
        '}'
      ];
      var expected = {
        'firstName1': 'Ivan',
        'username1': 'isprowl',
        'username2': 'lsmit',
        'firstName2': 'Lloyd',
        'email1': 'lloyd.smit@polycore.net',
        'email2': 'tyler.castleman@peersys.club',
        'firstName3': 'Tyler'
      };
      assertJSONOutput(template, expected);
    });

    it('should generate a new lastName when using a linked helper twice', function () {
      var template = [
        '{',
        '  "lastName1": "{{lastName}}",',
        '  "username1": "{{username}}",',
        '  "username2": "{{username}}",',
        '  "lastName2": "{{lastName}}",',
        '  "email1": "{{email}}",',
        '  "email2": "{{email}}",',
        '  "lastName3": "{{lastName}}"',
        '}'
      ];
      var expected = {
        'lastName1': 'Magby',
        'username1': 'dmagby',
        'username2': 'lsmit',
        'lastName2': 'Smit',
        'email1': 'lloyd.smit@polycore.net',
        'email2': 'tyler.castleman@peersys.club',
        'lastName3': 'Castleman'
      };
      assertJSONOutput(template, expected);
    });

    it('should generate a new company when using a linked helper twice', function () {
      var template = [
        '{',
        '  "company1": "{{company}}",',
        '  "domain1": "{{domain}}",',
        '  "domain2": "{{domain}}",',
        '  "company2": "{{company}}",',
        '  "email1": "{{email}}",',
        '  "email2": "{{email}}",',
        '  "company3": "{{company}}"',
        '}'
      ];
      var expected = {
        'company1': 'FortyFour',
        'domain1': 'fortyfour.gov',
        'domain2': 'qualcore.name',
        'company2': 'Qualcore',
        'email1': 'theo.winter@qualcore.name',
        'email2': 'tyler.castleman@peersys.club',
        'company3': 'PeerSys'
      };
      assertJSONOutput(template, expected);
    });

    it('should generate a new tld when using a linked helper twice', function () {
      var template = [
        '{',
        '  "tld1": "{{tld}}",',
        '  "domain1": "{{domain}}",',
        '  "domain2": "{{domain}}",',
        '  "tld2": "{{tld}}",',
        '  "email1": "{{email}}",',
        '  "email2": "{{email}}",',
        '  "tld3": "{{tld}}"',
        '}'
      ];
      var expected = {
        'tld1': 'co',
        'domain1': 'conixco.co',
        'domain2': 'qualcore.name',
        'tld2': 'name',
        'email1': 'theo.winter@qualcore.name',
        'email2': 'tyler.castleman@peersys.club',
        'tld3': 'club'
      };
      assertJSONOutput(template, expected);
    });

    it('should link countries and country codes', function () {
      var template = [
        '{',
        '  "country": "{{country}}",',
        '  "countryCode": "{{countryCode}}",',
        '  "country2": "{{country}}",',
        '  "countryCode2": "{{countryCode}}",',
        '  "country3": "{{country}}",',
        '  "country4": "{{country}}",',
        '  "countryCode4": "{{countryCode}}",',
        '  "countryCode5": "{{countryCode}}",',
        '  "country5": "{{country}}"',
        '}'
      ];
      var expected = {
        'country': 'Iceland',
        'countryCode': 'IS',
        'country2': 'Isle of Man',
        'countryCode2': 'IM',
        'country3': 'Burundi',
        'country4': 'Northern Mariana Islands',
        'countryCode4': 'MP',
        'countryCode5': 'GW',
        'country5': 'Guinea-Bissau'
      };
      assertJSONOutput(template, expected);
    });

    it('should clear any linked values when starting a repeat block', function () {
      var template = [
        '{',
        '  "firstName": "{{firstName}}",',
        '  "lastName": "{{lastName}}",',
        '  "company": "{{company}}",',
        '  "tld": "{{tld}}",',
        '  "emails": [',
        '    {{#repeat 2}}',
        '    "{{email}}"',
        '    {{/repeat}}',
        '  ],',
        '  "country": "{{country}}",',
        '  "countryCodes": [',
        '    {{#repeat 2}}',
        '    "{{countryCode}}"',
        '    {{/repeat}}',
        '  ]',
        '}'
      ];
      var expected = {
        'firstName': 'Ivan',
        'lastName': 'Sprowl',
        'company': 'Qualcore',
        'tld': 'name',
        'emails': [
          'theo.winter@citisys.biz',
          'florance.krumm@dalserve.biz'
        ],
        'country': 'Japan',
        'countryCodes': [
          'RO',
          'LA'
        ]
      };
      assertJSONOutput(template, expected);
    });
  });

  describe('subexpression helpers', function () {
    describe('lowercase', function () {
      it('should change the given value to lowercase', function () {
        var template = '{{lowercase (firstName)}}';
        var expected = 'ivan';
        assertStringOutput(template, expected);
      });
    });

    describe('uppercase', function () {
      it('should change the given value to uppercase', function () {
        var template = '{{uppercase (firstName)}}';
        var expected = 'IVAN';
        assertStringOutput(template, expected);
      });
    });
  });
});
