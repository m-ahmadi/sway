const CONF = require("./config");
const c = require("colors/safe");
const concat = require("concat");
const fs = require("fs-extra");
const shell = require("shelljs");
const log = console.log;


const DIR = CONF.I.LIB_CSS;
const list = require( CONF.L.CSS );
debugger


if (CONF.env === CONF.DEBUG_HARD) {
	doDebugHard();
	
} else if (CONF.env === CONF.DEBUG_LIGHT) {
	doDebugLight();
} else if (CONF.env === CONF.RELEASE_LIGHT) {
	releaseLight();
} else if (CONF.env === CONF.RELEASE_HARD) {
	
}

function doDebugHard() {
	let toWrite = "";
	list.forEach((i, x, a) => {
		let src  = CONF.I.LIB_CSS + i + ".css";
		let dest = CONF.O.LIB_CSS + i + ".css";
		if ( fs.existsSync(src) ) {
			fs.copySync(src, dest);
		} else {
			log( c.red.bold("The listed file:"), c.white.bold.bgRed(" "+ src +" "), c.red.bold("does not exist!"),
			c.yellow("Looking for a .min of it...")
			);
			let listPath = CONF.L.CSS.slice(3);
			src = CONF.I.LIB_CSS + i + ".min.css";
			if ( fs.existsSync(src) ) {
				log( c.green("\t Found the .min of it, using it instead."),
					c.white("(Make sure the list in:"), c.blue.bold(listPath), "is correct.)"
				)
				fs.copySync.sync(src, dest);
			} else {
				log( c.red.bold("No minified file was found either. check the list in:"), c.white.bold.bgRed(listPath) );
			}
		}
		toWrite += '<link rel="stylesheet" type="text/css" href="css/' + i + '"/>\n';
	});
	toWrite += '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
	let f = CONF.I.HTML + "links" + CONF.HTML_DATA_FILES_EXT;
	fs.writeFileSync(f, toWrite, "utf8");
	log( "\n", c.green(f), "generated." );
}
function doDebugLight() {
	let toCat = [];
	let toWrite = "";
	debugger
	list.forEach((i, x, a) => {
		let src  = CONF.I.LIB_CSS + i + ".css";
		if ( fs.existsSync(src) ) {
			toCat.push(src);
		} else {
			src = CONF.I.LIB_CSS + i + ".min.css";
			if ( fs.existsSync(src) ) {
				toCat.push(src);
			}
		}
	});
	debugger
	fs.removeSync(CONF.O.LIB_CSS);
	let outCat = CONF.O.LIB_CSS + CONF.F.LIB + ".css";
	
	fs.ensureDirSync(CONF.O.LIB_CSS);
	fs.ensureFileSync(outCat);
	// concat(toCat, outCat);
	
	let outMin = CONF.O.LIB_CSS + CONF.F.LIB + ".min.css";
	let o = shell.cat(toCat);
	fs.writeFileSync(outCat, o, "utf-8");
	if (shell.exec(`csso ${outCat} -o ${outMin} -m ${outMin}.map`).code !== 0) {
		shell.echo("csso failed.");
		shell.exit(1);
	}
	fs.removeSync(outCat);
	
	toWrite += '<link rel="stylesheet" type="text/css" href="css/lib/libs.css"/>\n';
	toWrite += '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
	let f = CONF.I.HTML + "links" + CONF.HTML_DATA_FILES_EXT;
	fs.writeFileSync(f, toWrite, "utf8");
}
function releaseLight() {
	
}

debugger

