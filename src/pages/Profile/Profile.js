import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { APIURL } from "../../state/reducer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button } from "@material-ui/core/";
import { DiGithubAlt } from "react-icons/di";
import { MdLocationCity } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { AiFillPhone, AiOutlineRollback } from "react-icons/ai";
import { MdSchool } from "react-icons/md";
import { TweenMax, Power } from "gsap";

function Profile({ match, history }) {
  const [user, setUser] = useState({
    education: [],
    internships: [],
    courses: [],
    skills: [],
    name: " ",
  });

  const style = makeStyles((theme) => ({
    themeColor: {
      color: theme.palette.primary.main,
    },
    header: {
      textAlign: "center",
      padding: `${theme.spacing(4)}px 0px`,
    },
    container: {},
    paper: {
      padding: theme.spacing(2),
    },
    grey: {
      color: "#404040",
    },
    miniMargin: {
      margin: theme.spacing(1.2),
    },
    noMargin: {
      margin: "0px",
    },
    noBold: {
      fontWeight: "normal",
    },
    bold: {
      fontWeight: "bold",
    },
    subInfo: {
      margin: `${theme.spacing(3)}px 0`,
    },
    iconSmall: {
      fontSize: "20px",
    },
    goBack: {},
    goBackContaienr: {
      margin: `${theme.spacing(4)}px 0px`,
    },
    dashed: {
      border: "1px dashed black",
    },
    gitHubLink: {
      color: "#404040",
      textDecoration: "underline",
      textDecorationStyle: "dotted",
    },
  }));
  const classes = style();

  const id = match.params.id;
  useEffect(() => {
    fetch(`${APIURL}/users/${id}`)
      .then((data) => {
        return data.json();
      })
      .then(async (data) => {
        await setUser(data.user);
        console.log(data.user);
      });

    TweenMax.fromTo(
      [userName],
      1,
      {
        opacity: "0",
        x: -15,
      },
      {
        opacity: "1",
        x: 0,
      }
    );
  }, []);

  let userName = useRef(null);

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} md={8}>
          <Grid
            container
            className={classes.goBackContaienr}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={6} className={classes.goback}>
              <Button
                startIcon={<AiOutlineRollback />}
                color="primary"
                className={classes.dashed}
                onClick={() => {
                  history.goBack();
                }}
              >
                Go Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <h1 className={`${classes.header} ${classes.noMargin}`}>Resume</h1>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container>
              <Grid className={classes.subInfo} item xs={12}>
                <h1
                  ref={(e) => (userName = e)}
                  className={`${classes.miniMargin} ${classes.themeColor}`}
                >
                  {user.name}
                </h1>

                <h5
                  className={`${classes.miniMargin} ${classes.grey} ${classes.noBold}`}
                >
                  Age: {user.age}
                </h5>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <AiFillPhone
                            className={`${classes.iconSmall} ${classes.miniMargin}`}
                          />
                        </Grid>
                        <Grid item>
                          <h5
                            className={`${classes.miniMargin} ${classes.grey} ${classes.noBold}`}
                          >
                            {user.phno}
                          </h5>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <FiMail
                            className={`${classes.iconSmall} ${classes.miniMargin}`}
                          />
                        </Grid>
                        <Grid item>
                          <h5
                            className={`${classes.miniMargin} ${classes.grey} ${classes.noBold}`}
                          >
                            {user.email}
                          </h5>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <MdLocationCity
                            className={`${classes.iconSmall} ${classes.miniMargin}`}
                          />
                        </Grid>
                        <Grid item>
                          <h5
                            className={`${classes.miniMargin} ${classes.grey} ${classes.noBold}`}
                          >
                            {user.city}
                          </h5>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <DiGithubAlt
                            className={`${classes.iconSmall} ${classes.miniMargin}`}
                          />
                        </Grid>
                        <Grid item>
                          <a
                            href={user.github}
                            className={classes.gitHubLink}
                            target="_blank"
                          >
                            <h5
                              className={`${classes.miniMargin} ${classes.noBold} `}
                            >
                              {user.github}
                            </h5>
                          </a>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.subInfo} xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <p
                      className={`${classes.miniMargin} ${classes.themeColor}`}
                    >
                      Education
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      {user.education.length > 0 ? (
                        user.education.map((education) => (
                          <Grid item xs={12}>
                            <p
                              className={`${classes.bold} ${classes.miniMargin}`}
                            >
                              {education.name}
                            </p>
                            <p
                              className={`${classes.grey} ${classes.miniMargin}`}
                            >
                              {education.institute}
                            </p>
                            <p
                              className={`${classes.grey} ${classes.miniMargin}`}
                            >
                              {education.duration}
                            </p>
                            <p
                              className={`${classes.bold} ${classes.miniMargin}`}
                            >
                              CGPA: {education.percentage}
                            </p>
                          </Grid>
                        ))
                      ) : (
                        <p className={classes.miniMargin}>No Education</p>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.subInfo} xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <p
                      className={`${classes.miniMargin} ${classes.themeColor}`}
                    >
                      Internships
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      {user.internships.length > 0 ? (
                        user.internships.map((internship) => (
                          <Grid item xs={12}>
                            <p
                              className={`${classes.bold} ${classes.miniMargin}`}
                            >
                              {internship.company}
                            </p>
                            <p
                              className={`${classes.grey} ${classes.miniMargin}`}
                            >
                              {internship.workedon}
                            </p>
                            <p
                              className={`${classes.grey} ${classes.miniMargin}`}
                            >
                              {internship.duration}
                            </p>
                          </Grid>
                        ))
                      ) : (
                        <p className={classes.miniMargin}>No internships</p>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.subInfo} xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <p
                      className={`${classes.miniMargin} ${classes.themeColor}`}
                    >
                      Courses
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      {user.courses.length > 0 ? (
                        user.courses.map((course) => (
                          <Grid item xs={12}>
                            <p
                              className={`${classes.bold} ${classes.miniMargin}`}
                            >
                              {course.name}
                            </p>
                            <p
                              className={`${classes.grey} ${classes.miniMargin}`}
                            >
                              {course.source}
                            </p>
                            <p
                              className={`${classes.grey} ${classes.miniMargin}`}
                            >
                              {course.duration}
                            </p>
                          </Grid>
                        ))
                      ) : (
                        <p className={classes.miniMargin}>No courses</p>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.subInfo} xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <p
                      className={`${classes.miniMargin} ${classes.themeColor}`}
                    >
                      Skills
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      {user.skills.length > 0 ? (
                        user.skills.map((skill) => (
                          <Grid item xs={6}>
                            <p
                              className={`${classes.bold} ${classes.miniMargin}`}
                            >
                              {skill.skill}
                            </p>
                            <p
                              className={`${classes.grey} ${classes.miniMargin}`}
                            >
                              {skill.understanding}
                            </p>
                          </Grid>
                        ))
                      ) : (
                        <p className={classes.miniMargin}>No skill</p>
                      )}
                    </Grid>
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

export default withRouter(Profile);
