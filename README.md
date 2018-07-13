# ReactJs Grunt Configuration

React Grunt Configuration a small app to show the build process for react app.

## Installation & Usage

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