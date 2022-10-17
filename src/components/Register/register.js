import axios from "axios";
import { useEffect, useRef, useState } from "react";
import './register.css';

const Register = (prop)=>{

    const [email, setEmail] = useState();
    const [username, setUser] = useState();
    const [password, setPassword] = useState('');
    const [conpassword, setConPassword] = useState();
    const [err, setErr] = useState('');
    const [something_went_wrong, setSWW] = useState('');

    const btnMessage = useRef();
    const ERR = useRef();

    const loginProcess = ()=> {
        const reg = async ()=>{
            btnMessage.current.innerText = "a sec....";
            await axios({
                method : "post",
                header : {},
                url : "https://css-note-app.herokuapp.com/register",
                data : {
                    user : `${username}`,
                    email : `${email}`,
                    password : `${password}`
                }
            })
            .then((e)=>{
                console.log(e.data);
                if(e.data.message){
                    btnMessage.current.innerText = "Registered";
                    prop.SetUser(e.data.username);
                    setInterval(()=>{
                        prop.ShowSet(
                            {
                                home : true,
                                create : false,
                                search : false,
                                login : false,
                                register : false
                            }
                        )
                    }, 2000);
                }else{
                    setSWW('Something went wrong');
                    ERR.current.style.display = "inline block";
                    setInterval(()=>{
                        ERR.current.style.display = "none";
                    }, 2000);
                }
            })
            .catch((e)=>{
                console.log(e);
                setSWW('Something went wrong');
                ERR.current.style.display = "block";
                setInterval(()=>{
                    ERR.current.style.display = "none";
                }, 10500);
            })
        }
        if(password == conpassword) reg();
    }

    useEffect(()=>{
        if(password != '' && conpassword === password) setErr(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>);
        else setErr(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>);
    },[conpassword])

    if(prop.Reg){
        return(
            <div className="register p-3">
                <input type="text" className="my-1 p-1" placeholder="Username" id="email"
                    onChange={(e)=>{setUser(e.target.value)}}
                />
                <input type="email" className="p-1" placeholder="Email" 
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <input type="password" className="my-1 p-1" placeholder="Password" 
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <input type="password" className="p-1" placeholder="Confirm Password" 
                    onChange={(e)=>{setConPassword(e.target.value)}}
                />
                <span className="err p-1" >{err}</span>
                <p style={{display : "block", fontSize : "0.5em", color: "red"}} ref={ERR}>{something_went_wrong}</p>
                <button className="btn btn-outline-dark btn-bg" onClick={loginProcess} ref={btnMessage}>Register</button>
                <div className="createAccount">
                    <span>Already have an accout - </span>
                    <a href="">Login</a>
                </div>
            </div>
        );
    }
    else return(<></>);
}

export default Register;