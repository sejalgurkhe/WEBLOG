import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import {Context} from '../../context/Context';
import {useState,useContext} from 'react';
import axios from 'axios'

export default function Settings() {

  const {user, dispatch} = useContext(Context);
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || 0);
  const [file, setFile] = useState(null);

  const PF = "http://localhost:5000/images/";  


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const User = {
      username,
      password,
      name,
      gender,
      age
    };
    
    if(file){
      const data = new FormData();
      const filename = Date.now()+file.name;
      data.append('name', filename);
      data.append('file', file);
      User.photo = filename;
      try{
        await axios.post('/upload', data);
      }catch(err){}
    }
    try{
      const res = await axios.put('/user',User);
      dispatch({type:"UPDATE_SUCCESS", payload: res.data });
      window.location.replace('/settings');
    }catch(err){
      dispatch({type:"LOGIN_FAILURE" });
    }
  }
  
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.photo}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={e=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" value={username} name="name" onChange={e=>setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={e=>setPassword(e.target.value)} />
          <label>Name</label>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} />
          <label>Gender</label>
          <select value={gender} onChange={(e)=>setGender(e.target.value)} style={{width:'150px', marginLeft:'300px'}}>
            <option name="male">Male</option>
            <option name="female">Female</option>
          </select>
          <label>Age</label>
          <input type="number" value={age} onChange={e=>setAge(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}