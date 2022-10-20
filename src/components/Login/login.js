import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = (prop)=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError]  = useState("");
    const ERROR = useRef();

    const loginProcess = ()=>{
        const fetchData = async()=>{
            await axios({
                method: "post",
                url: "/login",
                headers: {
                    "Access-Control-Allow-Origin" : "https://css-note-app.herokuapp.com",
                    "Access-Control-Allow-Credentials" : true,
                    "Content-Type" : "application/json"
                },
                withCredentials: true,
                data: {
                    e : `${email}`,
                    p : `${password}`
                }
            })
            .then((ob)=>{
                if(ob.data.message){
                    prop.SetUser(ob.data.username);
                    prop.ShowSet(
                        {
                            home : true,
                            create : false,
                            search : false,
                            login : false,
                            register : false
                        }
                    )
                }else{
                    setError("email or password is wrong");
                    setInterval(()=>{
                        setError('');
                    }, 5000);
                }
            })
        }
        if(email !== "" && password !== "") fetchData();
        else{
            setError("Do fill every field");
            setInterval(()=>{
                setError('');
            }, 5000);
        }
    }

    if(prop.login){
        return(
            <div className="login">
                <input type="text" className="my-2 py-2" placeholder="Email" 
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <input type="password" className="py-2" placeholder="Password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button className="my-2 btn btn-outline-dark btn-bg" onClick={loginProcess}>Login</button>
                <p style={{fontSize : "0.5em", color: "red"}} ref={ERROR}>{error}</p>
                <div className="createAccount">
                    <span>New to us - </span>
                    <a onClick={prop.regAlert}>Create an Account</a>
                </div>
            </div>
        );
    }
    return(
        <></>
    );
}

export default Login;