var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass')(require('sass'));
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var rev = require('gulp-rev');
var del = require('del');

var paths = {
  scripts: [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
//    'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
//    'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
//    'node_modules/lightgallery/lightgallery.min.js',
//    'node_modules/lightgallery/plugins/thumbnail/lg-thumbnail.min.js',
//    'node_modules/js-cookie/src/js.cookie.js',
    'resources/js/*.js',
    'resources/js/**/*.js'],
  styles: [
    'resources/scss/*.scss',
    'resources/scss/**/*.scss',
//    'node_modules/lightgallery/scss/lightgallery-bundle.scss'
  ]
};

gulp.task('styles', function() {
  del(['./static/css/*.css']);
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concatCss('all.min.css', {rebaseUrls:false}))
    .pipe(cleanCSS({
      compatibility: "ie8",
      keepSpecialComments : 0
    }))
    .pipe(rev())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./static/css/'));

});

gulp.task('scripts', function() {
  del(['./static/js/*.js']);
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('all.min.js'))
    .pipe(rev())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/js/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./static/js/'));
});

//gulp.task('watch', ['scripts', 'styles'], function() {
//  gulp.watch(paths.scripts, ['scripts']);
//  gulp.watch(paths.styles, ['styles']);
//
//});
gulp.task('build', gulp.series('scripts', 'styles'));
