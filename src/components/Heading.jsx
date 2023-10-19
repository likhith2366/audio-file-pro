import React from "react";

function Heading(){

    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor :"black"}}>
        {/* <nav className="headingNavBar"> */}
        <div className="container-fluid">
          <a className="navbar-brand" href="/#"><img src="./box-seam.svg" alt="moveit brand icon" height="30"/> Audio Jam</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/#">Listen</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">Explore</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/#">Listen</a></li>
                  <li><a className="dropdown-item" href="/#">Another action</a></li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li><a className="dropdown-item" href="/#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <div className="side-container">
  <div className="row">
    <div className="col-md-12 text-center">
      <h1 className="animate-charcter"> QUADRANT TECHNOLOGIES</h1>
    </div>
  </div>
  </div>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Phone" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Phone</button>
            </form>
          </div>
        </div>
      </nav>

  </div>


    )
      
    
}
export default Heading;