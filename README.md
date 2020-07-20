# babel-plugin-hash-strings

> Replace all instances of `"@@strings like this"` with hashes.

This _might_ be useful for decreasing the size of your JavaScript bundles. But
note that gzip might actually be better for your code because hashes do not
compress well.

## Install

```sh
npm install --save-dev babel-plugin-hash-strings
```

## Usage

It's recommended that you only use this plugin in a production build.

```js
// babel.config.js
let presets = [ ... ]
let plugins = [ ... ]

if (process.env.NODE_ENV === "production") {
  plugins.push("babel-plugin-hash-strings")
}

module.exports = { presets, plugins }
```

## Example

**Input:**

```js
let value = "@@hash me"
```

**Output:**

```js
let value = "5953c"
```

## `options.chars`

This plugin defaults to really short hashes because you probably won't have
_that_ many strings that uniqueness matters all that much. But just in case you
do have a duplicate, the plugin has a built-in check for them and you can
increase the length of your strings using `options.chars`

```js
// babel.config.js
let presets = [ ... ]
let plugins = [ ... ]

if (process.env.NODE_ENV === "production") {
  plugins.push(["babel-plugin-hash-strings", {
    chars: 8 // (default: 5)
  }])
}

module.exports = { presets, plugins }
```
