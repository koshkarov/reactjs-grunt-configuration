# ReactJs Grunt Configuration

React Grunt Configuration a small app to show the build process for react app.
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

## Production 
You could build your project for production:

```sh
grunt react_build_release
```
directory ./client will be created with minified files.