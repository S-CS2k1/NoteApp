import Img from './Notes.gif';

const Home2 = (prop)=>{
    if(prop.home){
        return(
            <div className="img col text-center">
                <img src={Img} alt="" />
            </div>
        );
    }
    return(
        <></>
    );
}

export default Home2;