#!/usr/bin/env node
const c = require("colors/safe");
const fs = require("fs-extra");
const shell = require("shelljs");
const y = require("yargs");
const log = console.log;

y.usage("Usage: \n $0 command");
y.version();
y.options( require("./yOpts") );
y.help("h").alias("h", "help");

y.command("init", "Create empty project.", undefined, run);
y.command("html", "Compile HTML.", undefined, run);
y.command("sass", "Compile Sass.", undefined, run);
y.command("temp", "Compile dynamic templates.", undefined, run);
y.command("js", "Compile JavaScript.", undefined, run);
y.command("html-w", "Watch HTML.", undefined, run);
y.command("sass-w", "Watch Sass.", undefined, run);
y.command("temp-w", "Watch dynamic templates.", undefined, run);
y.command("js-w", "Watch JavaScript", undefined, run);
y.command("compile-all", "Compile everything.", undefined, run);
y.command("livereload", "Enable livereload for: dist/index.html, dist/css and dist/js", undefined, run);
y.command("env-debug-hard", "Set current environment to debug-hard.", undefined, run);
y.command("env-debug-normal", "Set current environment to debug-normal.", undefined, run);
y.command("env-debug-light", "Set current environment to debug-light.", undefined, run);
y.command("env-release", "Set current environment to release-light.", undefined, run);
y.command("showenv", "Show current environment.", undefined, run);
y.command("libcss", "Build CSS dependencies based on current environment.", undefined, run);
y.command("libjs", "Build JS dependencies based on current environment.", undefined, run);
y.command("build-libs", "Build CSS and JS dependencies based on current environment.", undefined, run);
y.command("build", "Build dependencies and compile everything based on current environment.", undefined, run);
y.command("release", "Custom release.", undefined, run);
y.command("build-debug-hard", "Build and compile everything according to debug-hard environment.", undefined, run);
y.command("build-debug-normal", "Build and compile everything according to debug-normal environment.", undefined, run);
y.command("build-debug-light", "Build and compile everything according to debug-light environment.", undefined, run);
y.command("build-release-light", "Build and compile everything according to release-light environment.", undefined, run);
y.command("build-release-hard", "Build and compile everything according to release-hard environment.", undefined, run);

var cmd = require("./commands");
y.argv;

function run(argv) {
	let c = argv._[0];
	shell.env.Path += ";./node_modules/.bin";
	if ( shell.exec(cmd[c] + " --color").code !== 0 ) {
		log( c.red.bold("Shell exec failed!") );
	}
}