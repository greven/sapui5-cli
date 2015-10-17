var gulp = require('gulp');
var merge = require('merge2');
// var uglify = require('gulp-uglify');
var prettyData = require('gulp-pretty-data');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var ui5Preload = require('gulp-openui5-preload');
// var TestServer = require('karma').Server;

// Default task
gulp.task('default', ['webserver', 'watch', 'livereload'], function() {
  gulp.start('preload');
  gulp.start('sass');
});

// TODO: Implement testing
// Build
// gulp.task('test', function(done) {
//   new TestServer({configFile: __dirname + '/karma.conf.js'}, done).start();
// });

// JShint task
gulp.task('jshint', function() {
  return gulp.src(['webapp/Component.js', 'webapp/**/*.js'])
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'));
});

// JScs
gulp.task('jscs', function() {
  return gulp.src(['webapp/Component.js', 'webapp/**/*.js'])
  .pipe(jscs());
});

// Gulp Webserver
gulp.task('webserver', function() {
  connect.server({
    root: 'webapp',
    port: 8000,
    livereload: true
  });
});

// Watch for changes in the CSS and refresh browser
gulp.task('livereload', function() {
  gulp.src(['webapp/**/*.js', 'webapp/css/*.css',
  'webapp/**/*.view.*', 'webapp/**/*.fragment.*',
  'webapp/**/*.properties'])
  .pipe(watch(['webapp/**/*.js', 'webapp/css/*.css',
  'webapp/**/*.view.*', 'webapp/**/*.fragment.*',
  'webapp/**/*.properties']))
  .pipe(connect.reload());
});

// Precompile SASS to CSS
gulp.task('sass', function() {
  gulp.src('webapp/css/scss/*.scss')
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(gulp.dest('webapp/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('webapp/css'));
});

// SAPUI5 Component Preload
gulp.task('preload', function() {
  return merge(
    // TODO: Uglify is giving an error... disabled for now.
    // JS Files
    // gulp.src([
    //   'webapp/**/*.js'
    // ]).pipe(uglify()),

    // XML Files
    gulp.src([
      'webapp/**/*.fragment.xml',
      'webapp/**/*.view.xml'
    ]).pipe(prettyData({
      type: 'minify'
    })),

    // Others
    gulp.src([
      'webapp/**/*.fragment.html',
      'webapp/**/*.fragment.json',
      'webapp/**/*.view.html',
      'webapp/**/*.view.json',
      'webapp/**/*.properties'
    ])
  )
  .pipe(ui5Preload({
    prefix: ''
  }))
  .pipe(gulp.dest('./webapp'));
});

// Configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('webapp/**/*.js', ['jshint']);
  gulp.watch('webapp/css/scss/*.scss', ['sass']);
});
