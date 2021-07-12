var express = require("express");
// var fs = require("fs");

var app = express();

app.use("/node_modules", express.static("./node_modules/"));
app.use("/public", express.static("./public/"));
app.engine("html", require("express-art-template"));

app.listen(3000, function () {
  console.log("running 3000...");
});

// module.exports = app;
