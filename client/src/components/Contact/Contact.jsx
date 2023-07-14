import './Contact.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import {Navigate} from "react-router-dom";
//import nodemailer = require("nodemailer");

export default function Contact(){

    const {setUserInfo,userInfo} = useContext(UserContext);

    // const [from, setFrom] = useState('');
    // const [password, setPassword] = useState('');

    // const transport = nodemailer.createTransport({
    //     jsonTransport: true
    // });

    // let mailOptions = {
    //     from: 'test@example',
    //     to: "foo@example.com",
    //     subject: "Hello World",
    //     text: "Hello world?",
    //     html: "<b>Hello world?</b>",
    // };

    // transport.sendMail(mailOptions).then((result)=>{
    //     //obsługa sukcesu
    // }).catch((error)=>{
    //     //obsługa błędu
    // })
    const username = userInfo?.username;
    
    return(
         <>
            {username ? (
                <form className="contact">
                    <h1>Skontaktuj się z nami</h1>
                    <input className="contact__item" type="text" name="name" placeholder="Imię" />
                    <input className="contact__item" type="text" name="surname" placeholder="Nazwisko" />
                    <textarea className="contact__item" name="message" placeholder="Wiadomość" rows="1"></textarea>
                    <button className="contact__item" type="submit">Wyślij</button>
                </form>
            ): <Navigate to={'/login'} />}

         </>  
        
            
    )
}