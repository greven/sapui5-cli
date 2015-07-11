var gulp  = require('gulp'),
merge = require('merge2'),
uglify = require('gulp-uglify'),
prettyData = require('gulp-pretty-data'),
ui5Preload = require('gulp-openui5-preload'),
jshint = require('gulp-jshint'),
sass = require('gulp-sass'),
connect = require('gulp-connect');


// Default task
gulp.task('default', ['webserver', 'livereload', 'watch'], function() {
    gulp.start('preload');
    gulp.start('build-css');
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
    gulp.src(['WebContent/*.html', 'WebContent/*.js', 'WebContent/**/*.js',
    'WebContent/**/*.css', 'WebContent/**/*.xml', 'WebContent/**/*.json'])
    .pipe(connect.reload());
});

// Precompile SASS to CSS
gulp.task('build-css', function() {
    gulp.src('WebContent/css/scss/*.scss')
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

// Configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('WebContent/**/*.js', ['jshint']);
    gulp.watch('WebContent/css/scss/*.scss', ['build-css']);
});
