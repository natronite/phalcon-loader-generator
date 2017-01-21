/*
 * grunt-phalcon-loader-generator
 * https://github.com/natronite/phalcon-loader-generator
 *
 * Copyright (c) 2017 Nathanaël Mägli
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('phalconLoader', 'This Plugin generates a loader.php file for namespaces with phalcon', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            namespace: '',
            prefix: '$config->application->appDir'
        });

        options.namespace.trim('\\');
        if (options.namespace.length > 0) {
            options.namespace += '\\';
        }

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            // Create a cmd var even if not used to reduce errors
            var cwd = '';
            if (f.cwd) {
                cwd = f.cwd.trim('/') + '/';
            }

            // Check the src files before using them
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(cwd + filepath)) {
                    grunt.log.warn('Source file "' + cwd + filepath + '" not found.');
                    return false;
                } else {
                    if (filepath !== '' && grunt.file.isDir(cwd, filepath)) {
                        return true;
                    }
                    return false;
                }
            });



            // Output variables
            function toNamespace(str) {
                return str.replace(/(^(\w)|[^A-Za-z0-9]+(.))/g, function(match, chr) {
                    if (match.startsWith('/')) {
                        return '\\' + chr.slice(-1).toUpperCase();
                    }
                    return chr.slice(-1).toUpperCase();
                });
            }

            var contents = '<?php\n';
            contents += '$loader = new \\Phalcon\\Loader();\n';
            contents += '$loader->registerNamespaces([\n';

            src.map(function(filename) {
                // Manage Directories
                contents += '\t\'' + options.namespace + toNamespace(filename) + '\' => ' + options.prefix + " . \'" + filename + '\',\n';
            });

            contents += ']);\n';
            contents += '$loader->register();\n';

            // Write out the file
            grunt.file.write(f.dest, contents);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });
};
