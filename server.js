const express = require("express");
const mongodb = require("./data/database")
const contactRoute = require("./routes/contactRoute");

const app = express();

app.use("/", contactRoute);

mongodb.iniDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(3000, () => {
      console.log(`app running`);
    });
  }
});
