let audioContext;
let source;
let intervalId;
let tempo = 120;
let clickBuffer;
let isPlaying = false;

// path to sample
const soundFilePath = "tick.wav";

document.getElementById("tempo-slider").addEventListener("input", (event) => {
  tempo = event.target.value;
  document.getElementById("tempo-value").textContent = tempo;
  if (intervalId) {
    clearInterval(intervalId);
    startMetronome();
  }
});

document.getElementById("toggle-button").addEventListener("click", () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (isPlaying) {
    stopMetronome();
  } else {
    startMetronome();
  }
  isPlaying = !isPlaying;
  document.getElementById("toggle-button").textContent = isPlaying ? "Stop" : "Start";
});

window.addEventListener("load", () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  fetch(soundFilePath)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((buffer) => {
      clickBuffer = buffer;
    })
    .catch((error) => console.error("Error with fetching or decoding audio data:", error));
});

function startMetronome() {
  const interval = (60 / tempo) * 1000;
  intervalId = setInterval(() => {
    if (source) {
      source.stop();
    }
    source = audioContext.createBufferSource();
    source.buffer = clickBuffer;
    source.connect(audioContext.destination);
    source.start();
  }, interval);
}

function stopMetronome() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (source) {
    source.stop();
    source = null;
  }
}
