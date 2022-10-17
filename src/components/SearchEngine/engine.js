import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import './engine.css';
import Result from '../Result/result';


const Engine = (prop)=>{

    const [searchText, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [edit, setEdit] = useState(
        {
            edit : "none",
            title : undefined,
            content : undefined,
            liked : undefined
        }
    );
    const deleteSearch = useRef();
    const resSpan = useRef();

    const DeleteSearch = ()=>{
        setSearch('');
    }

    useEffect(()=>{
        if(searchText.length > 0){
            axios.get(`/searchNote?q=${searchText}`)
            .then((ob)=>{
                console.log(ob.data);
                setResult(ob.data.d);
            })
            .catch((ob)=>{
                console.log(ob);
            })
        }
    },[searchText])

    // const Edit = (id)=>{
    //     const note = result.filter((res)=>{
    //         if(res._id === id) return res;
    //     })
    //     console.log(note);
    //     setTitle(note[0].title);
    //     setContent(note[0].content);
    //     setLiked(note[0].like);
    //     // setEdit(true);
    // }

    if(prop.search){
        return(
            <div className='output'>
                <div className="engine container-fluid p-3">
                    <input type="text"  className="p-1" placeholder="Search your notes"
                        onChange={(e)=>{
                            setSearch(e.target.value);
                        }}
                        value={searchText}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16" ref={deleteSearch} onClick={DeleteSearch}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                </div>
                <div className="Result" >
                            {
                                result.map((res)=>(
                                    <div>
                                        <Result res={res}/>
                                    </div>
                                ))
                            }
                </div>
            </div>
        );
    }
}

export default Engine;

// share={{title : res.title, content : res.content, liked : res.like}}