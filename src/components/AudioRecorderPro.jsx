import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
function AudioRecorderPro() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  const [base64String2, setBaseInto64String] = useState(null);

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

  const convertAudioToBase64 = () => {
    if (recordedAudioBlob) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        setBaseInto64String(base64String);
       // console.log("Base64 encoded audio:", base64String);
      };
      reader.readAsDataURL(recordedAudioBlob);
      console.log("saved");
    }
  };

  const playRecordedAudio = () => {
    if (recordedAudioUrl) {
      const audio = new Audio(recordedAudioUrl);
      audio.play();
    }
  };
  const uploadAudio = () => {
    console.log("clicked");
   // e.preventDefault();
    const userData = (base64String2);
   // const sendingAudio = new Audio(URL.createObjectURL(audioFile));
    console.log(userData);
   // sendingAudio.play();
    axios.post("https://reqres.in/api/users", userData).then((response) => {
      console.log(response.status, response.data.token);
    });
  };


  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {recordedAudioUrl && (
        <div>
          <button className= "uploadButtons"  onClick={playRecordedAudio} >Play</button>
          <button className= "uploadButtons"  onClick={convertAudioToBase64}>save</button>
          <button className= "uploadButtons"  onClick={uploadAudio}>uplaod</button>
          <audio controls src={recordedAudioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default AudioRecorderPro;
