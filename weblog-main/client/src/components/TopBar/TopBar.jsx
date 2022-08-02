import { Link } from "react-router-dom";
import "./topbar.css";
import {useContext} from 'react';
import {Context} from '../../context/Context';

export default function Topbar() {
  const {user,dispatch}=useContext(Context);

  const handleLogout=()=>{
    dispatch({type:"LOGOUT"});
  }

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/" style={{textDecoration:"none", color:"inherit"}}>
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write" style={{textDecoration:"none", color:"inherit"}}>
              WRITE
            </Link>
          </li>
          {user && <li className="topListItem" onClick={handleLogout} >LOGOUT</li>}
          {user && (
            <li className="topListItem">
            <Link className="link" to="/myposts" style={{textDecoration:"none", color:"inherit"}}>
              MY POSTS
            </Link>
          </li>) 
          }
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login" style={{textDecoration:"none", color:"inherit"}}>
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register" style={{textDecoration:"none", color:"inherit"}}>
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}