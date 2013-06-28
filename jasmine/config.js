var requirejs = require("requirejs");

requirejs.config({
  nodeRequire: require,
  // spec 実行時に __dirname が spec のパスにかわるため
  baseUrl: __dirname + '/../src'
});
