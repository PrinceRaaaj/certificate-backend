const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
var express = require("express");

var app = express();


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // *.domain.com update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept","Content-disposition");
  res.header("Access-Control-Allow-Headers","Origin, X-Requeted-With, Content-Type, Accept,Content-disposition, Authorization, RBR");
  res.header("Access-Control-Expose-Headers", "Token");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
      
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

app.use( bodyParser.urlencoded({ extended: false }));

//Routes
const indexRouter = require("./routes/index");
const certificateRouter = require("./routes/certificate");


//routes
app.use("/", indexRouter);
app.use("/certificate", certificateRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started at port - ", process.env.PORT)
});