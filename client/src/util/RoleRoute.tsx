import React, { ElementType } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { UserRole } from "../Types/DatabaseTypes";
import { IRootState } from "../redux/store";

interface IProps {
  Icomponent: ElementType;
  exact: boolean;
  path: string;
  role?: string;
  requiredRole?: UserRole;
}

const RoleRoute = ({ Icomponent, requiredRole, ...rest }: IProps) => {
  const userRole =
    "admin"; /*useSelector(
    (state: IRootState) => state.user.userData.credentials.role
  );*/
  let roleAccepted;
  if (requiredRole) {
    console.log(
      "roleRequired: " +
        UserRole[requiredRole] +
        " userRole: " +
        (userRole ? userRole : null)
    );
    if (userRole) {
      if (userRole === UserRole[requiredRole]) roleAccepted = true;
    } else roleAccepted = false;
  } else roleAccepted = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        roleAccepted ? <Icomponent {...props} /> : <Redirect to="/noPerm" />
      }
    />
  );
};

export default RoleRoute;
