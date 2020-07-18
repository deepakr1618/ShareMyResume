import React, { useState, useEffect, useRef, useContext } from "react";
import { withRouter } from "react-router-dom";
import { APIURL, Context } from "../../state/reducer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, IconButton } from "@material-ui/core/";
import { DiGithubAlt } from "react-icons/di";
import { MdLocationCity } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { AiFillPhone, AiOutlineRollback, AiOutlineSave } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { TweenMax, Power } from "gsap";
import EditableText from "../../components/EditableText/EditableText";
import {
  SetField,
  SetUser,
  EraseUserLoginData,
  DeleteEducationAction,
  DeleteInternshipAction,
} from "../../state/actions";
import AddInternShip from "../../components/AddInternship/AddInternShip";
import AddEducation from "../../components/AddEducation/AddEducation";
import AddSkill from "../../components/AddSkill/AddSkill";

function EditResume({ match, history }) {
  const [state, dispatch] = useContext(Context);
  const [user, setUser] = useState({
    education: [],
    internships: [],
    courses: [],
    skills: [],
    name: " ",
  });

  function deleteEducation(id) {
    dispatch(DeleteEducationAction(id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function deleteInternship(id) {
    dispatch(DeleteInternshipAction(id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const style = makeStyles((theme) => ({
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
    deleteButton: {
      color: "#ff3e30",
    },
  }));
  const classes = style();

  function updateData() {
    console.log("Updating");
    fetch(`${APIURL}/users/${state.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": state.token,
      },
      body: JSON.stringify({
        data: {
          ...state.user,
        },
      }),
    })
      .then((e) => e.json())
      .then((data) => {
        console.log(data);
        if (data.type === "FORBIDDEN") {
          EraseUserLoginData();
        } else {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetch(`${APIURL}/users/${state.id}`)
      .then((data) => {
        return data.json();
      })
      .then(async (data) => {
        if (data.user) {
          await dispatch(SetUser(data.user));
        } else {
          history.push("/login");
        }
      });
  }, []);

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} ms={8}>
          <Grid
            container
            className={classes.goBackContaienr}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} className={classes.goback}>
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
          <h1 className={`${classes.header} ${classes.noMargin}`}>
            Edit my Resume
          </h1>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container>
              <Grid className={classes.subInfo} item xs={12}>
                <h1 className={classes.miniMargin}>
                  <EditableText
                    iconSize={20}
                    label="Enter your Name"
                    handleChange={(name) => {
                      dispatch(SetField({ name: "NAME", data: name }));
                    }}
                  >
                    {user.name}
                  </EditableText>
                </h1>

                <h5
                  className={`${classes.miniMargin} ${classes.grey} ${classes.noBold}`}
                >
                  Age:
                  <EditableText
                    iconSize={15}
                    label="Enter your Age"
                    size="small"
                    handleChange={(age) => {
                      dispatch(SetField({ name: "AGE", data: age }));
                    }}
                  >
                    {user.age}
                  </EditableText>
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
                            <EditableText
                              iconSize={15}
                              label="Enter your Phone Number"
                              size="small"
                              handleChange={(ph) => {
                                dispatch(SetField({ name: "PHNO", data: ph }));
                              }}
                            >
                              {user.phno}
                            </EditableText>
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
                            <EditableText
                              iconSize={15}
                              label="Enter your Email"
                              size="small"
                              handleChange={(d) => {
                                dispatch(SetField({ name: "EMAIL", data: d }));
                              }}
                            >
                              {user.email}
                            </EditableText>
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
                            <EditableText
                              iconSize={15}
                              label="Enter your City"
                              size="small"
                              handleChange={(d) => {
                                dispatch(SetField({ name: "CITY", data: d }));
                              }}
                            >
                              {user.city}
                            </EditableText>
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
                          <h5
                            className={`${classes.miniMargin} ${classes.noBold} `}
                          >
                            <EditableText
                              iconSize={15}
                              label="Enter your Github Link"
                              size="small"
                              handleChange={(d) => {
                                dispatch(SetField({ name: "GITHUB", data: d }));
                              }}
                            >
                              {user.github}
                            </EditableText>
                          </h5>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.subInfo} xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <p className={classes.miniMargin}>Education</p>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      {user.education.length > 0 ? (
                        user.education.map((education, i) => (
                          <Grid item xs={12} key={i}>
                            <Grid container>
                              <Grid item xs={10}>
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
                              <Grid item xs={2}>
                                <IconButton
                                  children={<AiFillDelete />}
                                  className={classes.deleteButton}
                                  onClick={() => {
                                    deleteEducation(education.id);
                                  }}
                                ></IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))
                      ) : (
                        <p className={classes.miniMargin}>No Education</p>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={8}>
                        <AddEducation></AddEducation>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.subInfo} xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <p className={classes.miniMargin}>Internships</p>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      {user.internships.length > 0 ? (
                        user.internships.map((internship) => (
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={10}>
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

                              <Grid item xs={2}>
                                <IconButton
                                  children={<AiFillDelete />}
                                  className={classes.deleteButton}
                                  onClick={() => {
                                    deleteInternship(internship.id);
                                  }}
                                ></IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))
                      ) : (
                        <p className={classes.miniMargin}>No internships</p>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={8}>
                        <AddInternShip></AddInternShip>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.subInfo} xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <p className={classes.miniMargin}>Courses</p>
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
                    <p className={classes.miniMargin}>Skills</p>
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
                    <AddSkill></AddSkill>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Grid
            container
            style={{
              margin: "25px 0px",
            }}
          >
            <Grid item xs={7} md={9}></Grid>
            <Grid item xs={5} md={3}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={() => {
                  updateData();
                }}
                endIcon={<AiOutlineSave />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(EditResume);
