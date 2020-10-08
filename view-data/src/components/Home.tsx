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

interface OrgArrayDataType {
  orgName: String;
  count: Number;
  year: Number[];
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
                      <Typography gutterBottom variant="h5" component="h2">
                        {eachOrgData.orgName}
                      </Typography>
                      {eachOrgData?.year.map((yr, innerIndex) => {
                        if (innerIndex !== 0) {
                          return (
                            <span
                              key={innerIndex}
                              className={classes.orgYearAppeared}
                            >
                              , {yr}
                            </span>
                          );
                        } else {
                          return (
                            <span
                              key={innerIndex}
                              className={classes.orgYearAppeared}
                            >
                              {yr}
                            </span>
                          );
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
