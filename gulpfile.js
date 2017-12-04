var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

var SRCPATHS = {
    sassSource : 'app/scss/*.scss',
    htmlSource : 'app/*.html',
    jsSource : 'app/js/**'
}

var APPPATH = {
    root : 'public/',
    css : 'src/css',
    js : 'src/js'
}

gulp.task('clean-scripts', function() {
    return gulp.src(APPPATH.js + '/*.js', {read: false, force: true })
        .pipe(clean());
});

gulp.task('scripts', ['clean-scripts'], function() {
    gulp.src(APPPATH.js)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(SRCPATHS.jsSource))
});

gulp.task('copy', function() {
    gulp.src(SRCPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root))
});

gulp.task('watch', ['copy', 'clean-scripts', 'scripts'], function() {
    gulp.watch([SRCPATHS.htmlSource], ['copy']);
    gulp.watch([SRCPATHS.jsSource], ['scripts']);
});

gulp.task('default', ['watch']);