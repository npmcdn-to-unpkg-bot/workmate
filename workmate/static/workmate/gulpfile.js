var gulp            = require('gulp'),
    less            = require('gulp-less'),
    cssmin          = require('gulp-cssmin'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    sourcemaps      = require('gulp-sourcemaps'),
    runSequence     = require('gulp-run-sequence'),
    LessAutoprefix  = require('less-plugin-autoprefix');

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });


/*******************************
             Tasks
*******************************/

gulp.task('build', function(cb) {
    runSequence(['build-css', 'build-javascript'], cb);
});

gulp.task('build-css', function(cb) {
    runSequence('build-less', 'move-css', 'compress-css', cb);
});

gulp.task('build-javascript', function(cb) {
    runSequence('move-js', 'compress-js', cb);
});


/*******************************
             Css Tasks
*******************************/

gulp.task('build-less', function() {
    return gulp.src('less/*.less')
    .pipe(less({plugins: [autoprefix]}))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('move-css', function() {
    return gulp.src('css/*.css')
    .pipe(gulp.dest('dist'));
});

gulp.task('compress-css', function() {
    return gulp.src(['dist/*.css', '!dist/**.min.css'])
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});


/*******************************
             JS Tasks
*******************************/

gulp.task('move-js', function() {
    return gulp.src('js/*.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('compress-js', function() {
    return gulp.src(['dist/*.js', '!dist/**.min.js'])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});
