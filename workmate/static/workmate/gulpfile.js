var gulp        = require('gulp'),
    less        = require('gulp-less'),
    minify      = require('gulp-minify'),
    rename      = require('gulp-rename');

gulp.task('less', function() {
    gulp.src('./less/workmate.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compressjs', function() {
    gulp.src('js/workmate.js')
        .pipe(gulp.dest('dist'));
    gulp.src('dist/workmate.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('dist'));
    gulp.src('dist/boot.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('dist'));
    gulp.src('dist/vendor.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('dist'));
});