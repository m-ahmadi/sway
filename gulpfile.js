const CONF = requre("./build/config");

const gulp = require("gulp");
const shell = require("gulp-shell");

gulp.task("sass", shell.task([ CONF.CMD.sass ]));
gulp.task("sass-w", shell.task([ CONF.CMD.sassW ]));
gulp.task("temp", shell.task([ CONF.CMD.temp ]));
gulp.task("temp-w", () => {
	livereload.listen();
	gulp.watch(`${CONF.INP.TEMP}/**`, ["temp"]);
});
gulp.task("js", shell.task([ CONF.CMD.js ]));
gulp.task("js-w", shell.task([ CONF.CMD.jsW ]));

gulp.task( "default", ["sass", "temp", "js"] );
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// livereload
const livereload = require("gulp-livereload");
const changed = require('gulp-changed');

gulp.task("live-html", () => {
	gulp.src("dist/index.html")
		.pipe( livereload() );
});
gulp.task("live-css", () => {
	gulp.src("dist/css/**/*.css")
	//	.pipe( changed("dist/css/") )
		.pipe( livereload() );
});
gulp.task("live-js", () => {
	gulp.src("dist/js/app/**/*.js")
	//	.pipe( changed("dist/js/app/") )
		.pipe( livereload() );
});
gulp.task("livereload", () => {
	livereload.listen();
	
	gulp.watch("dist/index.html", ["live-html"]);
	gulp.watch("dist/css/**/*", ["live-css"]);
	gulp.watch("dist/js/app/**/*", ["live-js"]);
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@