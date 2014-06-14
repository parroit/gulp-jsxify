# [gulp](http://gulpjs.com)-jsxify [![Build Status](https://travis-ci.org/parroit/gulp-jsxify.svg?branch=master)](https://travis-ci.org/parroit/gulp-jsxify)

> Precompile HTML templates into [Facebook React](http://facebook.github.io/react/) JSX

*Issues with the output should be reported on the React [issue tracker](https://github.com/facebook/react/issues).*

*You'll find an introductory blog post [here](http://www.parro.it/2014/06/14/gulp-jsxify-transpile-your-html-templates-to-react-jsx-files/)*


## Install

```bash
$ npm install --save-dev gulp-jsxify
```


## Usage

```js
var gulp = require('gulp');
var jsxify = require('gulp-jsxify');

gulp.task('default', function() {
    
    return gulp.src('template.html')
        .pipe(jsxify({
            requires:{
                AnotherWidget: './another-widget'
            }
        }))
        .pipe(gulp.dest('./jsx-files'));
});

```

## Templates content is wrapped with the following code:

```js
/** @jsx React.DOM */
'use strict';

//here we add requires as defined below
            
module.exports = function(args){ 
            return (
                    //here we add template content
            
            );
};

```





## API

### jsxify(options)


#### options.requires

Type: `object`  
Default: `{React: 'react'}`

Define a set of React widget required by your templates.
React dependency is inserted by defaqult if not present.

_Relative requirements must be relative to the folder where gulp.dest() final js files_ 

## License

[MIT](http://opensource.org/licenses/MIT) © [Andrea Parodi](http://parro.it)