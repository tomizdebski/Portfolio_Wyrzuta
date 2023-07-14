import {useState} from "react";
import {Navigate} from "react-router-dom";
import './Register.scss'

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [redirect,setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password,email}),
      headers: {'Content-Type':'application/json'},
    });
       
    if (response.status === 200) {
      alert('registration successful');
      setRedirect(true);
    } else {
      alert('registration failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input className="register__item" type="text"
             placeholder="username"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input className="register__item" type="password"
             placeholder="password"
             value={password}
             onChange={e => setPassword(e.target.value)}/>
       <input className="register__item" type="email"
             placeholder="email"
             value={email}
             onChange={e => setEmail(e.target.value)}/>
      <button className="register__item" >Register</button>
    </form>
  );
}