import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, fetchUserBytoken, clearState } from "./UserSlice";
// eslint-disable-next-line no-unused-vars
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import Home from "../../Pages/Home";

const Dashboard = () => {
  const [loading, setLoad] = useState(true);
  const history = useHistory();

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { isFetching, isError } = useSelector(userSelector);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUserBytoken({ token: localStorage.getItem("token") }));
      setLoad(false);
    } else {
      setLoad(false);
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  // const { username, email } = useSelector(userSelector);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push("/DevBootCamp/login");
    }
  }, [isError]);

  // const onLogOut = () => {
  //   localStorage.removeItem("token");

  //   window.location.reload();
  // };

  return (
    <div className="">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default Dashboard;
