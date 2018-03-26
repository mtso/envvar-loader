'use strict';

const getOptions = require('loader-utils').getOptions;

// Matches ${VAR_NAME}
const defaultPattern = /\${([^}]*)}/g;

// Replace environment variables with values.
function defaultReplace(_match, varname) {
  return process.env[varname];
}

module.exports = function(string) {
  const options = getOptions(this) || {};

  options.pattern = options.pattern || defaultPattern;
  options.replace = options.replace || defaultReplace;

  return string.replace(
    options.pattern,
    options.replace
  );
}
