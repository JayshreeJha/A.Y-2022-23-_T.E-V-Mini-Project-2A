// import React, {useEffect} from "react";
// import { Redirect, Route } from "react-router-dom";

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       dispatch(fetchUserBytoken({ token: localStorage.getItem("token") }));
//       setLoad(false);
//     } else {
//       setLoad(false);
//     }
//   }, []);
//   return (
//   <Route
//     {...rest}
//     render={(props) =>
//       localStorage.getItem("token") ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/DevBootCamp/login",
//             state: { from: props.location },
//           }}
//         />
//       )
//     }
//   />
//   )
// );

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userSelector,
  fetchUserBytoken,
  clearState,
} from "../features/Users/UserSlice";

import { Route, Redirect } from "react-router-dom";

// import { useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  // const { userLoggedIn } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const { isError } = useSelector(userSelector);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUserBytoken({ token: localStorage.getItem("token") }));
      // setLoad(false);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push("/DevBootCamp/login");
    }
  }, [isError]);

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/DevBootCamp/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
