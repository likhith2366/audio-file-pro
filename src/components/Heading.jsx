import React from "react";

function Heading(){

    return (
      <div  >
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/#"><img src="./box-seam.svg" alt="moveit brand icon" height="30"/> Audio Jam</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/#">Listen</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/#">Explore</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/#">Listen</a></li>
                  <li><a class="dropdown-item" href="/#">Another action</a></li>
                  <li>
                    <hr class="dropdown-divider"/>
                  </li>
                  <li><a class="dropdown-item" href="/#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <div class="side-container">
  <div class="row">
    <div class="col-md-12 text-center">
      <h1 class="animate-charcter"> QUADRANT TECHNOLOGIES</h1>
    </div>
  </div>
  </div>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Phone" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Phone</button>
            </form>
          </div>
        </div>
      </nav>

  </div>


    )
      
    
}
export default Heading;