'use strict';

var fs = require("fs");
var packageJSON = JSON.parse(fs.readFileSync('./package.json'));
var themeDirectory = packageJSON._where;
var moduleFolder = "../../node_modules/bc-modal/dist/scss/modal"
var themeFile = themeDirectory + "/assets/scss/theme.scss";
var data = "\r\n// bc-modal\r\n@import \"" + moduleFolder + "\";\r\n"

fs.appendFile(themeFile, data, (err) => {
  if (err) throw err;
});
