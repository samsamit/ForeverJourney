import React, { ElementType } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface IProps {
  Icomponent: ElementType;
  authenticated?: boolean;
  exact: boolean;
  path: string;
}

const AuthRoute = ({ Icomponent, ...rest }: IProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.authenticated ? (
          <Icomponent {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
