import { useReducer } from "react";

import Auth from "../services/Auth";
import SecureStorage from "../config/SecureStorage";

type ActionType = {
  type: "login/login" | "login/set_user" | "login/logout" | "login/set_loading";
  payload: any;
};

const initialState = {
  user: {
    username: "",
    email: "",
    age: 0
  },
  status: false,
  loading: false
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "login/set_user":
      return {
        ...state,
        user: action.payload,
        status: true
      };
    case "login/logout":
      SecureStorage.removeItem("token");
      window.location.href = "/";
      return {
        ...state,
        ...initialState
      };
    case "login/set_loading":
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default function useLoginActions() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (body: object) => {
    dispatch({ type: 'login/set_loading', payload: true })
    try {
        const response = await Auth.login(body);
        let authResponse: any = [];
        const { data, status } = response;
        if (status === 200 || status === 201) {
            authResponse = response ;
            const { access_token: { token }, user } = data;
            SecureStorage.setItem('token', token);
            dispatch({ type: 'login/set_user', payload: user })
            dispatch({ type: 'login/set_loading', payload: false })
        }
        return authResponse;
    } catch (error) {
        dispatch({ type: 'login/set_loading', payload: false })
        throw error.response;
    }
};


const logout = () => dispatch({ type: 'login/logout', payload: null })

const checkUser = async () => {
    try {
        const {
            data,
            status
        } = await Auth.checkLogin();
        let checkUserLoginResponse = [];
        if (status === 200) {
            checkUserLoginResponse = data;
            dispatch({ type: 'login/set_user', payload: data })
        }
        return checkUserLoginResponse;
    } catch (error) {
        return error;
    }
};

  return { login, checkUser, logout, state };
}
