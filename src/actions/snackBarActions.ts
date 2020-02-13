import { useReducer } from "react";

  type ActionType = {
    type: 'snackBar/status';
    payload: any;
  };
  
  const initialState = {
    status: false,
    message: '',
    type: '',
  };
  
  export const reducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
      case "snackBar/status":
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  };
  
 export default function useSnackBarActions() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function snackBarUpdate(value: any) {
     return dispatch({ type: 'snackBar/status', ...value });
    }

    return { ...state, snackBarUpdate };
  }