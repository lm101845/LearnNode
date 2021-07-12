var app = require("./app");
app.get("/students", function (req, res) {
  fs.readFile("./db.json", "utf8", function (err, data) {
    if (err) {
      return res.status(500).send("Server error.");
    }
    console.log(typeof data);
  });
  var students = JSON.parse(data).students;
  res.render("index.html", {
    fruits: ["苹果", "香蕉", "橘子"],
    students: students,
  });
});

app.get("/students", function (req, res) {});

app.get("/students/new", function (req, res) {});

app.get("/students/new", function (req, res) {});

app.get("/students/new", function (req, res) {});

app.get("/students/new", function (req, res) {});

app.get("/students/new", function (req, res) {});
