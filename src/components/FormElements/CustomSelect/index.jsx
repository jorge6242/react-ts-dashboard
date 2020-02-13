import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  select: {
    padding: "10px 0px 10px 0px",
    width: " 100%",
    backgroundColor: "transparent",
    border: 0,
    borderBottom: "1px solid grey",
    fontSize: "16px",
    '&:hover': {
        outline: 0,
      },
  },
  message: {
    color: "#f44336",
    marginTop: "4px",
    fontSize: "0.75rem",
    minHeight: "1em",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "1em",
    letterSpacing: "0.03333em"
  }
}));

export default function CustomSelect({
  field,
  required,
  register,
  errorsMessageField,
  children
}) {
  const classes = useStyles();
  return (
    <div>
      <select
        className={classes.select}
        ref={register({
          required: required ? "Required" : false
        })}
        name={field}
      >
        <option value="">Select option</option>
        {children}
      </select>
      <div className={classes.message}>{errorsMessageField}</div>
    </div>
  );
}
