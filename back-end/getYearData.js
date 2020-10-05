const axios = require("axios");
const cheerio = require("cheerio");

class GetYearData {
  constructor() {
    this.count = 0;
  }

  async getOrgYearWiseData() {
    let SCRAPING_URL;
    var dict = {};
    for (let j = 2020; j >= 2016; j--) {
      console.log("j: ", j);
      SCRAPING_URL =
        `https://summerofcode.withgoogle.com/archive/${j}/organizations/`
      let dictt = await axios.get(SCRAPING_URL).then((resd) => {
        resd = resd.data;
        if (resd) {
          const $ = cheerio.load(resd);
          $(".organization-card__name")
            .each(function () {
              const orgName = $(this).text();
              console.log(orgName);
              if (!(orgName === undefined)) {
                if (dict.hasOwnProperty(orgName)) {
                  dict[orgName].count += 1;
                  dict[orgName].year.push(j);
                } else {
                  dict[orgName] = { count: 1, year: [] };
                  dict[orgName].year.push(j);
                }
              }
            });
        }
        return dict;
      });
    }
    for (let i = 2015; i >= 2009; i--) {
      SCRAPING_URL = "https://www.google-melange.com/archive/gsoc/" + i;
      let dictt = await axios.get(SCRAPING_URL).then((resd) => {
        resd = resd.data;
        if (resd) {
          const $ = cheerio.load(resd);
          $(".mdl-list__item-primary-content")
            .find("a")
            .each(function () {
              const orgName = $(this).text();
              if (!(orgName === undefined)) {
                if (dict.hasOwnProperty(orgName)) {
                  dict[orgName].count += 1;
                  dict[orgName].year.push(i);
                } else {
                  dict[orgName] = { count: 1, year: [] };
                  dict[orgName].year.push(i);
                }
              }
            });
        }
        return dict;
      });
      if (i == 2009) {
        console.log(dictt);
        return dictt;
      }
    }
  }
}

module.exports = { GetYearData };
