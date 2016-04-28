﻿'use strict';

var Gulp = require('gulp');
var Connect = require('gulp-connect');
var Concat = require('gulp-concat');
var Lint = require('gulp-eslint');

var Browserify = require('browserify');
var babelify = require('babelify');

var Source = require('vinyl-source-stream');

var Config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './pages/*.html',
        js: [
            './scripts/**/*.jsx',
            './scripts/**/*.js'
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css',
            'styles/default.css'
        ],
        images: './images/*',
        dist: './wwwroot',
        mainJs: 'scripts/main.jsx'
    }
};

Gulp.task('html', function () {
    Gulp.src(Config.paths.html)
        .pipe(Gulp.dest(Config.paths.dist))
        .pipe(Connect.reload());
});

Gulp.task('css', function () {
    Gulp.src(Config.paths.css)
        .pipe(Concat('bundle.css'))
        .pipe(Gulp.dest(Config.paths.dist + '/css'));
});

Gulp.task('js', function () {
    Browserify({entries: Config.paths.mainJs, extensions: ['.jsx', '.js'], debug: true})
        .transform(babelify, { presets: ["es2015", "react"] })
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(Source('bundle.js'))
        .pipe(Gulp.dest(Config.paths.dist + '/scripts'))
        .pipe(Connect.reload());
});

Gulp.task('images', function() {
    Gulp.src(Config.paths.images)
        .pipe(Gulp.dest(Config.paths.dist + '/images'))
        .pipe(Connect.reload());

    Gulp.src('./favicon.ico')
        .pipe(Gulp.dest(Config.paths.dist));
});

Gulp.task('lint', function () {
    return Gulp.src(Config.paths.js)
        .pipe(Lint())
        .pipe(Lint.format());
});

Gulp.task('connect', function () {
    Connect.server({
        root: ['wwwroot'],
        port: Config.port,
        base: Config.devBaseUrl,
        livereload: true
    });
});

Gulp.task('watch', function () {
    Gulp.watch(Config.paths.html, ['html']);
    Gulp.watch(Config.paths.js, ['js', 'lint']);
});

Gulp.task('default', ['html', 'css', 'js', 'images', 'lint', 'connect', 'watch']);