const { default: validator } = require("validator")

module.exports = value => value === '' || typeof value === 'null' || typeof value === 'undefined' || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'array' && value.length === 0)