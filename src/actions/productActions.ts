import { useReducer } from "react";

import Product from "../services/Product";

type ActionType = {
  type: "product/get_all" | "product/set_loading";
  payload: any;
};

const initialState = {
  products: [],
  loading: false
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "product/get_all":
      return {
        ...state,
        products: action.payload
      };
    case "product/set_loading":
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default function useProductActions() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, loading } = state;
  const getAll = async () => {
    try {
      const { data, status } = await Product.getAll();
      let getAllProducts = [];
      if (status === 200) {
        getAllProducts = data;
        dispatch({
          type: "product/get_all",
          payload: getAllProducts
        });
      }
      return getAllProducts;
    } catch (error) {
      return error;
    }
  };

  const create = async (body: any) => {
    dispatch({
      type: "product/set_loading",
      payload: true
    });
    try {
      const response = await Product.create(body);
      const { data, status } = response;
      let createProductResponse = [];
      if (status === 200 || status === 201) {
        createProductResponse = data;
        getAll();
      }
      dispatch({
        type: "product/set_loading",
        payload: false
      });
      return createProductResponse;
    } catch (error) {
      dispatch({
        type: "product/set_loading",
        payload: false
      });
      return error;
    }
  };

  const get = async (id: number) => {
    try {
      const response = await Product.get(id);
      const { data, status } = response;
      let getProductResponse = [];
      if (status === 200 || status === 201) {
        getProductResponse = data;
      }
      return getProductResponse;
    } catch (error) {
      return error;
    }
  };

  const update = async (body: any) => {
    dispatch({
        type: 'product/set_loading',
        payload: true
    });
    try {
      const response = await Product.update(body);
      const { data, status } = response;
      let createProductResponse = [];
      if (status === 200 || status === 201) {
        createProductResponse = data;
        getAll();
      }
      dispatch({
        type: 'product/set_loading',
        payload: false
    });
      return createProductResponse;
    } catch (error) {
        dispatch({
            type: 'product/set_loading',
            payload: false
        });
      return error;
    }
  };

  const remove = async (id: number) => {
    try {
      const response = await Product.remove(id);
      const { data, status } = response;
      let deleteProductResponse = [];
      if (status === 200 || status === 201) {
        deleteProductResponse = data;
        getAll();
      }
      return deleteProductResponse;
    } catch (error) {
      return error;
    }
  };

  return { products, getAll, create, get, update, remove, loading, dispatch };
}
