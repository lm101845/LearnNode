var express = require("express");
// var fs = require("fs");
var router = require("./router");
var app = express();

app.use("/node_modules", express.static("./node_modules/"));
app.use("/public", express.static("./public/"));
app.engine("html", require("express-art-template"));

// router(app);
app.use(router);
app.listen(3000, function () {
  console.log("running 3000...");
});

// module.exports = app;
