const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const YearWiseData = require("./getYearData").GetYearData;

const port = process.env.PORT || 5000;
const yearWiseData = new YearWiseData();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send('start');
});

app.get("/org-data", (req, res) => {
  yearWiseData.getOrgYearWiseData().then((resss) => {
    console.log("res: ", resss);
    res.send(resss);
  });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
