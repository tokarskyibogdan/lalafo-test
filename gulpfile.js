const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nib = require('nib');
const plumber = require('gulp-plumber');

gulp.task('stylus', function () {
    return gulp
        .src('./stylus/*.styl' )
        .pipe(plumber())
        .pipe( stylus({
            compress: true,
            use: [nib()]
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
    gulp.watch('./**/*.styl', ['stylus']);
});

gulp.task('default', ['watch', 'stylus']);
