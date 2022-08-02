
import {useState, useEffect, useContext} from 'react';
import "./home.css";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import {Context} from '../../context/Context';

export default function Myposts() {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(Context);
    useEffect(()=>{
    	const fetchPosts = async ()=>{
            var data = {user:user.user_id};
          
    		const res = await axios.get("/blog/myBlog/"+user.user_id);
    		setPosts(res.data);
       	}
    	fetchPosts();

    });

    return (
        <>
         <Header/>
        <div className = "home">
            <Posts posts={posts} />
            <Sidebar/>
        </div>
        </>
    )
}
