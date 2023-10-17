import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Footer from "./Footer";

function Appp() {
  // State to store the selected audio file
  const [audioFile, setAudioFile] = useState(null);

  // Function to handle audio file selection
  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(URL.createObjectURL(file)); // Store the audio file URL
  };

  // Function to play the selected audio
  const playAudio = () => {
    if (audioFile) {
      const audio = new Audio(audioFile);
      audio.play();
    }
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
        <button onClick={playAudio} type="button">
          Play
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Appp;
