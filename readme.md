# [gulp](http://gulpjs.com)-jsxify [![Build Status](https://travis-ci.org/parroit/gulp-jsxify.svg?branch=master)](https://travis-ci.org/parroit/gulp-jsxify)

> Precompile HTML templates into [Facebook React](http://facebook.github.io/react/) JSX

*Issues with the output should be reported on the React [issue tracker](https://github.com/facebook/react/issues).*


## Install

```bash
$ npm install --save-dev gulp-jsxify
```


## Usage

```js
var gulp = require('gulp');
var jsxify = require('gulp-jsxify');

gulp.task('default', function () {
	return gulp.src('template.jsx')
		.pipe(react())
		.pipe(gulp.dest('dist'));
});

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

The JSX directive `/** @jsx React.DOM */` is automagically prepended to `.jsx` files if missing.


## API

### jsxify(options)

#### options.requires

Type: `object`  
Default: `{React: 'react'}`

Define a set of React widget required by yuor templates.
React dependency is inserted by defaqult if not present.


## License

[MIT](http://opensource.org/licenses/MIT) © [Andrea Parodi](http://parro.it)