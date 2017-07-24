"use strict";
var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var cssmin = require("gulp-cssmin");
var extender = require("gulp-html-extend");


gulp.task("browser-sync", function()
{   
    browserSync.init
    ({
        server: { baseDir: "./docs" }
    });
});

gulp.task("html",function()
{
    gulp.src('src/html/*.html')
        .pipe(extender({annotations:true,verbose:false}))
        .pipe(gulp.dest('./docs'));
});

gulp.task("css",function()
{
    return gulp.src("src/scss/*.scss")
    .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("docs/css"));
});

gulp.task("js",function()
{
    // Nothing used
});

gulp.task("watch", function()
{
    gulp.watch("src/html/*.html", ["html"]);
    gulp.watch("src/scss/*.scss", ["css"]);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("docs/*/*").on('change', browserSync.reload);
    gulp.watch("docs/*").on('change', browserSync.reload);
});

gulp.task('default',['browser-sync','watch']);
