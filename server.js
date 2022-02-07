
// REQUIREMENTS
// load .env data into process.env
require("dotenv").config();

//node nodules dependencies
const express = require("express");
const morgan = require("morgan");
const cookieSession = require('cookie-session')
const { Pool } = require("pg");
const bodyParser = require('body-parser');

//local helper files
const sassMiddleware = require("./lib/sass-middleware");
const dbParams = require("./lib/db.js");

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const quizzesRoutes = require("./routes/quizzes");
const questionsRoutes = require("./routes/questions");
const attemptsRoutes = require("./routes/attempts");
const viewsRoutes = require("./routes/views")

// SERVER SETTINGS
// Web server config
const app = express();
const PORT = process.env.PORT || 8080;

// PG database client/connection setup
const db = new Pool(dbParams);
db.connect();

// MIDDLEWARES
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: "session",
  keys: ["paola", "perez"],

  // Cookie Options
  maxAge: 30 * 60 * 1000 // 24 hours
}))
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES ENDPOINTS
app.use("/api/users", usersRoutes(db));
app.use("/api/quizzes", quizzesRoutes(db));
app.use("/api/questions", questionsRoutes(db));
app.use("/api/attempts", attemptsRoutes(db));
app.use("/", viewsRoutes(db));

//LISTENER
app.listen(PORT, () =>
{
  console.log(`Example app listening on port ${PORT}`);
});
