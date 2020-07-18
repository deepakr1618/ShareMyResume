import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Paper } from "@material-ui/core";
import {
  Button,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";

import { FaRegUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Context } from "../../state/reducer";
import { LogOutUser, EraseUserLoginData } from "../../state/actions";
import { Redirect, withRouter, Link } from "react-router-dom";
import { TweenMax } from "gsap";

function Navigation({ history }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    TweenMax.fromTo(
      logo,
      2,
      {
        opacity: 0,
        x: -5,
      },
      {
        opacity: 1,
        x: 0,
      }
    );
  }, []);
  let logo = useRef(null);
  const [state, dispatch] = useContext(Context);
  const style = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(1.5),
    },
    smallIcon: {
      fontSize: "20px",
    },
    smallMargin: {
      margin: theme.spacing(0.5),
    },
    highlight: {
      background: theme.palette.secondary.main,
      color: "white",
      padding: theme.spacing(0.5),
      borderRadius: 5,
    },
  }));
  const classes = style();
  return (
    <div className={classes.container}>
      {/* <Grid container justify="space-between">
        <Grid item xs={6} md={9}>
          <Link
            to="/users"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p
              ref={(e) => (logo = e)}
              style={{ opacity: "0" }}
              className={classes.smallMargin}
            >
              Share My <span className={classes.highlight}>Resume</span>
            </p>
          </Link>
        </Grid>
        <Grid item xs={5} md={2}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FaRegUser className={classes.smallIcon} />}
            onClick={() => {
              if (state.token) {
                history.push("/edit");
              } else {
                history.push("/login");
              }
            }}
          >
            {state.token ? "My Resume" : "Login"}
          </Button>
        </Grid>
        <Grid item xs={1} md={1}>
          {state.token ? (
            <IconButton
              color="secondary"
              color="secondary"
              label="Log Out"
              children={<RiLogoutCircleRLine className={classes.smallIcon} />}
              onClick={() => {
                dispatch(LogOutUser());
                EraseUserLoginData();
              }}
            ></IconButton>
          ) : null}
        </Grid>
      </Grid> */}

      <Paper elevation={0}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            ref={(e) => (logo = e)}
            label="ShareMyResume"
            onClick={() => {
              history.push("/users");
            }}
          ></BottomNavigationAction>
          <BottomNavigationAction
            onClick={() => {
              if (state.token) {
                history.push("/edit");
              } else {
                history.push("/login");
              }
            }}
            label={state.token ? "My Resume" : "Login"}
            icon={<FaRegUser />}
          />
          {state.token ? (
            <BottomNavigationAction
              label="LogOut"
              icon={<RiLogoutCircleRLine />}
              onClick={() => {
                dispatch(LogOutUser());
                EraseUserLoginData();
              }}
            />
          ) : null}
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default withRouter(Navigation);
