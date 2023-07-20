import Post from "../Post/Post";
import {useEffect, useState} from "react";
import './MyOrder.scss'

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
        <>
            <h1>Koszyk</h1>
            <div className="container-post">
                {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} remove={true}/>
                ))}
            </div>
        </>
        

    )
}