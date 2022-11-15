import React, { useState } from "react"
import '../PagesCss/Login.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"


const Login = ({ setLoginUser }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/login", user)
            .then(res => {
                setLoginUser(res.data.user)
                if (res.data.user)
                    navigate("/searchbar")

                else alert(res.data.message)
            })
    }


    return (
        <>
            <div className="bg4">
                <video className="rbgvideo" autoPlay loop muted>
                    <source id="mp4" src='https://res.cloudinary.com/dsp4p9uyy/video/upload/v1667690103/DAM%20video%20tutorials/Registerbg_1_imqtw7.mp4' type="video/mp4" />
                </video>




            </div>


            <div className="contentplace">



                <div className="login">
                    <h1>Login</h1>
                    <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
                    <div className="btn" onClick={login} setLoginUser={user}>Login</div>
                    <div>or</div>
                    <div className="btn" onClick={() => navigate("/sign-up")}>Register</div>
                </div>
            </div>
    </>
    )
}

export default Login