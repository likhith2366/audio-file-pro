import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Footer from "./Footer";
import axios from "axios";
import AudioRecorderPro from "./AudioRecorderPro";


function Apppp() {
  // State to store the selected audio file and its base64 string
  const [audioFile, setAudioFile] = useState(null);
  const [base64String, setBase64String] = useState(null);

  // Function to handle audio file selection
  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file); // Store the audio file object
  };

  // Function to play the selected audio
  const playAudio = () => {
    console.log("play");
    if (audioFile) {
      const audio = new Audio(URL.createObjectURL(audioFile));
      audio.play();
    }
  };

  // Function to convert the audio file to base64
  const convertToBase64 = () => {
    console.log("converted");
    if (audioFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        setBase64String(result);
      //  console.log("Base64 encoded audio:", result);
      };
      reader.readAsDataURL(audioFile);
    }
  };

   // Function to upload the audio file to the API
  // Function to upload the base64-encoded audio to the API
  const sendAudio = () => {
    console.log("clicked");
   // e.preventDefault();
    const userData = (base64String);
   // const sendingAudio = new Audio(URL.createObjectURL(audioFile));
    console.log(userData);
   // sendingAudio.play();
    axios.post("http://127.0.0.1:8000/upload", userData).then((response) => {
      console.log(response.status, response.data.token);
    });
  };




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
      <div className="container">
        <h1>Provide an Audio file</h1>
        <input
          type="file"
          onChange={handleAudioChange}
          accept="audio/*" // Specify accepted file types
        />
        <button className= "uploadButtons" onClick={playAudio} type="button">
          Play
        </button>
        <button className= "uploadButtons"  onClick={convertToBase64} type="button">
          Convert to Base64
        </button>
        
        <button className= "uploadButtons" onClick={sendAudio} type="button">
          upload
        </button>
    
        {base64String && (
          <div>
            <h3>Base64 Encoded Audio:</h3>
            <p>{base64String}</p>
          </div>
        )}
      </div>
      <div className="micContainer">
        <AudioRecorderPro/>
      </div>
      <Footer />
    </>
  );
}

export default Apppp;
