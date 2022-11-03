import React, { useEffect, useState } from "react";
// import "./index.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { CourseInfo } from "../Components/CourseInfo";
// import { CardCourse } from "../Components/CardCourse";
// import Sidebar from "../Components/Sidebar";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCourse,
  userSelector,
  checkenrollUser,
  enrollUser,
  // clearState,
} from "../features/Data/fetchData";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
// import { Redirect } from "react-router";

const Courseinfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    // isFetching,
    //e,
    isSuccess,
    courseData,
    isError,
    isEnrolled,
  } = useSelector(userSelector);
  const location = useLocation();
  const [pathName, setPathName] = useState(null);

  useEffect(() => {
    if (location) {
      let tmp = location.pathname.slice(
        location.pathname.lastIndexOf("/"),
        location.pathname.length
      );
      console.log(tmp);
      setPathName(tmp);
    }
  }, [location]);

  const enrolluserFunc = (e) => {
    e.preventDefault();
    console.log("abc");
    if (pathName) {
      const token = localStorage.getItem("token");
      dispatch(enrollUser({ token: token, id: pathName }));
    }
  };

  useEffect(() => {
    if (pathName) {
      const token = localStorage.getItem("token");
      dispatch(getCourse({ token: token, id: pathName }));

      // dispatch(checkenrollUser({ token: token, id: pathName }));
    }
  }, [pathName]);

  useEffect(() => {
    if (isError) {
      history.push("/");
    }
    if (isSuccess && pathName) {
      const token = localStorage.getItem("token");
      dispatch(checkenrollUser({ token: token, id: pathName }));
    }
  }, [isError, isSuccess]);

  return (
    <>
      {!isSuccess ? (
        <div className="flex items-center justify-center h-screen">
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div className="flex">
          <main className="flex-1">
            <Navbar />
            <CourseInfo
              enrollstatus={isEnrolled}
              enroll={(e) => enrolluserFunc(e)}
              data={courseData}
            />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
};
export default Courseinfo;
