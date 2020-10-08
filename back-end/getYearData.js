const axios = require("axios");
const cheerio = require("cheerio");

class GetYearData {

  constructor() {
  }

  // Scraps data from different websites and return an object of objects data
  async getOrgYearWiseData() {
    let SCRAPING_URL;
    var dict = {};

    // Scraps the data for year 2020-2016
    for (let j = 2020; j >= 2016; j--) {
      SCRAPING_URL = `https://summerofcode.withgoogle.com/archive/${j}/organizations/`;
      let dictt = await axios.get(SCRAPING_URL).then((resd) => {
        resd = resd.data;
        if (resd) {
          const $ = cheerio.load(resd);
          $(".organization-card__container")
            .find("a")
            .each(function (index, value) {
              var link = $(value).attr("href");
              const orgName = $(value).text().trim().split("\n")[0];
              if (!(orgName === undefined)) {
                if (dict.hasOwnProperty(orgName)) {
                  dict[orgName].count += 1;
                  dict[orgName].year.push(j);
                } else {
                  dict[orgName] = { count: 1, year: [j] };
                }
                dict[orgName][j] = link;
              }
            });
        }
        return dict;
      });
    }

    // Scraps the data for year 2015-2009
    for (let i = 2015; i >= 2009; i--) {
      SCRAPING_URL = "https://www.google-melange.com/archive/gsoc/" + i;
      let dictt = await axios.get(SCRAPING_URL).then((resd) => {
        resd = resd.data;
        if (resd) {
          const $ = cheerio.load(resd);
          $(".mdl-list__item-primary-content")
            .find("a")
            .each(function (index, value) {
              var link = $(value).attr("href");
              console.log("link: ", link);
              const orgName = $(this).text();
              if (!(orgName === undefined)) {
                if (dict.hasOwnProperty(orgName)) {
                  dict[orgName].count += 1;
                  dict[orgName].year.push(i);
                } else {
                  dict[orgName] = { count: 1, year: [] };
                  dict[orgName].year.push(i);
                }
                dict[orgName][i] = link;
              }
            });
        }
        return dict;
      });
      if (i == 2009) {
        return dictt;
      }
    }
  }
}

module.exports = { GetYearData };
