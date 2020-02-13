import { useReducer } from "react";

import Category from "../services/Category";

type ActionType = {
  type: "category/get_all" | "category/get" | "category/set_loading";
  payload: any;
};

const initialState = {
  categories: [],
  loading: false
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "category/get_all":
      return {
        ...state,
        categories: action.payload
      };
    case "category/set_loading":
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default function useCategoryActions() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { categories, loading } = state;
  const getAll = async () => {
    try {
      const { data, status } = await Category.getAll();
      let getAllCategories = [];
      if (status === 200) {
        getAllCategories = data;
        dispatch({
          type: "category/get_all",
          payload: getAllCategories
        });
      }
      return getAllCategories;
    } catch (error) {
      return error;
    }
  };

  const create = async (body: any) => {
    try {
      const response = await Category.create(body);
      const { data, status } = response;
      let createCategoryResponse = [];
      if (status === 200 || status === 201) {
        createCategoryResponse = data;
        getAll();
        
      }
      return createCategoryResponse;
    } catch (error) {
      return error;
    }
  };

  const get = async (id: number) => {
    try {
      const response = await Category.get(id);
      const { data, status } = response;
      let getCategoryResponse = [];
      if (status === 200 || status === 201) {
        getCategoryResponse = data;
      }
      return getCategoryResponse;
    } catch (error) {
      return error;
    }
  };

  const update = async (body: any) => {
    dispatch({
      type: "category/set_loading",
      payload: true
    });
    try {
      const response = await Category.update(body);
      const { data, status } = response;
      let updateCategoryResponse = [];
      if (status === 200 || status === 201) {
        updateCategoryResponse = data;
        getAll();
      }
      dispatch({
        type: "category/set_loading",
        payload: false
      });
      return updateCategoryResponse;
    } catch (error) {
      dispatch({
        type: "category/set_loading",
        payload: false
      });
      return error;
    }
  };

  const remove = async (id: number) => {
    try {
      const response = await Category.remove(id);
      const { data, status } = response;
      let deleteCategoryResponse = [];
      if (status === 200 || status === 201) {
        deleteCategoryResponse = data;
        getAll();
      }
      return deleteCategoryResponse;
    } catch (error) {
      return error;
    }
  };
  return { categories, getAll, create, get, remove, update, loading };
}
