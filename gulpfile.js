const CONF = require("./build/config");
const gulp = require("gulp");
const shell = require("gulp-shell");
const livereload = require("gulp-livereload");

gulp.task("html", shell.task([ CONF.C.html ]));
gulp.task("sass", shell.task([ CONF.C.sass ]));
gulp.task("temp", shell.task([ CONF.C.temp ]));
gulp.task("js", shell.task([ CONF.C.js ]));

gulp.task("html-w", shell.task([ CONF.C.w.html ]));
gulp.task("sass-w", shell.task([ CONF.C.w.sass ]));
gulp.task("temp-w", () => {
	livereload.listen();
	gulp.watch(`${CONF.I.TEMP}/**`, ["temp"]);
});
gulp.task("js-w", shell.task([ CONF.C.w.js ]));

gulp.task( "default", ["html", "sass", "temp", "js"] );
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// livereload
gulp.task("live-html", () => {
	gulp.src(CONF.O.HTML)
		.pipe( livereload() );
});
gulp.task("live-css", () => {
	gulp.src(`${CONF.O.CSS}**/*.css`)
		.pipe( livereload() );
});
gulp.task("live-js", () => {
	gulp.src(`${CONF.O.JS}**/*.js`)
		.pipe( livereload() );
});
gulp.task("livereload", () => {
	livereload.listen();
	
	gulp.watch(CONF.O.HTML, ["live-html"]);
	gulp.watch(`${CONF.O.CSS}**/*`, ["live-css"]);
	gulp.watch(`${CONF.O.JS}**/*`, ["live-js"]);
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@