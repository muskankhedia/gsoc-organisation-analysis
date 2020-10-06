const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const YearWiseData = require("./getYearData").GetYearData;
const orgDataJSON = require("./dbs/ORGData.json");
const jsonDb = require("./dbManager").DBManager;
const port = process.env.PORT || 5000;
const yearWiseData = new YearWiseData();
const db = new jsonDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

app.get("/", (req, res) => {
  res.send("start");
});

app.get("/org-data", (req, res) => {
  yearWiseData.getOrgYearWiseData().then((resss) => {
    // console.log("res: ", resss);
    res.send(resss);
    if (isEmptyObject(orgDataJSON)) {
      console.log("hi");
      db.createDB("./dbs/ORGData");
      db.pushData("/ORGData", resss, false);
    } else {
      console.log("data present");
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
