var gulp  = require('gulp'),
    merge = require('merge2'),
    uglify = require('gulp-uglify'),
    prettyData = require('gulp-pretty-data'),
    ui5Preload = require('gulp-openui5-preload'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass');


// JShint task
gulp.task('jshint', function() {
  return gulp.src('WebContent/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Precompile SASS to CSS
gulp.task('build-css', function() {
  return gulp.src('WebContent/css/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('WebContent/css'));
});

// SAPUI5 Component Preload
gulp.task('preload', function() {
    return merge(
        // JS Files
        gulp.src([
            'WebContent/**/*.js'
        ]).pipe(uglify()),

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

// Default task
gulp.task('default', ['watch'], function() {
    gulp.start('preload');
    gulp.start('build-css');
});

// Configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('WebContent/**/*.js', ['jshint']);
    gulp.watch('WebContent/css/scss/*.scss', ['build-css']);
});
