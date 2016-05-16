var gulp            = require('gulp'),
    less            = require('gulp-less'),
    cssmin          = require('gulp-cssmin'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglifyjs'),
    sourcemaps      = require('gulp-sourcemaps'),
    LessAutoprefix  = require('less-plugin-autoprefix');

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('less', function() {
    return gulp.src('less/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('copy_css_dist', function () {
    return gulp.src('css/*.css')
             .pipe(gulp.dest('dist'));
});

gulp.task('dist_css', ['copy_css_dist'], function() {
    return gulp.src('css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy_js_dist', function () {
    return gulp.src('js/*.js')
             .pipe(gulp.dest('dist'));
});

gulp.task('dist_js', ['copy_js_dist'], function() {
    gulp.src('dist/workmate.js')
        .pipe(uglify('workmate.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('dist'));

    gulp.src('dist/boot.js')
        .pipe(uglify('boot.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('dist'));

    gulp.src('dist/vendor.js')
        .pipe(uglify('vendor.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy_js_dist', function () {
    return gulp.src('js/*.js')
             .pipe(gulp.dest('dist'));
});

gulp.task('dist', ['dist_css', 'dist_js']);
