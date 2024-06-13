const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const Router = require("./src/router");

const app = express();
const port = 3000;

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("<h1>Wellcome!</h1>");
});

app.use(Router);

app.listen(port, () => {
  console.log(`Program berjalan di port:${port}, buka di http://localhost:${port}`);
});
