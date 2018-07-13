module.exports = function (grunt) {

    let concat = {};
    let clean = {};
    let uglify = {};
    let copy = {};
    let htmlmin = {};
    let cssmin = {};
    let browserify = {};
    let watch = {};
    let template = {};
    let run = {};

    /* React configuration. */
    
    const reactSourcePath = './source';
    const reactCompiledPath = './client';
    const reactHtmlPathDest = './client/index.html'
    const reactTargetName = "react";
    const reactFileName = "react_main";

    /* ### TASK CONFIGURATIONS ### */ 

    /* Clean compiled files. */
    clean[reactTargetName] = [
        `${reactCompiledPath}`
    ];

    /* Concatenate all CSS files to one. */
    const cssConcatSourceTemplate = `${reactSourcePath}/**/**.css`;
    const cssDestinationFile = `${reactCompiledPath}/css/${reactFileName}.css`;

    concat[reactTargetName] = {
        src: [cssConcatSourceTemplate],
        dest: cssDestinationFile
    };

    /* Convert JSX to JS, prepare JS files for a browser and copy to the destination. */
    const jsSourceFile = `${reactSourcePath}/app.js`;
    const jsDestinationFile = `${reactCompiledPath}/js/${reactFileName}.js`;

    browserify[reactTargetName] = { 
        options: {
            transform: [['babelify', {presets: ['es2015', 'react']}]]
        },
        files: {
            [jsDestinationFile]: jsSourceFile
        }
    };

    /* Replace js/css placeholders and copy html file to destination. */
    const applicationData = {
        css: [
            './css/react_main.css'
        ],
        js: [
            './js/react_main.js'
        ]
    };

    var jsFiles = "";
    var cssFiles = "";
    
    applicationData.css.forEach(function(item) {
        cssFiles = cssFiles + `\n<link rel="stylesheet" type="text/css" href=${item}>`;
    });

    applicationData.js.forEach(function(item) {
        jsFiles = jsFiles + `\n<script type="text/javascript" src=${item}></script>`;
    });

    template[reactTargetName] = {
        options: {
            data: {
                appName: '<%= pkg.name %>' + '-react',
                productVersion: '<%= pkg.version %>',
                reactEmbeddedCssFiles: cssFiles,
                reactEmbeddedJsFiles: jsFiles
            }
        },
        files: {
            [`${reactHtmlPathDest}`]: `${reactSourcePath}/index.template.html`,
        }
    };

    /* Uglify react JS file. */
    uglify[reactTargetName] = { 
        files: {
        [jsDestinationFile]: jsDestinationFile
    }
    };

    /* Copy bootstrap CSS/JS files. */
    copy[reactTargetName] = {
        files: {
            [`${reactCompiledPath}/css/bootstrap.min.css`]: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
            [`${reactCompiledPath}/js/bootstrap.min.js`]: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
            [`${reactCompiledPath}/js/jquery.min.js`]: 'node_modules/jquery/dist/jquery.min.js',
        }
    }

    /* Minify HTML files. */
    htmlmin[reactTargetName] = {
        options: {
            removeComments: true,
            collapseWhitespace: true
        },
        files: {
            [`${reactHtmlPathDest}`]: `${reactHtmlPathDest}`
        }
    };

    /* Minify react CSS file. */
    cssmin[reactTargetName] = {
        files: {
            [cssDestinationFile]: cssDestinationFile 
        }
    };

    /* Watch for any changes in react app. 
    There are three separate watches for css, js, and html files. */
    watch[reactTargetName + '_css'] = {
        files: [`${reactSourcePath}/**/*.css`],
        tasks: [`concat:${reactTargetName}`],
        options: {
            livereload: true
        }
    };

    watch[reactTargetName + '_js'] = {
        files: [`${reactSourcePath}/**/*.js`],
        tasks: [`browserify:${reactTargetName}`],
        options: {
            livereload: true
        }
    };

    watch[reactTargetName + '_hmtl'] = {
        files: [`${reactSourcePath}/**/*.html`],
        tasks: [`template:${reactTargetName}`],
        options: {
            livereload: true
        }
    };

    /* Jest tests */
    jestTestsTaskName = reactTargetName + '_jest_tests';
    run[jestTestsTaskName] = {
        cmd: 'executable',
        args: [
          'arg1',
          'arg2'
        ]
      };


    /* Generate task names for react. */

    var reactTasks = {
        debug: [
            "clean", 
            "browserify", 
            "concat", 
            "copy", 
            "template"
        ].map(x => x + `:${reactTargetName}`),
        release: [
            "clean", 
            "browserify", 
            "concat", 
            "copy", 
            "template", 
            "htmlmin", 
            "uglify", 
            "cssmin"
        ].map(x => x + `:${reactTargetName}`)
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch:watch,
        copy:copy,
        concat:concat,
        clean:clean,
        uglify:uglify,
        template:template,
        browserify: browserify,
        htmlmin: htmlmin,
        cssmin: cssmin,
        run:run
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('react_build_debug', reactTasks.debug);
    grunt.registerTask('react_build_release', reactTasks.release);

}