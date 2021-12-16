import React from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import { Route} from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} />
  ) : (
    <h1 className="text-dagner"><LoadingToRedirect/></h1>
  );
};

export default UserRoute;
