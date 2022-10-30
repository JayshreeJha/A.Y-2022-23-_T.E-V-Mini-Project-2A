import React from "react";
import "./stylezoom.css";
// const src = "https://images.unsplash.com/photo-1444065381814-865dc9da92c0";
const Zoom = (props) => {
  return <div className="img-wrapper">{props.children}</div>;
};
export default Zoom;
