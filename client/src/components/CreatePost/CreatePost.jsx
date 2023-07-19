import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState, useContext, useEffect} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../../Editor";
import {UserContext} from "../../UserContext";
import "./CreatePost.scss"

export default function CreatePost() {

  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {userInfo} = useContext(UserContext);

  if (!Object.keys(userInfo).length > 0) return <Navigate to={'/login'} />;

  async function createNewPost(ev) {
    ev.preventDefault();    
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  
  return (
    <form className="form-add" onSubmit={createNewPost}>
      <input className="form-add__item" type="title"
             placeholder={'Tytuł'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input className="form-add__item" type="summary"
             placeholder={'Lokalizacja : miasto , ulica , nr'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input className="form-add__item file" type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor className="form-add__editor" value={content} onChange={setContent} />
      <button className="form-add__item"style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}