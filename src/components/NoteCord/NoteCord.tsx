import NavBar from '../Navbar/navbar'
import { useEffect, useState } from "react";
import { audioContext } from "./context/audio";
import autoCorrelate from "./libs/correlate";
import {
  noteFromPitch,
  centsOffFromPitch,
  getDetunePercent,
} from "./libs/helpers";
import { Button, Typography } from '@mui/material';

const audioCtx = audioContext.getContext();
const analyserNode = audioContext.getAnalyser();
const buflen = 2048;
var buf = new Float32Array(buflen);

const noteStrings = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];



const NoteCord = () => {
  const [source, setSource] = useState<any>(null);
  const [started, setStart] = useState(false);
  const [pitchNote, setPitchNote] = useState("C");
  const [pitchScale, setPitchScale] = useState("4");
  const [pitch, setPitch] = useState("0 Hz");
  const [detune, setDetune] = useState(0);

  const updatePitch = (time: any) => {
    if(started){
      analyserNode.getFloatTimeDomainData(buf);
      var ac = autoCorrelate(buf, audioCtx.sampleRate);
      if (ac > -1) {
        let note = noteFromPitch(ac);
        let sym = noteStrings[note % 12];
        let scl = Math.floor(note / 12) - 1;
      let dtune = centsOffFromPitch(ac, note);
      setPitch(parseFloat(ac.toString()).toFixed(0) + " Hz");
      setPitchNote(sym);
      setPitchScale(scl.toString());
      setDetune(dtune);
      }
    }
  };

  useEffect(() => {
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source]);
  
  var interval = setInterval(updatePitch, 1);

  const start = async () => {
    const input = await getMicInput();
    setStart(true);
    setInterval(updatePitch, 1);
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
    setSource(audioCtx.createMediaStreamSource(input));
  };

  const stop = () => {
    clearInterval(interval);
    setStart(false);
    source.disconnect(analyserNode);
  };

  const getMicInput = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    });
  };

  return (
    <>
      <NavBar/>
      <div className='display-flex' style={{ fontSize: '30px' }}>
        Stroik do skrzypiec
      </div>
      <div className='display-flex' style={{ justifyContent: 'space-between' }}>
        <div className='pitch-display'>
          <div className='pitchnote'style={{
            color: 
              `${(pitchScale === '3') ? (
                (pitchNote === 'G') ? 'Green' : (((pitchNote === 'F#') || (pitchNote === 'G#')) ? 'Orange' : 'black')
              ) : 'black'}`}}>
            G
          </div>
          <span className="pitchscale" >
            3
          </span>
        </div>
        <div className="pitch-display">  
          <div className='note'style={{
            color: 
            `${(pitchScale === '4') ? (
              (pitchNote === 'D') ? 'Green' : (((pitchNote === 'C#') || (pitchNote === 'D#')) ? 'Orange' : 'black')
              ) : 'black'}`}}>
            D
          </div>
          <span className="pitchscale" >
            4
          </span>
        </div>
        <div className="pitch-display">
          <div className='note'style={{
            color: 
            `${(pitchScale === '4') ? (
              (pitchNote === 'A') ? 'Green' : (((pitchNote === 'A#') || (pitchNote === 'G#')) ? 'Orange' : 'black')
              ) : 'black'}`}}>
            A
          </div>
          <span className="pitchscale" >
            4
          </span>
        </div>
        <div className="pitch-display">
          <div className='note' style={{
            color: 
              `${(pitchScale === '5') ? (
                (pitchNote === 'E') ? 'Green' : (((pitchNote === 'F') || (pitchNote === 'D#')) ? 'Orange' : 'black')
              ) : 'black'}`}}>
            E
          </div>
          <span className="pitchscale" >
            5
          </span>
        </div>
      </div>
      <div className="tuner-container">
      <div className='notification'>
        Please, bring your instrument near to the microphone!
      </div>
      <div className="show-notes">
        <div
          className={
            started
              ? "show-notes-display"
              : "show-notes-display-not"
          }
        >
          <div className="pitch-display">
            <span
              className={
                started
                  ? "pitchnote"
                  : "pitchnote-not"
              }
            >
              {pitchNote}
            </span>
            <span className="pitchscale">
              {pitchScale}
            </span>
          </div>
          <div className="detune-container">
            <div
              className="detune-low"
              style={{
                width: (detune < 0 ? getDetunePercent(detune) : "50") + "%",
              }}
            ></div>
            <span className="pointer">I</span>
            <div
              className="detune-high"
              style={{
                width: (detune > 0 ? getDetunePercent(detune) : "50") + "%",
              }}
            ></div>
          </div>
          <div className="pitch">
            <span>{pitch}</span>
          </div>
        </div>
        {!started ? (
          <Button
            variant='contained'
            onClick={start}
          >
            Start
          </Button>
        ) : (
          <Button
            variant='contained'
            color="error"
            onClick={stop}
          >
            Stop
          </Button>
        )}
      </div>
    </div>
    </>
  )
}

export default NoteCord