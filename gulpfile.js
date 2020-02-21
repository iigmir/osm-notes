var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var cssmin = require("gulp-cssmin");
var extender = require("gulp-html-extend");
var fileinclude = require('gulp-file-include');

const browser_sync = () =>
{
    return browserSync.init({ server: { baseDir: "./docs" } });
};

const html = () =>
{
    return gulp.src('src/html/*.html')
        .pipe(extender({annotations:true,verbose:false}))
        .pipe(gulp.dest('./docs'));;
};

const css = () =>
{
    return gulp.src("src/scss/*.scss")
    .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("docs/css"));
};

const js = () => {};

const watch = () =>
{
    gulp.watch("src/html/*.html", () => html() );
    gulp.watch("src/scss/*.scss", () => css() );
    gulp.watch("src/js/*.js", () => js() );
    gulp.watch("docs/*/*").on("change", browserSync.reload);
    gulp.watch("docs/*").on("change", browserSync.reload);
};

// exports.build = build;
exports.default = gulp.series( watch, browser_sync );
