'use strict';

var Gulp = require('gulp');
var Connect = require('gulp-connect');
var Concat = require('gulp-concat');

var Source = require('vinyl-source-stream');

var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var WebPackConfig = require('./webpack.config');

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
    Browserify({ entries: Config.paths.mainJs, extensions: ['.jsx', '.js'], debug: true })
        .transform(babelify, { presets: ["es2015", "react"] })
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(Source('bundle.js'))
        .pipe(Gulp.dest(Config.paths.dist + '/scripts'))
        .pipe(Connect.reload());
});

Gulp.task('images', function () {
    Gulp.src(Config.paths.images)
        .pipe(Gulp.dest(Config.paths.dist + '/images'))
        .pipe(Connect.reload());

    Gulp.src('./favicon.ico')
        .pipe(Gulp.dest(Config.paths.dist));
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

Gulp.task('webpack-dev-build', function () {
    Webpack(WebPackConfig, function (err, stats) {
        if (err) {
            console.log(err);
        }
    });
});

Gulp.task('webpack-production-build', function () {
    Webpack(WebPackConfig, function (err, stats) {
        if (err) {
            console.log(err);
        }
    });
});

Gulp.task('webpack-dev-server', function () {
    new WebpackDevServer(Webpack(WebPackConfig), {
        contentBase: 'wwwroot',
        publicPath: '/scripts/',
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true,
            progress: true
        }
    }).listen(9005, 'localhost', function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:9005');
    });
});

Gulp.task('default', ['html', 'css', 'images', 'webpack-dev-server']);