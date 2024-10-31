require("dotenv").config();
const express = require("express");
const path = require("path");
const authRoute = require("./routers/auth.route");
const messageRoute = require("./routers/message.route");
const userRoute = require("./routers/user.route");
const connectToMongoDb = require("./db/connectToMongoDB");
const cookieParser = require("cookie-parser");
const { app, server } = require("./socket/socket");
const PORT = process.env.PORT || 8001;

const __dirnames = path.resolve();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirnames, "/frontend/dist")));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnames, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server is running at http://localhost:${PORT}`);
});
