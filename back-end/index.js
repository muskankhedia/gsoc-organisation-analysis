const express = require("express"),
  bodyParser = require("body-parser"),
  YearWiseData = require("./getYearData").GetYearData,
  JsonDB = require("node-json-db").JsonDB,
  Config = require("node-json-db/dist/lib/JsonDBConfig").Config,
  port = process.env.PORT || 5000,
  app = express(),
  yearWiseData = new YearWiseData();

var db = new JsonDB(new Config('./dbs/ORGData', true, true, "/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  express.text({
    type: "text/plain",
  })
);

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("start");
});

app.get("/org-data", (req, res) => {
  var data;
  try {
    data = db.getData("/ORGData");
  } catch {
    yearWiseData.getOrgYearWiseData().then((data) => {
      db.push("/ORGData", data, false);
    });
    data = db.getData("/ORGData");
  }
  res.send(data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
