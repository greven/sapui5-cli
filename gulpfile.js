var gulp  = require('gulp'),
merge = require('merge2'),
uglify = require('gulp-uglify'),
prettyData = require('gulp-pretty-data'),
jshint = require('gulp-jshint'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
rename = require('gulp-rename'),
connect = require('gulp-connect'),
watch = require('gulp-watch'),
ui5Preload = require('gulp-openui5-preload');

// Default task
gulp.task('default', ['webserver', 'watch', 'livereload'], function() {
    gulp.start('preload');
    gulp.start('sass');
});

// JShint task
gulp.task('jshint', function() {
    return gulp.src('WebContent/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
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
    gulp.src(['WebContent/**/*.js', 'WebContent/css/*.css'])
    .pipe(watch(['WebContent/**/*.js', 'WebContent/css/*.css']))
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

// Configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('WebContent/**/*.js', ['jshint']);
    gulp.watch('WebContent/css/scss/*.scss', ['sass']);
});
