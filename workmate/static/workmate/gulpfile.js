var gulp            = require('gulp'),
    less            = require('gulp-less'),
    cssmin          = require('gulp-cssmin'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglifyjs'),
    sourcemaps      = require('gulp-sourcemaps'),
    LessAutoprefix  = require('less-plugin-autoprefix');

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('less', function() {

    gulp.src('./less/workmate.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./dist/'));

    gulp.src('./less/workmate.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('js', function() {

    gulp.src('js/workmate.js')
        .pipe(gulp.dest('dist'));

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