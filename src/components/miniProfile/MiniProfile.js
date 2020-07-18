import React, { useEffect, useRef } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ExposurePlus2Icon from "@material-ui/icons/ExposurePlus2";
import Chip from "@material-ui/core/Chip";
import LaunchIcon from "@material-ui/icons/Launch";
import { withRouter } from "react-router-dom";
import { TiDocumentText } from "react-icons/ti";
import { TweenMax } from "gsap";

function MiniProfile({ name, id, skills, email, city, history }) {
  useEffect(() => {}, []);
  const style = makeStyles((theme) => ({
    chip: {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    skillText: {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    paper: {
      margin: `${theme.spacing(2)}px 0`,
      padding: theme.spacing(2),
      opacity: "0",
    },
    viewButton: {
      padding: theme.spacing(2),
    },
    subInfo: {
      color: "#242424",
      fontSize: "12px",
    },
  }));
  const classes = style();
  let x = useRef(null);
  let nm = useRef(null);
  useEffect(() => {
    TweenMax.fromTo(
      x,
      1,
      {
        opacity: "0",
        x: -5,
      },
      {
        opacity: "1",
        x: 0,
      }
    );
    TweenMax.fromTo(
      nm,
      1,
      {
        opacity: "0",
        x: -5,
      },
      {
        opacity: "1",
        x: 0,
      }
    );
  }, []);
  return (
    <Paper className={classes.paper} elevation={3} ref={(e) => (x = e)}>
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <h3 ref={(e) => (nm = e)}>Name : {name}</h3>
          <p className={classes.subInfo}>Email : {email}</p>
          <p className={classes.subInfo}>City : {city}</p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container alignItems="flex-start">
            <Grid item xs={12} md={3}>
              <h4 className={classes.skillText}>Skills : </h4>
            </Grid>
            <Grid item xs={9}>
              <Grid container justify="space-between">
                {skills.map((data, i) => (
                  <Grid item key={i}>
                    <Chip
                      className={classes.chip}
                      label={data.skill}
                      clickable
                    ></Chip>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.viewButton} container justify="flex-end">
            <Grid item>
              <Button
                color="primary"
                className={classes.dashed}
                endIcon={<TiDocumentText />}
                onClick={() => {
                  history.push(`/users/${id}`);
                }}
                variant="contained"
              >
                Complete Profile
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withRouter(MiniProfile);
