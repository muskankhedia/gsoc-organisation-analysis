import React, { FC, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { HomePageStyle } from "../css/HomePageStyle";
import { HOST } from "../utils/utils";
import { TextField } from "@material-ui/core";
import CircularIndeterminate from "./CircularIndeterminate";

interface OrgEntireData {
  count: Number;
  year: Number[];
}

interface OrgArrayDataType {
  orgName: String;
  count: Number;
  year: Number[];
}

type OrgDataType = { [orgName: string]: OrgEntireData };

const Home: FC<{}> = () => {
  const classes = HomePageStyle();
  const [data, setData] = useState({} as OrgDataType);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOrgss, setFilteredOrgss] = useState<OrgArrayDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${HOST}/org-data`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  var resultArray: OrgArrayDataType[] = Object.keys(data).map(function (
    orgNamedIndex
  ) {
    let org: OrgArrayDataType = {
      orgName: orgNamedIndex,
      count: data[orgNamedIndex].count,
      year: data[orgNamedIndex].year,
    };
    return org;
  });

  useEffect(() => {
    let filteredOrgs = resultArray.filter((contact) => {
      return contact;
    });
    setFilteredOrgss(filteredOrgs);
    if(filteredOrgs.length > 0){
      setLoading(false)
    }
  }, [data]);

  useEffect(() => {
    let filteredOrgs = resultArray.filter((contact) => {
      return (
        contact.orgName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      );
    });
    setFilteredOrgss(filteredOrgs);
  }, [searchValue]);

  return (
    <>
      <Container maxWidth="lg" className={classes.orgsContainer}>
        <div style={{ width: "100%", display: "flex", marginBottom: "2rem" }}>
          <div style={{ width: "50%" }}>
            <Typography variant="h4" className={classes.orgTitle}>
              Organisation name with details
            </Typography>
          </div>
          <div style={{ width: "50%" }}>
            <TextField
              id="standard-basic"
              label="Enter Search Value"
              variant="outlined"
              color="secondary"
              style={{ float: "right", width: "25rem" }}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
            />
          </div>
        </div>
        {loading ? (
          <CircularIndeterminate />
          // <div className="loader" />
        ) : (
          <Grid container spacing={3}>
            {filteredOrgss.map((eachOrgData: OrgArrayDataType, index: any) => {
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
        )} 
      </Container>
    </>
  );
};

export default Home;
