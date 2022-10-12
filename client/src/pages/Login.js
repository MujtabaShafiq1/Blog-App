import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "../components/UI/AuthForm.module.css"
import Button from "../components/UI/Button";
import { useDispatch } from "react-redux";
import { AuthActions } from "../store/AuthSlice";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const loginHandler = async (e) => {
    e.preventDefault()
    const data = { username: username, password: password }
    try {
      const response = await axios.post("http://localhost:3001/auth/login", data)
      if (response.data.error) throw new Error(response.data.error)

      dispatch(AuthActions.login({ username: response.data.username, id: response.data.id, status: true }))
      localStorage.setItem("accessToken", response.data.token)
      navigate("/")

    } catch (e) {
      alert(e);
    }
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value)
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  return (

    <form className={classes.form}>
      <div className={classes.control}>
        <label>Username: </label>
        <input
          autoComplete="off"
          name="username"
          placeholder="Username"
          onChange={(e) => usernameHandler(e)}
        />
      </div>
      <div className={classes.control}>
        <label>Password: </label>
        <input
          autoComplete="off"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => passwordHandler(e)}
        />
      </div>
      <div className={classes.actions}>
        <Button onClick={loginHandler}>Login</Button>
      </div>
    </form>
  )
}

export default Login