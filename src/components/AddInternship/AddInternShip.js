import React, { useState, useContext } from "react";
import { Button, Grid, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GrAdd, GrCheckmark } from "react-icons/gr";
import { Context } from "../../state/reducer";
import { AddInternShipAction } from "../../state/actions";

export default function AddInternShip() {
  const [showAddInternship, toggleShowAddInternship] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [internship, addInternship] = useState({
    company: "",
    workedon: "",
    duration: "",
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
    addInternship((prev) => ({ ...prev, [name]: value }));
  }

  function submitInternship() {
    dispatch(AddInternShipAction(internship));
    toggleShowAddInternship((e) => !e);
  }

  const classes = style();
  return (
    <div>
      {showAddInternship ? (
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
                    label="Company name"
                    fullWidth={true}
                    onChange={handleChange}
                    value={internship.company}
                    name="company"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Worked on "
                    fullWidth={true}
                    value={internship.workedon}
                    onChange={handleChange}
                    name="workedon"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Duration"
                    fullWidth={true}
                    value={internship.duration}
                    onChange={handleChange}
                    name="duration"
                    type="number"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<GrCheckmark style={{ color: "white" }} />}
                    onClick={() => {
                      submitInternship();
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
          {showAddInternship ? (
            <Button
              variant="contained"
              onClick={() => {
                toggleShowAddInternship((p) => !p);
              }}
            >
              Hide
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<GrAdd />}
              onClick={() => {
                toggleShowAddInternship((p) => !p);
              }}
            >
              Add Internship
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
