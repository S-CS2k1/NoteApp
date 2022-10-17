import { useState, useRef } from "react";
import './result.css';
import axios from "axios";

const Result = ({res})=>{

    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Like, setLike] = useState(false);
    const [load, setLoad] = useState("Save");
    const [Message, setMessage] = useState();
    const [h, setH] = useState("none");
    const [nh, setNH] = useState("inline");

    const heart = useRef();
    const heartFill = useRef();

    const Edit = ()=>{
        setTitle(res.title);
        setContent(res.content);
        res.title = undefined;
        res.content = undefined;
    }

    const like = ()=>{
        heart.current.style.display = "none";
        heartFill.current.style.display = "inline";
        setLike(true);
    }

    const disLike = ()=>{
        heart.current.style.display = "inline";
        heartFill.current.style.display = "none";
        setLike(false);
    }

    const sendNote = async ()=>{
        setLoad('a sec.....');
        await axios({
            method : 'post',
            url : '/updateNote',
            headers : {},
            data : {
                id : `${res._id}`,
                title : `${Title}`,
                content : `${Content}`,
                like : Like
            }
        })
        .then((ob)=>{
            console.log(ob);
            setLoad('Saved');
            setInterval(()=>{
                setLoad('Save');
            }, 3000)
            setTitle(ob.data.title);
            setContent(ob.data.content);
            if(ob.data.like){
                setLike(true);
                heart.current.style.display = "none";
                heartFill.current.style.display = "inline";
            }else{
                setLike(false);
                heart.current.style.display = "inline";
                heartFill.current.style.display = "none";
            }
        })
        .catch((ob)=>{
            console.log(ob);
        })
    }


    return(
        <div className="result px-5">
                <input type="text" className="my-2 py-2" placeholder="Title" 
                    onChange={(e)=>{setTitle(e.target.value)}}
                    value={res.title === undefined ? Title : res.title}
                />
                <textarea name="note" cols="30" rows="7" className="" placeholder="Content"
                    onChange={(e)=>{setContent(e.target.value)}}
                    value={res.content === undefined ? Content : res.content}
                ></textarea>
                <div className='resultFooter container-fluid row-10'>
                    <span className='message'>{Message}</span>
                    <button className="my-2 btn btn-outline-dark col-7" onClick={sendNote}>{load}</button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className='bi bi-heart' viewBox="0 0 16 16" onClick={like} ref={heart} style={{display : `${res.like ? "none" : "inline"}`}}>
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16" ref={heartFill} style={{display : `${res.like ? "inline" : "none"}`}} onClick={disLike}>
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" onClick={Edit}>
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </div>
            </div>
    );
} 

export default Result;