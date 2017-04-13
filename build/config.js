const DEFAULT_PAGE = "app";
const envFile = "build/env";
const pageFile = "build/page";

const fs = require("fs");
let env  = fs.readFileSync(envFile, "utf8");
let page = fs.existsSync(pageFile) ? fs.readFileSync(pageFile, "utf8") + "/" : "";

const DEBUG_HARD    = "debug-hard";
const DEBUG_LIGHT   = "debug-light";
const RELEASE_LIGHT = "release-light";
const RELEASE_HARD  = "release-hard";

const R    = "../";
const SRC  = "src/";
const DIST = page ? "dist-"+page : "dist/";
const I = {
	JS:   SRC  + "js/"   + page,
	SASS: SRC  + "sass/" + page,
	HTML: SRC  + "html/" + page,
	TEMP: SRC  + "temp/" + page,
	LIB:  SRC  + "lib/"  + page,
	get LIB_CSS() { return this.LIB + "css/" },
	get LIB_JS()  { return this.LIB + "js/" }
};
const O = {
	JS:   DIST + "js/",
	CSS:  DIST + "css/",
	HTML: DIST + "",
	get LIB_CSS() { return this.CSS + "lib/" },
	get LIB_JS()  { return this.JS  + "lib/" }
};
const F = {
	HTML:  "index.html",
	CSS:   "style.css",
	SASS:  "style.scss",
	TEMP:  "templates.js",
	CLL:   "libcss.js",
	JLL:   "libjs.js",
	LIB:   "libs"
};
const L = {
	CSS: R + I.LIB + F.CLL,
	JS:  R + I.LIB + F.JLL
};

if (env === DEBUG_HARD) {
	
} else if (env === DEBUG_LIGHT) {
	
} else if (env === RELEASE_LIGHT) {
	
} else if (env === RELEASE_HARD) {
	
}

const CMD = {
	html:  `htmlbilder ${I.HTML} -o ${O.HTML}`,
	sass:  `sass ${I.SASS}/${F.SASS} : ${O.CSS}/${F.CSS}`,
	
	temp:  `handlebars ${I.TEMP} -f ${O.JS}/${F.TEMP} -e hbs -m`,
	js:    `babel ${I.JS} -d ${O.JS} -s`,
	get sassW() { return this.sass + " --watch" },
	get jsW()   { return this.js + " -w" }
}

module.exports = {
	HTML_DATA_FILES_EXT: ".htm",
	DEBUG_HARD: DEBUG_HARD,
	DEBUG_LIGHT: DEBUG_LIGHT,
	RELEASE_LIGHT: RELEASE_LIGHT,
	RELEASE_HARD: RELEASE_HARD,
	env: env,
	DIST: DIST,
	I: I,
	O: O,
	L: L,
	F: F,
	CMD: CMD
};