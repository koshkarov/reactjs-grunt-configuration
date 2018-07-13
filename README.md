# ReactJs Grunt build configuration

ReactJs Grunt build configuration is a small project to show the build process for ReatJs app using Grunt, Browserify, Babelify, etc.
Sometimes it is required to integrate ReatJs app in to the **existing build process using Grunt** and without Webpack.

In this configuration were used the following Grunt tasks:
 - borwserify (with babelify) - builds a bundle and transpiles ES6/JSX to plain javascript. 
 - uglify, htmlmin, cssmin - compress JavaScript, CSS, and HTML files respectively.
 - clean - removes files and folders. 
 - concat - concatenates files (in this project CSS files)
 - template - interpolates template files with any data you provide and saves the result to another file.
 - copy - copies files. 
 - watch - runs predefined tasks whenever watched file patterns are added, changed or deleted.
 - run - in this project runs Jest tests.

## Installation & Unsage

For running you will need npm package. For the first use please run:

```sh
npm install
```

## Development

```sh
grunt react_build_debug
```
directory ./client will be created with non-minified files.

### Tests

Jest tests are configured for ReactJs app. To run tests using Grunt please execute:

```sh
grunt run:react_jest_tests
```

or NPM:

```sh
npm test
```


## Production 
You could build your project for production:

```sh
grunt react_build_release
```
directory ./client will be created with minified files.