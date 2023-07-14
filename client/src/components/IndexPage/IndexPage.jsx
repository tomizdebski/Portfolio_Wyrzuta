import Post from "../Post/Post";
import './IndexPage.scss'

import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => { // do config.js
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
        <div className="slogan-container">
        <div className="slogan--item">
          <h1>
            Nie wyrzucaj oddaj!<br />
            Oddaj niechciane rzeczy w zaufane ręce
          </h1>
        </div>
        
      </div>
      <div className="container-post">
         {posts.length > 0 && posts.map(post => (
        <Post {...post} />
        ))}
      </div>
     
    </>
  );
}