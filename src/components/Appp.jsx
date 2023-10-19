import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Footer from "./Footer";

import AudioRecorderPro from "./AudioRecorderPro";
import UploadAudio from "./UploadAudio";


function Appp() {

  const [flag,setFlag] = useState();

  

 useEffect(() => {
    navigator.permissions.query({ name: "microphone" }).then((query) => {
      console.log(query.state);
      query.onchange = (ev) => {
        console.log(ev.target.state);
      };
    });
  }, []);

  return (
    <>
      <Heading />
      <button className= "mainButton"onClick={()=>{setFlag(1)}}>upload file</button>
      <button className= "mainButton"onClick={()=>{setFlag(0)}}>mic</button>
      <div>
      {flag===1 &&<UploadAudio/>}
      {flag===0 &&<AudioRecorderPro/>}
      </div>
       {/* <div className="micContainer">
        <AudioRecorderPro/>
      </div>  */}
      <Footer />
    </>
  );
}

export default Appp;
