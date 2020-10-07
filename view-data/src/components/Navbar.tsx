import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "#2EBDFB",
  },
}));

const Navbar: FC<{}> = () => {
  const classes = useStyles();

  return (
    <>
      <header>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="h6" style={{ color: "#fff" }}>
                GSoC Organisation Analysis
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </header>
    </>
  );
};

export default Navbar;
