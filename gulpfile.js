var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var config = {
    adminLTEDir: './bower_components/admin-lte.scss',
    bootstrapDir: './node_modules/bootstrap-sass',
    publicDir: './workmate/static/dist',
    scssDir: './workmate/static/scss',
    siteJSDir: './workmate/static/js'
};

/*******************************
    CSS Tasks
*******************************/

gulp.task('css_adminlte', function() {
    return gulp.src(config.scssDir + '/adminlte/*.scss')
    .pipe($.sourcemaps.init())
    .pipe(sass({outputStyle: 'compact'}))
    .pipe($.postcss([
        require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('css_bootstrap', function() {
    return gulp.src(config.scssDir + '/bootstrap/*.scss')
    .pipe($.sourcemaps.init())
    .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets']
    }))
    .pipe($.postcss([
        require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('css_site', function() {
    return gulp.src(config.scssDir + '/style/*.scss')
    .pipe($.sourcemaps.init())
    .pipe(sass({}))
    .pipe($.postcss([
        require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.publicDir + '/css'));
});

/*******************************
    JS Tasks
*******************************/

gulp.task('js_bootstrap', function() {
    return gulp.src([config.bootstrapDir + '/assets/javascripts/bootstrap.js'])
    .pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('js_site', function() {
    return gulp.src(config.siteJSDir + '/**.js')
    .pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('js_adminlte', function() {
    return gulp.src(config.adminLTEDir + '/javascripts/app.js')
    .pipe($.rename('adminlte.js'))
    .pipe(gulp.dest(config.publicDir + '/js'));
});

/*******************************
    Misc Tasks
*******************************/

gulp.task('fonts_bootstrap', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/bootstrap/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});

/*******************************
    Minify Tasks
*******************************/

gulp.task('cssmin', ['css_bootstrap', 'css_adminlte', 'css_site'], function () {
  return gulp.src([config.publicDir + '/css/**.css', '!' + config.publicDir + '/css/**.min.css'])
    .pipe($.csso())
    .pipe($.rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('jsmin', ['js_bootstrap', 'js_adminlte', 'js_site'], function() {
  gulp.src([config.publicDir + '/js/**.js', '!' + config.publicDir + '/js/**.min.js'])
    .pipe(uglify())
    .pipe($.rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(config.publicDir + '/js'))
});

/*******************************
    Run All Tasks
*******************************/

gulp.task('default', function (cb) {
    runSequence(['fonts_bootstrap', 'cssmin', 'jsmin'], cb);
});