'use strict';
var gutil = require('gulp-util');
var through = require('through2');


module.exports = function(options) {
    options = options || {};
    options.requires = options.requires || [];
    options.requires.React = 'react';

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-jsxify', 'Streaming not supported'));
            return cb();
        }

        var str = file.contents.toString();
        var requires = Object.keys(options.requires)
            
            .map(function(reqName) {
                var reqPath = options.requires[reqName];
                return 'var ' + reqName + ' = require(\'' + reqPath +'\');' ;
            })

            .join('\n');
        

        var jsxContent = '/** @jsx React.DOM */\n' +
            '\'use strict\';\n' +
            requires + '\n' +
            'module.exports = function(args){ \n' +
            '    return (\n' +
            str +
            '    );\n' +
            '}';

        file.contents = new Buffer(jsxContent);
        file.path = gutil.replaceExtension(file.path, '.jsx');
        this.push(file);

        cb();
    });
};
