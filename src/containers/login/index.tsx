import React from "react";
import { useHistory } from "react-router-dom"

import "./index.sass";
import LoginForm from "../../components/LoginForm";
import { useStore } from "../../store";

export default function Login() {
  const history = useHistory()
  const { loading, login } = useStore('useLoginStore');
  const { snackBarUpdate } = useStore('useSnackBarStore');

  const handleForm = (form: object) => {
    login(form).then(() => {
      history.push('/dashboard')
    }).catch((err: any) => {
      const { data: { message } } = err;
      snackBarUpdate({
        payload: {
          message,
          status: true,
          type: "error"
        }
      })
    })
  };
  return (
    <div className="login-container">
      <div className="login-container__form">
        <LoginForm loading={loading} handleForm={handleForm} />
      </div>
    </div>
  );
}
