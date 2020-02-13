import React from "react";
import TextField from "@material-ui/core/TextField";

const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  message: "invalid email address"
}

export default function CustomTextField({
    placeholder,
    field,
    required,
    register,
    errorsField,
    errorsMessageField,
    isEmail
  }) {
    return (
      <TextField
        margin="dense"
        fullWidth
        autoFocus
        placeholder={placeholder}
        name={field}
        inputRef={register({
          required: required ? "Required" : false,
          pattern: isEmail ? emailPattern : null
        })}
        required={errorsField ? true : false}
        error={errorsField ? true : false}
        helperText={errorsField && errorsMessageField}
      />
    );
  }