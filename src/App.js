import { useState,useEffect, useRef } from 'react';
import './App.css';
import './components/Home/home.css';
import axios from 'axios';
import Home2 from './components/Home/home2';
import Create from './components/Create/create';
import Login from './components/Login/login';
import Register from './components/Register/register';
import Engine from './components/SearchEngine/engine';
import MNav from './components/MobleNav/mNav';
import BigNav from './components/BigNav/BigNav';

function App() {

  const [show, setShow] = useState({
    home : true,
    create : false,
    search : false,
    login : false,
    register : false
  });
  

  const [caption, setCaption] = useState('Your personal note app !!!');

  const checkSession = async (w, s)=>{
    let rt = false;
    await axios({
      method : "post",
      url : "/",
      headers : {},
      data : {}
    })
    .then((ob)=>{
      if(ob.data.message){
        setShow(w);
        setCaption(s);
        rt = true;
      }else{
        setShow({
          home : false,
          create : false,
          search : false,
          login : true,
          register : false
        });
        setCaption('Tell us Who you are ???')
        captionDiv.current.style.display = "block";
        rt = false;
      }
    })

    return rt;
  }

  const RenderHome = (CountSet, count)=>{
    setCaption('Your personal notes app !!')
    setShow(
      {
        home : true,
        create : false,
        search : false,
        login : false,
        register : false
      }
    )
    // CountSet(count+1);
    captionDiv.current.style.display = "block";
  }
  const RenderCreate = async (CountSet, count)=>{
    await checkSession(
      {
        home : false,
        create : true,
        search : false,
        login : false,
        register : false
      },
      'Make your note here !!!'
    );
    // CountSet(count+1);
    captionDiv.current.style.display = "block";
  }

  const captionDiv = useRef();
  const RenderSearch = async (CountSet, count)=>{
    await checkSession(
      {
        home : false,
        create : false,
        search : true,
        login : false,
        register : false
      },
      ''
    );
    // CountSet(count+1);
    captionDiv.current.style.display = "none";
  }
  
  const RenderLogin = async (CountSet, count)=>{
    await checkSession(
      {
        home : false,
        create : false,
        search : false,
        login : true,
        register : false
      },
      'Tell us Who you are ???'
    );
    // CountSet(count+1);
    captionDiv.current.style.display = "block";
  }

  const RenderReg = (CountSet, count)=>{
    setCaption("Lets get started here !!!")
    setShow(
      {
        home : false,
        create : false,
        search : false,
        login : false,
        register : true
      }
    )
    // CountSet(count+1);
    captionDiv.current.style.display = "block";
  }

  const [l, setLogin] = useState('Login');
  const displayUser = (name)=>{
    setLogin(`${name}`);
  }

  const showSet = (update)=>{
    setShow(update);
  }

  const [Mnav, setMnav] = useState(false);

  useEffect(()=>{
    if(window.innerWidth < 500){
      setMnav(true);
    }
  })

  return(
    <>
        <div className="bg" ></div>
        <nav className='row'>
            <div className="logo col">
                <a className="navlink" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-journal-richtext" viewBox="0 0 16 16" style={{color : "white"}}>
                    <path d="M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                  </svg>
                </a>
            </div>
            <div className="options col">
                <MNav mnav={Mnav} RenderHome={RenderHome} RenderCreate={RenderCreate} RenderSearch={RenderSearch} RenderLogin={RenderLogin} l={l}/>
                <BigNav bigNav={!Mnav} RenderHome={RenderHome} RenderCreate={RenderCreate} RenderSearch={RenderSearch} RenderLogin={RenderLogin} l={l}/>
            </div>
        </nav>
        <div className="home container-fluid p-5 m-0">
              <h2 className="mx-2 my-1 fw-bold fs-2" ref={captionDiv} style={{color : "white"}}>{caption}</h2>
              <div className="container-fluid">
                <Home2 home={show.home} />
                <Create create={show.create}/>
                <Login login={show.login} regAlert={RenderReg} SetUser={displayUser} ShowSet={showSet}/>
                <Register Reg={show.register} SetUser={displayUser} ShowSet={showSet}/>
                <Engine search={show.search}/>
              </div>
          </div>
      </>
  );

  
}

export default App;
