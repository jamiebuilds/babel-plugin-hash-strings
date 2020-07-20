"use strict"
let test = require("ava")
let babel = require("@babel/core")
let fs = require("fs")
let path = require("path")
let plugin = require("./")

function fn(input) {
	return babel
		.transformSync(input, {
			plugins: [plugin],
			babelrc: false,
			configFile: false,
		})
		.code.trimRight()
}

function read(filepath) {
	return fs.readFileSync(path.join(__dirname, filepath), "utf8").trimRight()
}

test("transform", (t) => {
	let input = read("fixtures/input.txt")
	let expected = read("fixtures/output.txt")
	t.is(fn(input), expected)
})
