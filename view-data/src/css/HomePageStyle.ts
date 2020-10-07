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
  },
  media: {
    height: 240,
  },
  orgYearAppeared: {
    lineHeight: "2rem",
  },
}));
