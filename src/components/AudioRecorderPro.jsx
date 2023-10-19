import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
function AudioRecorderPro() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  const [responseData,setresponseData] = useState();
  //const [base64String2, setBaseInto64String] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.current.push(e.data);
          }
        };

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
          setRecordedAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordedAudioUrl(audioUrl);
        };

        mediaRecorder.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error starting recording:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const uploadAudio =  () => {
    if (recordedAudioBlob) {
      const reader = new FileReader();
     let myAudio;
      reader.onload =  () => {
        myAudio = reader.result.split(",")[1];
        console.log(myAudio);
        // const myFinal = myAudio.slice(24);
        // console.log(myFinal);
      axios.post("http://127.0.0.1:8000/upload",{base64_data: myAudio}, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }}).then((response) => {
      console.log(response.status, response.data.base64_data);
      setresponseData(response.data.base64_data)
    });
       // console.log("Base64 encoded audio:", base64String);
      };
      
      reader.readAsDataURL(recordedAudioBlob);
      console.log("saved");
      return myAudio;
    }
  };
  const decodeBase64ToAudio = () => {
    if (responseData) {
      const byteCharacters = atob(responseData);
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
  

  const playRecordedAudio = () => {
    if (recordedAudioUrl) {
      const audio = new Audio(recordedAudioUrl);
      audio.play();
    }
  };
 


  return (
  <div className="upload">
    <div className="micButton">
      {isRecording ? (
        <button onClick={stopRecording}><img src="./stop-mic.png" height={30} alt="stop recording"/></button>
      ) : (
        <button onClick={startRecording}><img src="./mic.png" height={30} alt="start recording"/></button>
      )}
    </div>

      {recordedAudioUrl && (
        <div  className="uploadButtons">
        <div>
          <button   onClick={playRecordedAudio}  >play</button>
       {/* <button className= "uploadButtons"  onClick={convertAudioToBase64}>save</button> */}
          <button  onClick={uploadAudio}>upload</button>
          </div>
          <div className="player">
          <audio controls src={recordedAudioUrl}></audio>
          <div>
          <button className="fileUpload" onClick={decodeBase64ToAudio} type="button">
           Response
        </button>
        </div>
        </div>
        </div>
      )}
  </div>
  );
}

export default AudioRecorderPro;
