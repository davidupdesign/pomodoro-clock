const timer = document.querySelector("#timer");
const sessionType = document.querySelector("#session-type");

const startPauseButton = document.querySelector("#start-pause-button");
const stopButton = document.querySelector("#stop-button");
const resetButton = document.querySelector("#reset-button");

let isWorkSession = true;
let timeLeft = 1500;
let isTimerRunning = false;
let intervalId;

function startTimer() {
  intervalId = setInterval(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId);
      if (isWorkSession) {
        isWorkSession = false;
        timeLeft = 300;
        sessionType.textContent = "Break Session";
      } else {
        isWorkSession = true;
        timeLeft = 1500;
        sessionType.textContent = "Work Session";
      }
      updateDisplay();
      startTimer();
    } else {
      timeLeft -= 1;
      updateDisplay();
    }
  }, 1000);
}

function updateDisplay() {
  const timerMins = Math.floor(timeLeft / 60);
  const timerSecs = timeLeft % 60;

  timer.textContent =
    String(timerMins).padStart(2, "0") +
    ":" +
    String(timerSecs).padStart(2, "0");
}

startPauseButton.addEventListener("click", () => {
  if (isTimerRunning) {
    isTimerRunning = false;
    clearInterval(intervalId);
  } else {
    isTimerRunning = true;
    startTimer();
  }
});

stopButton.addEventListener("click", () => {
  if (isWorkSession) {
    clearInterval(intervalId);
    isTimerRunning = false;
    timeLeft = 1500;
  } else {
    clearInterval(intervalId);
    isTimerRunning = false;
    timeLeft = 300;
  }
  updateDisplay();
});

resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  isWorkSession = true;
  isTimerRunning = false;
  timeLeft = 1500;
  sessionType.textContent = "Work Session";
  updateDisplay();
});
