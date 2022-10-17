import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './create.css';

const Create = (prop)=>{

    // useEffect(()=>{
    //     const c = document.querySelector(".nav-link:nth-of-type(2)");
    //     if(prop.create) c.style.borderBottom = "1px solid black";
    //     else c.style.borderBottom = "1px solid transparent";
    // })

    const heart = useRef();
    const heartFill = useRef();

    const [Like, setLike] = useState(false);
    const [h, setH] = useState("none");
    const [nh, setNH] = useState("inline");

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

    const [Title, setTitle] = useState();
    const [Content, setContent] = useState();
    const [Message, setMessage] = useState('');
    const [load, setLoad] = useState('Save');

    if(prop.title !== undefined){
        setTitle(prop.title);
        setContent(prop.content);
        if(prop.like) setH("inline");
        else setNH("inline");
    }

    console.log(prop);

    const sendNote = async ()=>{
        setLoad('a sec.....');
        await axios({
            method : 'post',
            url : 'https://css-note-app.herokuapp.com/newNote',
            headers : {},
            data : {
                title : `${Title}`,
                content : `${Content}`,
                like : Like
            }
        })
        .then((ob)=>{
            setLoad('Saved');
            setInterval(()=>{
                setLoad('Save');
            }, 3000)
            setTitle('');
            setContent('');
            setLike(false);
            heart.current.style.display = "inline";
            heartFill.current.style.display = "none";
        })
        .catch((ob)=>{
            console.log(ob);
        })
    }

    if(prop.create){
        return(
            <div className="create px-5">
                <input type="text" className="my-2 py-2" placeholder="Title" 
                    onChange={(e)=>{setTitle(e.target.value)}}
                    value={Title}
                />
                <textarea name="note" cols="55" rows="7" className="" placeholder="Content"
                    onChange={(e)=>{setContent(e.target.value)}}
                    value={Content}
                ></textarea>
                <div className='noteFooter container-fluid row-10'>
                    <span className='message'>{Message}</span>
                    <button className="my-2 btn btn-outline-dark btn-bg col-7" onClick={sendNote}>{load}</button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className='bi bi-heart' viewBox="0 0 16 16" onClick={like} ref={heart} style={{display : `${nh}`}}>
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16" ref={heartFill} style={{display : `${h}`}} onClick={disLike}>
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </div>
            </div>
        );
    }
    return(
        <></>
    );
}

export default Create;