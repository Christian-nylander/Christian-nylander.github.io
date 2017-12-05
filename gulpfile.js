var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
const cssScss = require('gulp-css-scss');

var SRCPATHS = {
    sassSource : 'app/scss/',
    htmlSource : 'app/*.html',
    jsSource : 'app/js/**'
}

var APPPATH = {
    root : 'public/',
    css : 'src/',
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

gulp.task('sass', function(){
    return gulp.src(APPPATH.css + '/*.css')
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css + '/*.css'))
        //important that the pipes are in the correct order
});

gulp.task('css-scss', () => {
    return gulp.src(APPPATH.css + '/*.css')
      .pipe(cssScss())
      .pipe(gulp.dest(SRCPATHS.sassSource + '/*.scss'));
  });

gulp.task('watch', ['copy', 'sass', 'css-scss', 'clean-scripts', 'scripts'], function() {
    gulp.watch([SRCPATHS.htmlSource], ['copy']);
    gulp.watch([SRCPATHS.jsSource], ['scripts']);
    gulp.watch([SRCPATHS.sassSource], ['css-scss']);
});

gulp.task('default', ['watch']);