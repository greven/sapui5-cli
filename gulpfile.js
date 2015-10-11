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
  return gulp.src(['WebContent/Component.js', 'WebContent/**/*.js'])
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'));
});

// JScs
gulp.task('jscs', function() {
  return gulp.src(['WebContent/Component.js', 'WebContent/**/*.js'])
  .pipe(jscs());
});

// Gulp Webserver
gulp.task('webserver', function() {
  connect.server({
    root: 'WebContent',
    port: 8000,
    livereload: true
  });
});

// Watch for changes in the CSS and refresh browser
gulp.task('livereload', function() {
  gulp.src(['WebContent/**/*.js', 'WebContent/css/*.css',
  'WebContent/**/*.view.*', 'WebContent/**/*.fragment.*',
  'WebContent/**/*.properties'])
  .pipe(watch(['WebContent/**/*.js', 'WebContent/css/*.css',
  'WebContent/**/*.view.*', 'WebContent/**/*.fragment.*',
  'WebContent/**/*.properties']))
  .pipe(connect.reload());
});

// Precompile SASS to CSS
gulp.task('sass', function() {
  gulp.src('WebContent/css/scss/*.scss')
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(gulp.dest('WebContent/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('WebContent/css'));
});

// SAPUI5 Component Preload
gulp.task('preload', function() {
  return merge(
    // TODO: Uglify is giving an error... disabled for now.
    // JS Files
    // gulp.src([
    //   'WebContent/**/*.js'
    // ]).pipe(uglify()),

    // XML Files
    gulp.src([
      'WebContent/**/*.fragment.xml',
      'WebContent/**/*.view.xml'
    ]).pipe(prettyData({
      type: 'minify'
    })),

    // Others
    gulp.src([
      'WebContent/**/*.fragment.html',
      'WebContent/**/*.fragment.json',
      'WebContent/**/*.view.html',
      'WebContent/**/*.view.json',
      'WebContent/**/*.properties'
    ])
  )
  .pipe(ui5Preload({
    prefix: ''
  }))
  .pipe(gulp.dest('./WebContent'));
});

// Configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('WebContent/**/*.js', ['jshint']);
  gulp.watch('WebContent/css/scss/*.scss', ['sass']);
});
