import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RegisterIllu from "../../assets/images/register-person.svg";
import BgCircle from "../../assets/images/circle-bg.png";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Link, withRouter } from "react-router-dom";
import { TweenMax } from "gsap/gsap-core";
import { APIURL } from "../../state/reducer";

function Register({ history }) {
  const style = makeStyles((theme) => ({
    options: {
      textAlign: "center",
      padding: "15px 0px",
    },
    activeOption: {
      background: theme.palette.primary.main,
      color: "white",
      fontWeight: "bold",
      borderRadius: "7px 7px 0px 0px",
    },
    inputContainer: {
      padding: theme.spacing(4),
      background: "#E9E9E9",
      minHeight: "450px",
    },
    text: {
      color: theme.palette.primary.main,
    },
    input: {
      margin: `${theme.spacing(2)}px 0px`,
      width: "100%",
    },
    button: {
      background: theme.palette.primary.main,
      padding: "12px 30px",
      color: "white",
      fontWeight: "bold",
      borderRadius: "12",
      width: "100%",
    },
    paper: {
      borderRadius: "7px",
      overflow: "hidden",
    },
    message: {
      fontSize: "15px",
      color: "red",
    },
    illu: {
      position: "relative",
      width: "600px",
      height: "600px",
      "& img": {
        position: "absolute",
      },
    },
    circlebg: {
      zIndex: 1,
    },
    person: {
      zIndex: 2,
      top: "80px",
      left: "50px",
    },
    picText: {
      zIndex: "2",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: "70px",
      color: "#3b3b3b",
      position: "absolute",
      opacity: "0",
      fontFamily: '"Sora", sans-serif',
    },
    picText2: {
      top: "70px",
    },
  }));
  const classes = style();

  let image = useRef(null);
  let text1 = useRef(null);
  let text2 = useRef(null);

  useEffect(() => {
    TweenMax.fromTo(
      image,
      1,
      {
        x: -30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
      }
    );
    TweenMax.fromTo(
      text1,
      1,
      {
        y: -10,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      }
    );

    TweenMax.fromTo(
      text2,
      1,
      {
        y: 10,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      }
    );
  }, []);
  const [showPass, setShowPass] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, showMessage] = useState("");

  function register() {
    if (!username || !password || !name) {
      showMessage("Invalid username or password");
    } else {
      fetch(`${APIURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
          name: name,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          if (data.message === "success") {
            history.push("/login?redirected=true");
          }
        })
        .catch((e) => {
          showMessage("Something went wrong!");
        });
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        padding: "30px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container direction="row" justify="space-evenly">
        <Grid item xs={12} md={6}>
          <Grid
            container
            style={{ height: "100%" }}
            alignItems="center"
            justify="center"
          >
            <Grid item className={classes.illu}>
              <img
                src={RegisterIllu}
                width="450"
                style={{ zIndex: "2" }}
                className={classes.person}
              ></img>
              <h1 ref={(e) => (text1 = e)} className={classes.picText}>
                Come
              </h1>
              <h1
                ref={(e) => (text2 = e)}
                className={`${classes.picText} ${classes.picText2}`}
              >
                Join Us
              </h1>
              <img
                src={BgCircle}
                width="500"
                className={classes.circlebg}
                ref={(e) => (image = e)}
              ></img>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} className={classes.paper}>
            <Grid container justify="space-between">
              <Grid className={classes.options} item xs={6}>
                <Link
                  style={{ textDecoration: "inherit", color: "inherit" }}
                  to="/login"
                >
                  Login
                </Link>
              </Grid>
              <Grid
                className={`${classes.options} ${classes.activeOption}`}
                item
                xs={6}
              >
                <Link
                  style={{ textDecoration: "inherit", color: "inherit" }}
                  to="/register"
                >
                  Register
                </Link>
              </Grid>
            </Grid>
            <Grid
              className={classes.inputContainer}
              container
              direction="column"
            >
              <Grid item xs={12}>
                <h2 className={classes.text}>Welcome aboard!</h2>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  label="Username"
                  variant="filled"
                  InputProps={{}}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Display Name"
                  className={classes.input}
                  variant="filled"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  className={classes.input}
                  label="Password"
                  variant="filled"
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment positon="end">
                        <IconButton
                          color="inherit"
                          onClick={() => {
                            setShowPass((curr) => !curr);
                          }}
                        >
                          {showPass ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={8}>
                    <p className={classes.message}>{message}</p>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      className={classes.button}
                      endIcon={<DoubleArrowRoundedIcon />}
                      onClick={register}
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(Register);
