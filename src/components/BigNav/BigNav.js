import {useState} from 'react';
import './BigNav.css';

const BigNav = (prop)=>{

    if(prop.bigNav){
        return(
            <>
                <div className="bNav">
                    <a className="nav-link mx-5 fw-normal fs-6" onClick={prop.RenderHome}>Home</a>
                    <a className="nav-link mx-5 fw-normal fs-6" onClick={prop.RenderCreate}>Create</a>
                    <a className="nav-link mx-5 fw-normal fs-6" onClick={prop.RenderSearch}>Search</a>
                    <a className="nav-link mx-5 fw-normal fs-6" onClick={prop.RenderLogin}>{prop.l}</a>
                </div>
            </>
        );
    }
}

export default BigNav;