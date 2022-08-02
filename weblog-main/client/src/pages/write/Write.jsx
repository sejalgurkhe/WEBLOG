import "./write.css"
import {useState, useContext} from "react";
import {Context} from "../../context/Context";
import axios from 'axios';

export default function Write() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [type, setType] = useState("");

  const {user} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      user_id: user.user_id,
      title: title,
      type: type,
      content: content,
    };
    if(file){
      const data = new FormData();
      const filename = Date.now()+file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try{
        await axios.post('/upload', data);
      }catch(err){}
    }
    try{
      const res = await axios.post('/blog',newPost);
      window.location.replace('/myposts');
    }catch(err){}
  }

    return (
      <div className="write">
        {file && (<img className="writeImg" src={URL.createObjectURL(file)} alt=""/> )}
        
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e)=>setTitle(e.target.value)}
          />
          <select value={type} onChange={(e)=>setType(e.target.value)} style={{width:'150px', marginLeft:'300px'}}>
            <option name="Music"> Music</option>
            <option name="Life">Life</option>
            <option name="Sport">Sport</option>
            <option name="Science">Science</option>
          </select>
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e)=>setContent(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Save
        </button>
      </form>
        </div>
    )
}
