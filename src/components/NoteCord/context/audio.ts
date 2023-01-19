const audio = new (window.AudioContext);
let analyser = audio.createAnalyser();
analyser.fftSize = 2048;

export const audioContext = {
  getContext() {
    return audio;
  },
  getAnalyser() {
    return analyser;
  },
  resetAnalyser() {
    analyser = audio.createAnalyser();
  },
  decodeAudioData(audioData: ArrayBuffer) {
    audio.decodeAudioData(audioData).then(function (decodedData) {
      
    })
  }
}