import "./login.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import {Context} from '../../context/Context';

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { dispatch, isFetching } = useContext(Context);

  const userRef = useRef();
  const passwordRef = useRef();
  
  const handleSubmit = async (e) => {
      e.preventDefault();

      dispatch({type:"LOGIN_START"});

      try {
          const res = await axios.post("/auth/login", {
              username: userRef.current.value,
              password: passwordRef.current.value
          });    
          dispatch({type:"LOGIN_SUCCESS", payload: res.data });

      } catch (err) {
          setError(true);
          dispatch({type:"LOGIN_FAILURE" });
      }
  };

  
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit} >
        <label>Username</label>
        <input className="loginInput" 
          type="text" 
          placeholder="Enter your username..."  
          onChange = {(e)=>setUsername(e.target.value)}
          ref={userRef}
        />
        <label>Password</label>
        <input className="loginInput" 
          type="password" 
          placeholder="Enter your password..." 
          onChange = {(e)=>setPassword(e.target.value)}
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching} >Login</button>
      </form>
        <button className="loginRegisterButton">
        <Link className="link" to="/register" style={{textDecoration:"none", color:"inherit"}}>Register</Link></button>
    </div>
  );
}