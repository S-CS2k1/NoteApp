const Dropdown = (prop)=>{
    return(
        <div className="dropdown" ref={prop.refer}>
            <a onClick={prop.RenderHome}>Home</a>
            <a onClick={prop.RenderCreate}>Create</a>
            <a onClick={prop.RenderSearch}>Search</a>
            <a onClick={prop.RenderLogin}>{prop.l}</a>
        </div>
    );
}

export default Dropdown;