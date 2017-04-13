const fs = require("fs");
const c = require("colors/safe");
const v = process.argv[2] || "debug-hard";
fs.writeFileSync("build/env", v);
console.log(
	c.yellow.bold("Switched to:"),
	c.white.bold.bgBlue(" "+ v +" "),
	c.yellow.bold("environment.")
);