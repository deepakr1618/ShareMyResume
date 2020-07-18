import React, { useContext, useState, useEffect } from "react";
import { Context, APIURL } from "../../state/reducer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import MiniProfile from "../../components/miniProfile/MiniProfile";
import ResumeIllu from "../../assets/images/profiles.svg";

export default function Profiles() {
  const style = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(5),
    },
  }));
  useEffect(() => {
    fetch(APIURL + "/users")
      .then((data) => data.json())
      .then((data) => {
        if (data.message === "success") {
          setUsers(data.users);
        }
      });
  }, []);
  const classes = style();
  const [state, dispatch] = useContext(Context);
  const [users, setUsers] = useState([]);

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={8}>
          <Grid container justify="center">
            <img src={ResumeIllu} width="200"></img>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <h1>Resumes</h1>
        </Grid>
        <Grid item xs={10} sm={8}>
          {users.map((user, i) => (
            <MiniProfile key={i} {...user} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
