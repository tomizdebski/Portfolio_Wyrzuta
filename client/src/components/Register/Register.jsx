import {useState} from "react";
import {Navigate} from "react-router-dom";
import { object, string, number, date, InferType } from 'yup';
import './Register.scss'

let userSchema = object({
                          username: string().min(5).required(),
                          password: string().min(5).required(),
                          email: string().email(),
                          street: string().required(),
                          city: string().required(),
                          zip: string().required(),
                        },
                        { strict: true },
                        );


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const [redirect,setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();

    try {
      const validate = await userSchema.validate({username,password,email,city,street,zip});
    } catch (error) {
      console.log(error.type);
      alert(`Błąd walidacji : ${error.type}`);
    }
    
    

    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password,email,city,street,zip}),
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
      <input required className="register__item" type="text"
             placeholder="nazwa urzytkownika"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input required className="register__item" type="password"
             placeholder="hasło"
             value={password}
             onChange={e => setPassword(e.target.value)}/>
       <input required className="register__item" type="email"
             placeholder="email"
             value={email}
             onChange={e => setEmail(e.target.value)}/>
      <input required className="register__item" type="text"
             placeholder="ulica"
             value={street}
             onChange={e => setStreet(e.target.value)}/>
      <input required className="register__item" type="text"
             placeholder="kod pocztowy"
             value={zip}
             onChange={e => setZip(e.target.value)}/>
      <input required className="register__item" type="text"
             placeholder="miasto"
             value={city}
             onChange={e => setCity(e.target.value)}/>
      <button className="register__item" >Register</button>
    </form>
  );
}