var assert = require('assert');
var dummyjson = require('../index');

dummyjson.seed = 'helloworld';

describe('dummyjson', function () {
  describe('parse', function () {
    it('should throw an error if not given a string to parse', function () {
      assert.throws(
        function () {
          dummyjson.parse();
        },
        Error
      );
    });

    it('should expose the default mockdata, helpers, and utils', function () {
      assert.notEqual(dummyjson.mockdata, undefined);
      assert.notEqual(dummyjson.helpers, undefined);
      assert.notEqual(dummyjson.utils, undefined);
    });

    describe('custom mockdata', function () {
      it('should merge custom mockdata into the default mockdata and make it available in the template', function () {
        var customMockdata = {
          animal: 'fox'
        };
        var template = '{{animal}} {{firstName}}';
        var output = dummyjson.parse(template, {mockdata: customMockdata});
        assert.equal(output, 'fox Ivan');
      });

      it('should allow the default mockdata to be overwritten if it shares the same name', function () {
        var customMockdata = {
          firstNames: ['Spongebob']
        };
        var template = '{{firstName}}';
        var output = dummyjson.parse(template, {mockdata: customMockdata});
        assert.equal(output, 'Spongebob');
      });

      it('should not mutate the custom mockdata object', function () {
        var customMockdata = {
          animal: 'fox'
        };
        var template = '{{animal}}';
        dummyjson.parse(template, {mockdata: customMockdata});
        // Check that default mockdata has not been added to the custom mockdata
        assert.equal(customMockdata.firstName, undefined);
      });

      it('should not mutate the default mockdata object', function () {
        var customMockdata = {
          animal: 'fox'
        };
        var template = '{{animal}}';
        dummyjson.parse(template, {mockdata: customMockdata});
        assert.equal(dummyjson.mockdata.animal, undefined);
      });
    });

    describe('custom helpers', function () {
      it('should merge custom helpers into the default helpers and make them available in the template', function () {
        var customHelpers = {
          direction: function () {
            return 'left';
          }
        };
        var template = '{{direction}} {{firstName}}';
        var output = dummyjson.parse(template, {helpers: customHelpers});
        assert.equal(output, 'left Ivan');
      });

      it('should allow the default helpers to be overwritten if they share the same name', function () {
        var customHelpers = {
          direction: function () {
            return 'left';
          }
        };
        var template = '{{direction}} {{firstName}}';
        var output = dummyjson.parse(template, {helpers: customHelpers});
        assert.equal(output, 'left Ivan');
      });

      it('should not mutate the custom helpers object', function () {
        var customHelpers = {
          direction: function () {
            return 'left';
          }
        };
        var template = '{{direction}}';
        dummyjson.parse(template, {helpers: customHelpers});
        // Check that a default helper has not been added to the custom helpers
        assert.equal(customHelpers.firstName, undefined);
      });

      it('should not mutate the default helpers object', function () {
        var customHelpers = {
          direction: function () {
            return 'left';
          }
        };
        var template = '{{direction}}';
        dummyjson.parse(template, {helpers: customHelpers});
        assert.equal(dummyjson.helpers.direction, undefined);
      });
    });

    describe('custom partials', function () {
      it('should make custom partials available in the template', function () {
        var customPartials = {
          fullname: '{{firstName}} {{lastName}}'
        };
        var template = '{{>fullname}}';
        var output = dummyjson.parse(template, {partials: customPartials});
        assert.equal(output, 'Ivan Sprowl');
      });
    });
  });
});
