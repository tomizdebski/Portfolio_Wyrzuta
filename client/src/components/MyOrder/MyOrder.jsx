import Post from "../Post/Post";
import {useEffect, useState} from "react";

export default function MyOrder() {

    const [posts,setPosts] = useState([]);

    console.log(posts);
    useEffect(() => {
        fetch('http://localhost:4000/my-orders', {credentials: 'include'}).then(response => { // do config.js
        response.json().then(posts => {
            setPosts(posts);
        });
        });
    }, []);




    return (
        
        <div className="container-post">
         {posts.length > 0 && posts.map(post => (
        <Post key={post._id} {...post} />
        ))}
      </div>

    )
}