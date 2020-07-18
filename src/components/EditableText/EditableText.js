import React, { useState, useEffect } from "react";
import { FiEdit3, FiCheck } from "react-icons/fi";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TweenMax } from "gsap";

export default function EditableText({
  children,
  iconSize,
  label,
  size,
  handleChange,
}) {
  const [editable, makeEditable] = useState(false);
  const [data, setData] = useState("");
  iconSize = iconSize ? `${iconSize}px` : "15px";
  const style = makeStyles((theme) => ({
    iconFontSize: {
      fontSize: iconSize,
    },
    textSize: {
      fontSize: "15px",
    },
  }));
  useEffect(() => {
    setData(children);
  }, [children]);

  const classes = style();
  return (
    <React.Fragment>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          {editable ? (
            <TextField
              className={classes.input}
              value={data}
              size={size ? size : "medium"}
              onChange={(e) => setData(e.target.value)}
            />
          ) : (
            children
          )}
        </Grid>
        <Grid item>
          {editable ? (
            <IconButton
              children={<FiCheck className={classes.iconFontSize} />}
              onClick={() => {
                makeEditable((e) => !e);
                handleChange(data);
              }}
            ></IconButton>
          ) : (
            <IconButton
              children={<FiEdit3 className={classes.iconFontSize} />}
              onClick={() => {
                makeEditable((e) => !e);
              }}
            ></IconButton>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
