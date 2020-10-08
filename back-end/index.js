const express = require("express"),
  bodyParser = require("body-parser"),
  YearWiseData = require("./getYearData").GetYearData,
  JsonDB = require("node-json-db").JsonDB,
  Config = require("node-json-db/dist/lib/JsonDBConfig").Config,
  port = process.env.PORT || 5000,
  app = express(),
  yearWiseData = new YearWiseData();

// Create a new DB to store the org data
var db = new JsonDB(new Config('./dbs/ORGData', true, true, "/"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  express.text({
    type: "text/plain",
  })
);

// Handling cors - in case it is used as API
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Checks if the server is connected
app.get("/", (req, res) => {
  res.send("start");
});

// Fetches the org data
app.get("/org-data", (req, res) => {
  var data;

  // Checks if the data is present in the database file.
  try {
    data = db.getData("/ORGData");
  } catch {           // If not then scraps the data and stores in the database
    yearWiseData.getOrgYearWiseData().then((data) => {
      db.push("/", data, false);
    });
    data = db.getData("/ORGData");
  }

  // Converts object of objects fetched from the database to array of objects
  var resultArray = Object.keys(data).map(function (
    orgNamedIndex
  ) {
    let org = {
      ...data[orgNamedIndex],
      orgName: orgNamedIndex,
    };
    return org;
  });

  // Sorts the data in ascending order based on the org name
  resultArray.sort((a, b) => {
    let fa = a.orgName.toLowerCase(),
      fb = b.orgName.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  // Sends the resulted sorted array
  res.send(resultArray);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
