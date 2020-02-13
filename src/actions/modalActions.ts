import { useReducer } from "react";

type ActionType = {
  type: "modal/status";
  payload: any;
};

const initialState = {
  status: false,
  element: null,
  isLoader: false,
  customSize: "",
  title: ""
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "modal/status":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default function useModalActions() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateModal = (value: any) =>
    dispatch({ type: "modal/status", ...value });
  return { state, updateModal, dispatch };
}
