#!/usr/bin/env node
const c = require("colors/safe");
const fs = require("fs-extra");
const path = require("path");
const DS = path.sep;
const shell = require("shelljs");
const y = require("yargs");
const log = console.log;

y.usage("Usage: \n $0 command");
y.version();
y.options( require("./yOpts") );
y.alias("h", "help");
y.demandCommand(1, "You must specifiy a command to run.");
y.help("h");

y.command("init", "Initialize new empty project.", {}, (argv) => {
	if ( !fs.existsSync(__dirname+DS+ "build/inited") ) {
		fs.copySync(__dirname+DS+ "skeleton", "./");
		fs.writeFileSync(__dirname+DS+ "build/inited");
		log( c.green.bold("New empty project initialized.") );
	} else {
		log( c.yellow("Already initialized.") );
	}
});

y.command("html", "Compile HTML.", {}, run);
y.command("sass", "Compile Sass.", {}, run);
y.command("temp", "Compile dynamic templates.", {}, run);
y.command("js", "Compile JavaScript.", {}, run);
y.command("html-w", "Watch HTML.", {}, run);
y.command("sass-w", "Watch Sass.", {}, run);
y.command("temp-w", "Watch dynamic templates.", {}, run);
y.command("js-w", "Watch JavaScript", {}, run);
y.command("compile-all", "Compile everything.", {}, run);
y.command("livereload", "Enable livereload for: dist/index.html, dist/css and dist/js", {}, run);
y.command("env-debug-hard", "Set current environment to debug-hard.", {}, run);
y.command("env-debug-normal", "Set current environment to debug-normal.", {}, run);
y.command("env-debug-light", "Set current environment to debug-light.", {}, run);
y.command("env-release", "Set current environment to release-light.", {}, run);
y.command("showenv", "Show current environment.", {}, run);
y.command("libcss", "Build CSS dependencies based on current environment.", {}, run);
y.command("libjs", "Build JS dependencies based on current environment.", {}, run);
y.command("build-libs", "Build CSS and JS dependencies based on current environment.", {}, run);
y.command("build", "Build dependencies and compile everything based on current environment.", {}, run);
y.command("release", "Custom release.", {}, run);
y.command("build-debug-hard", "Build and compile everything according to debug-hard environment.", {}, run);
y.command("build-debug-normal", "Build and compile everything according to debug-normal environment.", {}, run);
y.command("build-debug-light", "Build and compile everything according to debug-light environment.", {}, run);
y.command("build-release-light", "Build and compile everything according to release-light environment.", {}, run);
y.command("build-release-hard", "Build and compile everything according to release-hard environment.", {}, run);


var cmd = require("./commands");
y.argv;

function run(argv) {
	let a = argv._[0];
	shell.env.Path += ";./node_modules/.bin";
	if ( shell.exec( cmd[a] ).code !== 0 ) {
		log( c.red.bold("Shell exec failed!") );
	}
}