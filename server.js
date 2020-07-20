const express = require("express");
const logger = require("morgan");
const users = require("./routes/users");
const blogs = require("./routes/blogs");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("./config/database"); //database configuration
const jwt = require("jsonwebtoken");
const app = express();

app.set("secretKey", "nodeRestApi"); // jwt secret token

// connection to mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", function (req, res) {
  res.json({ tutorial: "Build REST API with node.js" });
});


// public route
app.use("/users", users);


// private route
app.use("/blog", validateUser, blogs);
app.post("/blog", validateUser, blogs, function (req, res) {
  var newItem = new Item();
  newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
  newItem.img.contentType = "image/png";
  newItem.save();
});

//endpoint to fetch inserted array
app.use("/array", (req, res, next, err) => {
  let arrayList = [];
  if (err) {
    next(err);
  } else {
    for (let array of req.query.array) {
      arrayList.push(array);
    }
    res.json({ status: "success", data: { array: arrayList } });
  }
  console.log(
    req.query,
    typeof req.query.array,
    Array.isArray(req.query.array)
  );
  res.send("done");
});

//endpoint for factorial calculation
app.get("/factorial", (req, res) => {
  const result = () => {
    var ans = 1;
    var target =13;

    for (var i = 2; i <= target; i++){} ans = ans * i;
    return ans;
  };
  res.json({ status: "success", data: { "Factorial of 13": result() } });
  console.log(result(), "result");
});



function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (
    err,
    decoded
  ) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}


// handle 404 error
app.use(function (req, res, next) {
  multer({
    dest: "./uploads/",
    rename: function (fieldname, filename) {
      return filename;
    },
  });
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong" });
});

app.listen(3000, function () {
  console.log("Node server listening on port 3000");
});
