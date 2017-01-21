/*
 * grunt-phalcon-loader-generator
 * https://github.com/natronite/phalcon-loader-generator
 *
 * Copyright (c) 2017 Nathanaël Mägli
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        phalconLoader: {
            default: {
                options: {},
                files: {
                    'tmp/default': ['test/test-src/**']
                }
            },
            custom_namespace: {
                options: {
                    namespace: 'Natronite',
                    prefix: '__DIR__ . \'/my-application/src/\''
                },
                files: [{
                    src: ['**'],
                    dest: 'tmp/custom_namespace',
                    cwd: 'test/test-src'
                }]
            },
            folders: {
                options: {
                    namespace: 'Folders'
                },
                files: [{
                    src: ['api-v3/**', 'util/common/**'],
                    dest: 'tmp/folders',
                    cwd: 'test/test-src'
                }]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'phalconLoader', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
