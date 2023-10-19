import React, { useState } from "react";
import axios from "axios";

function UploadAudio() {
  const [audioFile, setAudioFile] = useState(null);
  const [base64Data, setBase64Data] = useState("");
  //const [decodedAudioData, setDecodedAudioData] = useState(null);

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const playAudio = () => {
    if (audioFile) {
      const audio = new Audio(URL.createObjectURL(audioFile));
      audio.play();
    }
  };

  const convertToBase64 = () => {
    if (audioFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        const userData = result.split(",")[1];
        axios
          .post("http://127.0.0.1:8000/upload", { base64_data: userData }, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            console.log(response.status, response.data.base64_data);
            setBase64Data(response.data.base64_data);
          });
      };
      reader.readAsDataURL(audioFile);
    }
  };

  const decodeBase64ToAudio = () => {
    if (base64Data) {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const audioBlob = new Blob([byteArray], { type: "audio/wav" });
      //setDecodedAudioData(audioBlob);
      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
    }
  };



  return (
    <div className="container upload">
      <div className="title">
        <h1>Provide an Audio file</h1>
      </div>
      <div>
        <input
          type="file"
          onChange={handleAudioChange}
          accept="audio/*"
        />
        <button className="fileUpload" onClick={playAudio} type="button">
          Play
        </button>
        <button className="fileUpload" onClick={convertToBase64} type="button">
          Upload
        </button>
        <div>
        <button className="fileUpload" onClick={decodeBase64ToAudio} type="button">
           Response
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default UploadAudio;
