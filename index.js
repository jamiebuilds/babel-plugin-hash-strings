"use strict"
let crypto = require("crypto")
let hash = crypto.createHash("md5")

let history = {}

function hashify(input, length) {
	let hashed = hash.update(input).digest("hex").slice(0, length)

	if (history[hashed] && history[hashed] !== input) {
		throw new Error("babel-plugin-hash-strings encountered a duplicate key name, please increase the 'chars' length")
	} else {
		history[hashed] = input
	}

	return hashed
}

function hashStrings() {
	return {
		name: "hash-strings",
		visitor: {
			StringLiteral(path, state) {
				if (path.node.value.startsWith("@@")) {
          path.node.value = `${hashify(path.node.value, state.opts.chars || 5)}`
        }
			},
		},
	}
}

module.exports = hashStrings
