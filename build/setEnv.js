const fs = require("fs");
const c = require("colors/safe");
const arg = process.argv[2] || "debug-hard";
fs.writeFileSync("build/env", arg);
console.log(
	c.white.bold("Switched to:"),
	c.black.bgWhite(` ${arg} `),
	c.white.bold("environment.")
);