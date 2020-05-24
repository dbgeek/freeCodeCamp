"use strict";

const cors = require('cors');
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const auth = require("./app/auth.js");
const routes = require("./app/routes.js");
const mongo = require("mongodb").MongoClient;
const passport = require("passport");
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http").Server(app);
const sessionStore = new session.MemoryStore();

const io = require("socket.io")(http);
const passportSocketIo = require("passport.socketio");

const config = require("./config")

app.use(cors());
fccTesting(app); //For FCC testing purposes

app.use("/public", express.static(process.cwd() + "/public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    key: "express.sid",
    store: sessionStore
  })
);

mongo.connect(config.MONGO_URI, (err, client) => {
  const db = client.db(config.MONGO_DBNAME);
  if (err) console.log("Databases error: " + err);

  auth(app, db);
  routes(app, db);
  http.listen(config.PORT || 3000);
  //start socket.io code
  let currentUsers = 0;
  io.use(
    passportSocketIo.authorize({
      cookieParser: cookieParser,
      key: "express.sid",
      secret: config.SESSION_SECRET,
      store: sessionStore
    })
  );
  io.on("connection", socket => {
    ++currentUsers;
    console.log("A user has connected");
    console.log("user " + socket.request.user.name + " connected");
    io.emit('user count', currentUsers);
    io.emit('user', { name: socket.request.user.name, currentUsers, connected: true });

    socket.on("chat message", message => {
      const name = socket.request.user.name;
      io.emit("chat message", { name, message });
    });

    socket.on("disconnect", () => {
      --currentUsers;
      io.emit("user", {
        name: socket.request.user.name,
        currentUsers,
        connected: false
      });
    });
  });
  //end socket.io code
});
