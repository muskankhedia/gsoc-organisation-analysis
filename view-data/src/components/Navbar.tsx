import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC<{}> = () => {

  return (
    <>
      <header>
        <AppBar position="static">
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
