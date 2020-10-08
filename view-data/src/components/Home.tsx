import React, { FC, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { HomePageStyle } from "../css/HomePageStyle";
// import { HOST } from "../utils/utils";
import { TextField } from "@material-ui/core";
// import CircularIndeterminate from "./CircularIndeterminate";
import { OrgWiseData as data } from "../data/OrgWiseData";
import '../css/heading.css';

interface yearLink {
  link: string
}
interface OrgArrayDataType {
  orgName: String;
  count: Number;
  year: Number[];
  "2020"?: string;
  "2019"?: string;
  "2018"?: string;
  "2017"?: string;
  "2016"?: string;
  "2015"?: string;
  "2014"?: string;
  "2013"?: string;
  "2012"?: string;
  "2010"?: string;
  "2009"?: string;
}

const Home: FC<{}> = () => {
  const classes = HomePageStyle();
  const [filteredOrgs, setfilteredOrgs] = useState<OrgArrayDataType[]>([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setfilteredOrgs(data);
  }, []);

  const searchFilter = (searchValue: string) => {
    let filteredOrgs = data.filter((ele) => {
      return (
        ele.orgName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      );
    });
    setfilteredOrgs(filteredOrgs);
  };

  return (
    <>
      <Container maxWidth="lg" className={classes.orgsContainer}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4" className={classes.orgTitle}>
              Organisation name with details
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Enter Search Value"
              variant="outlined"
              color="secondary"
              style={{ float: "right" }}
              className="textFieldDesign"
              onChange={(event) => {
                searchFilter(event.target.value);
              }}
            />
          </Grid>
        </Grid>
        {/* {loading ? (
          <CircularIndeterminate />
        ) : ( */}
        <Grid container spacing={3}>
          {filteredOrgs.map((eachOrgData: OrgArrayDataType, index: any) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {eachOrgData.orgName}
                      </Typography>
                      <Typography component="p">
                        Year Participated:
                      </Typography>
                      {Object.keys(eachOrgData).map((year, index) => {
                        if (
                          year === "2020" ||
                          year === "2019" ||
                          year === "2018" ||
                          year === "2017" ||
                          year === "2016" ||
                          year === "2015" ||
                          year === "2014" ||
                          year === "2013" ||
                          year === "2012" ||
                          year === "2011" ||
                          year === "2010" ||
                          year === "2009"
                        ) {
                          var link = Object.values(eachOrgData)[index];
                          return (
                            <span
                              key={index}
                              className={classes.orgYearAppeared}
                            >
                              <a
                                className="linkStyle"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                  parseInt(year) >= 2016
                                    ? `https://summerofcode.withgoogle.com/${link}`
                                    : `https://www.google-melange.com/${link}`
                                }
                              >
                                {year}
                              </a>
                              {"  "}
                            </span>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {/* )} */}
      </Container>
    </>
  );
};

export default Home;
