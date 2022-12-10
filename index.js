const express = require("express");
const app = express();
const users = require("./routes/users");
const auth = require("./routes/auth");
const weather = require("./routes/weather");
const bookmark = require("./routes/bookmark");
const cors = require("cors");

// database
const db = require("./db/db");

// middleware
app.use(cors({ origin: "http://localhost:3000" }));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/weather", weather);
app.use("/api/bookmark", bookmark);

// remove before deploy
app.get("/", (req, res) => {
  res.send("Server is running");
});

db.sync({ force: !true }).then(() => {
  console.log("Drop and re-sync db.");
  // console.log("No re-sync db.");
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Now runnig on localhost ${PORT}.`);
});
