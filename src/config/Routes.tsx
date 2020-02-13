import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Dashboard from "../containers/dashboard";
import Product from "../containers/product";
import Modal from "../components/Modal";
import MainLayout from "../Hoc/MainLayout";
import SnackBar from "../components/SnackBar";
import Login from "../containers/login";
import { useStore } from "../store";
import SecureStorage from "./SecureStorage";
import Category from "../containers/category";

export default function Routes() {
  const { checkUser } = useStore('useLoginStore')

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/dashboard"
            exact={false}
            component={() => {
              if (SecureStorage.getItem("token")) {
                return (
                  <Switch>
                    <Dashboard>
                      <Route
                        path="/dashboard/category"
                        exact
                        component={Category}
                      />
                      <Route
                        path="/dashboard/product"
                        exact
                        component={Product}
                      />
                    </Dashboard>
                  </Switch>
                );
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
        <Modal />
        <SnackBar />
      </MainLayout>
    </Router>
  );
}
