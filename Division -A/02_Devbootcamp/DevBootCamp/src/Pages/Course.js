import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { CourseInfo } from "../Components/CourseInfo";
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
import { CoursePanel } from "./CoursePanel";

const Courseinfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isSuccess, courseData, isError, isEnrolled, checkCompletion } =
    useSelector(userSelector);
  const location = useLocation();
  const [pathName, setPathName] = useState(null);
  const [showcontent, setShowcontent] = useState(false);

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

  const enrolluserFunc = () => {
    // e.preventDefault();
    console.log("abc");
    if (pathName) {
      const token = localStorage.getItem("token");
      dispatch(enrollUser({ token: token, id: pathName }));
    }
  };

  const setShowcontentFunc = (e) => {
    e.preventDefault();
    setShowcontent(!showcontent);
  };

  useEffect(() => {
    if (pathName) {
      const token = localStorage.getItem("token");
      dispatch(getCourse({ token: token, id: pathName }));
    }
  }, [pathName, checkCompletion]);

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
        <>
          {showcontent ? (
            <CoursePanel tongle={(e) => setShowcontentFunc(e)} />
          ) : (
            <div className="flex">
              <main className="flex-1">
                <Navbar />
                <CourseInfo
                  enrollstatus={isEnrolled}
                  enroll={enrolluserFunc}
                  data={courseData}
                  tongle={(e) => setShowcontentFunc(e)}
                />
                <Footer />
              </main>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Courseinfo;
