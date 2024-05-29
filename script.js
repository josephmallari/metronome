document.addEventListener("DOMContentLoaded", () => {
  const bpmInput = document.getElementById("bpm");
  const bpmSlider = document.getElementById("bpm-slider");
  const startStopButton = document.getElementById("start-stop");
  const tickSound = document.getElementById("tick-sound");

  let intervalId = null;
  let isRunning = false;

  function startMetronome() {
    if (isRunning) return;
    isRunning = true;
    startStopButton.textContent = "Stop";
    const bpm = parseInt(bpmInput.value, 10);
    const interval = 60000 / bpm; // Convert BPM to milliseconds

    intervalId = setInterval(() => {
      tickSound.currentTime = 0;
      tickSound.play();
    }, interval);
  }

  function stopMetronome() {
    if (!isRunning) return;
    isRunning = false;
    startStopButton.textContent = "Start";
    clearInterval(intervalId);
  }

  function updateBPM() {
    if (isRunning) {
      stopMetronome();
      startMetronome();
    }
  }

  bpmInput.addEventListener("input", () => {
    bpmSlider.value = bpmInput.value;
    updateBPM();
  });

  bpmSlider.addEventListener("input", () => {
    bpmInput.value = bpmSlider.value;
    updateBPM();
  });

  startStopButton.addEventListener("click", () => {
    if (isRunning) {
      stopMetronome();
    } else {
      startMetronome();
    }
  });
});
