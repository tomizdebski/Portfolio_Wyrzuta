import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../../Editor";
import './EditPost.scss'

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  async function handleDelete() {
    const response = await fetch('http://localhost:4000/post/'+id, {
      method: 'DELETE',
      credentials: 'include',
    });
    
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (

    <>
      <form className="form-edit" onSubmit={updatePost}>
        <input className="form-edit__item" type="title"
              placeholder={'Title'}
              value={title}
              onChange={ev => setTitle(ev.target.value)} />
        <input className="form-edit__item" type="summary"
              placeholder={'Summary'}
              value={summary}
              onChange={ev => setSummary(ev.target.value)} />
        <input className="form-edit__item" type="file"
              onChange={ev => setFiles(ev.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button className="form-edit__item" style={{marginTop:'5px'}}>Edycja</button>
      </form>
      <button className="form-edit__item" style={{marginTop:'5px'}} onClick={handleDelete}>Kasuj</button>
  </>
  );
}