const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const extender = require("gulp-html-extend");

const browser_sync = done =>
{
    browserSync.init({ server: { baseDir: "./docs" } });
    done();
};

const reload = done =>
{
    browserSync.reload();
    done();
}

const html = () => gulp.src("src/html/*.html")
.pipe( extender({ annotations:true, verbose:false }) )
.pipe( gulp.dest( "./docs" ) );

const css = () => gulp.src( "src/scss/*.scss" )
.pipe( sass({ outputStyle: "compressed" } ).on( "error", sass.logError) )
.pipe( rename({ suffix: ".min" }) ).pipe( gulp.dest("docs/css") );

const js = () => {};

const watch = () =>
{
    gulp.watch("src/html/*.html", gulp.series( html , reload ) );
    gulp.watch("src/scss/*.scss", gulp.series( css , reload ) );
    gulp.watch("src/js/*.js", gulp.series( js , reload ) );
};

exports.default = gulp.series( browser_sync, watch );
