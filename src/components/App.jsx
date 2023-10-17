import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Footer from "./Footer";


function App() {
  const[audioSound,setAudio] = useState();

 
function updatedAudio(event){
  const audioFile =event.target.files[0];
  setAudio(URL.createObjectURL(audioFile));
  // setAudio(audioSound)
}


function playAudio(){
  if (audioSound) {
    const audio = new Audio(audioSound);
    audio.play();
  }
}
// function updatedChange(){
//   var audio = new Audio({audioSound});
// audio.play();
// }
  useEffect(() => {
    navigator.permissions.query({name:"microphone"}).then(query => {
      console.log(query.state);
      query.onchange = (ev) => {console.log(ev.target.state)}
    })
  },[])


  return (
     <><Heading/>
    
    <div className="container">
      <h1>Provide a Audio file</h1>
      
        <input
          onChange={updatedAudio}
          type="file"
          value={audioSound}
          accept="audio/*"

          />
        
        <button  onCLicked ={playAudio} type="submit" >Submit</button>
      
    </div>
  <Footer/>
    </>
  );
}

export default App;
