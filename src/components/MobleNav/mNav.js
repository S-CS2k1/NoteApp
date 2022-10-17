import { useRef, useState } from 'react';
import './mNav.css';
import Dropdown from '../DropDown/dropdown';

const MNav = (prop)=>{

    const dd = useRef();
    const sv = useRef();
    const [count, setCount] = useState(0);

    const dropIt = ()=>{
        setCount(count+1);
        if(count%2 === 0){
            dd.current.style.transform = "translateY(45vh)";
            sv.current.style.color = "black";
        }else{
            dd.current.style.transform = "translateY(-100vh)";
            sv.current.style.color = "white";
        }
    }

    if(prop.mnav){
        return(
            <>
                <Dropdown refer={dd} RenderHome={prop.RenderHome} RenderCreate={prop.RenderCreate} RenderSearch={prop.RenderSearch} RenderLogin={prop.RenderLogin} l={prop.l}/>
                {/* <ul className='dropdown'>
                    <li>Home</li>
                    <li>Create</li>
                    <li>Search</li>
                    <li>{prop.l}</li>
                </ul> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16" className='hamberger' onClick={dropIt} ref={sv}>
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </>
        );
    }
    return(
        <></>
    );
}

export default MNav;