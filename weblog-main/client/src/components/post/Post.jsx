import "./post.css"
import { Link } from "react-router-dom";

export default function Post({post}) {

  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      {post.photo && (<img className="postImg" src={PF + post.photo} alt="" />)}
      
      <div className="postInfo">
        <div className="postCats">
          {post.blog_type}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post.blog_id}`} className="link" style={{textDecoration:"none", color:"inherit"}}>
            {post.blog_title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.blog_date).toISOString().split('T')[0]}</span>
      </div>
      <p className="postDesc">{post.blog_content}</p>
    </div>
  );
}
