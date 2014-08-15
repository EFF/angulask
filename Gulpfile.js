var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    path = require('path'),
    run = require('gulp-run');

var ENV = process.env.NODE_ENV || 'dev',
    LIVERELOAD_PORT = 35729,
    SERVERPORT = 4000,
    PATHS = {
    base: 'client/',
    index: 'index.html',
    templates: 'templates/**/*.html',
    js: 'scripts/app/',
    styles: 'styles/*.less ',
    dest: 'server/static/'
};

gulp.task('scripts', function () {
    gulp.src(PATHS.base + PATHS.js + 'app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: ENV === 'dev'
        }))
        .pipe(gulpif(ENV === 'production', uglify()))
        .pipe(gulp.dest(PATHS.dest));
});

gulp.task('views', function () {
    gulp.src(PATHS.base + PATHS.index)
        .pipe(gulp.dest(PATHS.dest));
    gulp.src(PATHS.base + PATHS.templates)
        .pipe(gulp.dest(PATHS.dest + 'templates/'));
});

gulp.task('styles', function () {
    gulp.src(PATHS.base + PATHS.styles)
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest(PATHS.dest));
});

gulp.task('build', [
    'scripts',
    'views',
    'styles'
]);

gulp.task('test-client', function(){
    var karma = require('karma').server;
    karma.start({configFile: path.resolve('karma.conf.js')});
});

gulp.task('serve', function () {
    server.listen(SERVERPORT);
    lrserver.listen(LIVERELOAD_PORT);
    console.log('Server started and listening on port', SERVERPORT);
});

gulp.task('start-server', function(){
    run('python server/main.py').exec();
});

gulp.task('watch', function () {
    gulp.watch([PATHS.base + PATHS.styles], ['styles']);
    gulp.watch([PATHS.base + PATHS.index, PATHS.base + PATHS.templates], ['views']);
    gulp.watch([PATHS.base + PATHS.js + '**/*.js'], ['scripts']);
});

gulp.task('dev', [
    // 'test-client',
    'build',
    'start-server',
    'watch'
]);
