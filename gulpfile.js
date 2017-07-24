"use strict";
var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var cssmin = require("gulp-cssmin");

gulp.task("browser-sync", function()
{   
    browserSync.init
    ({
        server: { baseDir: "./docs" }
    });
});

gulp.task("sass",function()
{
    return gulp.src("src/scss/*")
    .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("docs/css"));
});

gulp.task("js",function()
{
    // 
});


gulp.task("watch", function()
{
    gulp.watch("src/scss/*.scss", ['sass']);
    // gulp.watch("src/js/*.js", ['js']);
    gulp.watch("docs/*/*").on('change', browserSync.reload);
    gulp.watch("docs/*").on('change', browserSync.reload);
});

gulp.task('default',['browser-sync','watch']);
