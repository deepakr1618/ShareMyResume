import React, { useState, useContext } from "react";
import { Button, Grid, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GrAdd, GrCheckmark } from "react-icons/gr";
import { Context } from "../../state/reducer";
import { AddEducationAction } from "../../state/actions";

export default function AddEducation() {
  const [showAddEducation, toggleshowAddEducation] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [Education, addEducation] = useState({
    name: "",
    institute: "",
    duration: "",
    percentage: "",
  });
  const style = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
    },
    inputContainer: {
      "&>*": {
        margin: theme.spacing(1),
      },
    },
    miniMargin: {
      margin: theme.spacing(2),
    },
  }));

  function handleChange(e) {
    const { name, value } = e.target;
    addEducation((prev) => ({ ...prev, [name]: value }));
  }

  function submitEducation() {
    dispatch(AddEducationAction(Education));
    toggleshowAddEducation((e) => !e);
  }

  const classes = style();
  return (
    <div>
      {showAddEducation ? (
        <Grid container justify="center">
          <Grid item xs={12} md={12}>
            <Paper elevation={3} className={classes.paper}>
              <Grid
                container
                className={classes.inputContainer}
                justify="center"
              >
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Course"
                    fullWidth={true}
                    onChange={handleChange}
                    value={Education.name}
                    name="name"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Institute"
                    fullWidth={true}
                    value={Education.institute}
                    onChange={handleChange}
                    name="institute"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Duration"
                    fullWidth={true}
                    value={Education.duration}
                    onChange={handleChange}
                    name="duration"
                    type="number"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Percentage"
                    fullWidth={true}
                    value={Education.percentage}
                    onChange={handleChange}
                    name="percentage"
                    type="number"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<GrCheckmark style={{ color: "white" }} />}
                    onClick={() => {
                      submitEducation();
                    }}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : null}
      <Grid container className={classes.miniMargin}>
        <Grid item>
          {showAddEducation ? (
            <Button
              variant="contained"
              onClick={() => {
                toggleshowAddEducation((p) => !p);
              }}
            >
              Hide
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<GrAdd />}
              onClick={() => {
                toggleshowAddEducation((p) => !p);
              }}
            >
              Add Education
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
