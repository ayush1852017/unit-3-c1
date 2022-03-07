let express = require("express");
let app = express();

app.use(logger);

app.get("/books", (req, res) => {
  res.send("This is books");
});

app.get("/libraries", checkPermission("librarian"), (req, res) => {
  res.send("You are Welcome Librarian");
});

app.get("/authors", checkPermission("author"), (req, res) => {
  res.send("You are welcome Author");
});

function checkPermission(role) {
  return function (req, res, next) {
    if (res.role == role) {
      next();
    } else {
      res.send("Not authorized");
    }
  };
}

function logger(req, res, next) {
  if (req.path == "/libraries" || req.path == "/authors" || req.path == "/books") {
    next();
  } else {
    res.send("Not authorized");
  }
}

app.listen(4000, () => {
  console.log("This is port 4000");
});
