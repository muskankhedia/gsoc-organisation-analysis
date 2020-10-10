import { makeStyles } from "@material-ui/core";

export const HomePageStyle = makeStyles((theme) => ({
  orgsContainer: {
    paddingTop: theme.spacing(3),
  },
  orgTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
    height: "100%",
    background: "linear-gradient(white, aliceblue)",
    borderRadius: "0.5rem",
  },
  media: {
    height: 240,
  },
  orgYearAppeared: {
    lineHeight: "2rem",
    fontSize: "16px",
  },
  linkStyle: {
    color: "black",
    textDecoration: "none",
  },
}));
