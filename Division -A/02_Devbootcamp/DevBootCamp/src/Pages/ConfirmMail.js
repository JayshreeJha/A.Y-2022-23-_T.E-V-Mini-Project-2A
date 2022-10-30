import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ConfirmMail = () => {
  const { mailtoken } = useParams();
  const [message, setMessage] = useState("");
  async function confirm(token) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}confirm/${token}`,
      {
        method: "GET",
        headers: {
          "x-access-tokens": localStorage.getItem("token"),
        },
      }
    );

    let data = await response.json();
    // console.log("data", data);

    if (response.status === 200) {
      setMessage(data.message);
    } else {
      setMessage(data.message);
    }
  }

  useEffect(() => {
    if (mailtoken) {
      confirm(mailtoken);
    }
  }, []);

  return (
    <div>
      Confirming mail
      <p> Output:- {message} </p>
    </div>
  );
};
