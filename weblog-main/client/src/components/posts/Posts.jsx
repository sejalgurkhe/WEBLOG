import "./posts.css"
import Post from "../../components/post/Post"

export default function Posts({posts}) {
    return (
        <div className = "posts">
            
            {

            	posts.map(p=>(
            		<Post post={p} />
            	))
            }
        </div>
    )
}
