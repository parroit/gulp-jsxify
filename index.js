'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var htmlTags = require('html-tags');

function pseudoGuessTags(html) {
    var tagsRe = /<\s*(\w+)/g;
    var match = tagsRe.exec(html);
    var results = {};
    var tag;

    while (match !== null) {
        if (match) {
            tag = match[1];
            if ( htmlTags.indexOf( tag ) !== -1 ) {
                tag = 'React';
            }
            
            results[tag] = true;    
        }
        match = tagsRe.exec(html);
        
    }
    return Object.keys(results);
}

module.exports = function(options) {
    options = options || {};
    options.requires = options.requires || [];
    options.requires.React = options.requires.React || 'react';

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
        var usedTags = pseudoGuessTags(str);
        
        var requiresTagNames = Object.keys(options.requires);
        
        var requires = requiresTagNames
            
            .filter (function(tag){
                return usedTags.indexOf(tag) > -1;
            })

            .map(function(reqName) {
                var reqPath = options.requires[reqName];

                return 'var ' + reqName + ' = require(\'' + reqPath + '\');';
            })



            .join('\n');

        usedTags.forEach(function(tag){
            if (requiresTagNames.indexOf( tag ) === -1 ) {
                gutil.log('WARNING: unknown tag ' + tag);
            }
        });    

        var jsxContent = '/** @jsx React.DOM */\n' +
            '\'use strict\';\n' +
            requires + '\n' +
            'module.exports = function(args){ \n' +
            '    return (\n' +
            str +
            '    );\n' +
            '};';



        file.contents = new Buffer(jsxContent);
        file.path = gutil.replaceExtension(file.path, '.jsx');
        this.push(file);

        cb();
    });
};
