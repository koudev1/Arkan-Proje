const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const StaticServer = require('./server.js');


async function styles() {
    return gulp.src(['assets/css/**/*.css', 'assets/css/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
}

async function js() {
    return gulp.src('assets/js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
}

async function watch() {
    livereload.listen();
    gulp.watch(['assets/css/**/*.css', 'assets/css/**/*.scss'], styles);
    gulp.watch('assets/js/*.js', js);

}





exports.default = gulp.series(
    // html,
    styles,
    js,
    watch
)


