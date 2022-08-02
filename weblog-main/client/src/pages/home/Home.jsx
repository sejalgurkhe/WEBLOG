
import {useState, useEffect} from 'react';
import "./home.css";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const search = window.location.search;
    useEffect(()=>{
    	const fetchPosts = async ()=>{
    		const res = await axios.get("/blog"+search);
    		setPosts(res.data);
    	}
    	fetchPosts();

    },[search]);

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
