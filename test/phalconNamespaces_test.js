'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.phalconLoader = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    default: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default');
        var expected = grunt.file.read('test/expected/default');
        test.equal(actual, expected, 'All subfolder should have their namespace');

        test.done();
    },
    custom_namespace: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom_namespace');
        var expected = grunt.file.read('test/expected/custom_namespace');
        test.equal(actual, expected, 'Every namespace should start with the specified namespace.');

        test.done();
    },
    folders: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/folders');
        var expected = grunt.file.read('test/expected/folders');
        test.equal(actual, expected, 'Only the specified folders should be in the file.');

        test.done();
    },
};
