const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const app = express();

const port = process.env.PORT || 1001;

app.listen(port, () => console.log(`Server listening on port ${port}`));
