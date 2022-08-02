import "./singlePost.css"
import "./write.css"
import { Link } from "react-router-dom";
import { useLocation } from "react-router"
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {Context} from '../../context/Context'

export default function SinglePost() {
    const path = window.location.pathname.split('/')[2];

    const [post, setPost] = useState({})
    const [postUser, setPostUser] = useState({})
    const [edit, setEdit] = useState(false)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState(post.blog_content);
    const [file, setFile] = useState(null);
    const [type, setType] = useState(post.blog_type);


    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context);
    useEffect(()=>{
      const getPost = async () => {
        const res = await axios.get('/blog/'+path);
        
        setPost(res.data);
        getUser();
      }

      getPost();
      setTitle(post.blog_title);
      setContent(post.blog_content);
      setType(post.blog_type);
    });

    const getUser = async () => {
        const res = await axios.get('/user/'+post.blog_owner);
        setPostUser(res.data);
      }

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
      else{
        newPost.photo=post.photo;
      }
      try{
        const res = await axios.put('/blog'+path,newPost);
        window.location.replace('/posts?user='+user.user_id);
      }catch(err){}
    }

    const deleteBlog = async () => {
      try{
        const res = await axios.delete('/blog/'+path);
        window.location.replace('/myposts=');
      }catch(err){}

    }

    const publishBlog = ()=>{
      try{
        const res = await axios.put('/blog/publish/'+path);
        window.location.replace('/');
      }catch(err){}
    }



    return (
      <div className = "singlePost">
      {edit ? (
        <div className="singlePostWrapper">
        
        <img className="writeImg" src={file ? URL.createObjectURL(file): PF+post.photo} alt=""/>
        
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
            value={title}
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
            value={content}
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
      :
        (<div >
            <div className= "singlePostWrapper">
              {post.photo && (<img className="PostImg" src={PF + post.photo} alt="" />)}
                
                <h1 className="singlePostTitle">
                {post.blog_title}
                {user.user_id===post.blog_owner && (<div className="singlePostEdit">
                    <i className="singlePostIcon far fa-check-circle" onClick={publishBlog} ></i>
                    <i className="singlePostIcon far fa-edit" onClick={e=>setEdit(true)} ></i>
                    <i className="singlePostIcon far fa-trash-alt" onClick={deleteBlog} ></i>
                </div>)}
                
                </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              {postUser.name || postUser.username}
            </b>
          </span>
          <span>{new Date(post.blog_date).toString().split('T')[0]}</span>
        </div>
        <p className="singlePostDesc">
          {post.blog_content}          
        </p>
      </div>
            
        </div>)}
     </div>
    )
}
