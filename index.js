const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const connectDB = require("./database/db");
const bookRouter = require("./routes/book.route");
const authRouter = require("./routes/user.route");

const app = express();

app.use(express.json());

connectDB();

app.get(["/home", "/"], (_, res) => {
  res.send("<h1>Welcome to our book API</h1>");
});

app.get("/user/verified", (_, res) => {
  res.send("<h1>Your account has been successfully verified</h1>");
});
app.use("/auth", authRouter);
app.use(bookRouter);

const port = process.env.PORT || 1001;

app.listen(port, () => console.log(`Server listening on port ${port}`));
