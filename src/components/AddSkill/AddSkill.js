import React, { useState, useContext } from "react";
import { Button, Grid, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GrAdd, GrCheckmark } from "react-icons/gr";
import { Context } from "../../state/reducer";
import { AddSkillAction } from "../../state/actions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export default function AddSkill() {
  const [showAddSkill, toggleshowAddSkill] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [Education, AddSkill] = useState({
    skill: "",
    understanding: "Beginner",
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
    AddSkill((prev) => ({ ...prev, [name]: value }));
  }

  function submitEducation() {
    dispatch(AddSkillAction(Education));
    toggleshowAddSkill((e) => !e);
  }

  const classes = style();
  return (
    <div>
      {showAddSkill ? (
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
                    label="Skill"
                    fullWidth={true}
                    onChange={handleChange}
                    value={Education.skill}
                    name="skill"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} fullWidth={true}>
                    <InputLabel>Age</InputLabel>
                    <Select
                      label="understanding"
                      onChange={handleChange}
                      fullWidth={true}
                      value={Education.understanding}
                    >
                      <MenuItem value={"Beginner"}>Beginner</MenuItem>
                      <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                      <MenuItem value={"Expert"}>Expert</MenuItem>
                    </Select>
                  </FormControl>
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
          {showAddSkill ? (
            <Button
              variant="contained"
              onClick={() => {
                toggleshowAddSkill((p) => !p);
              }}
            >
              Hide
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<GrAdd />}
              onClick={() => {
                toggleshowAddSkill((p) => !p);
              }}
            >
              Add Skill
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
