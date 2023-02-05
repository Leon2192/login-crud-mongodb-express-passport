const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://leonardodev:zJJfMkQnoB45NcqA@cluster0.thkch1n.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log(err));
