const timer = document.querySelector("#timer");
const sessionType = document.querySelector("#session-type");

const startPauseButton = document.querySelector("#start-pause-button");
const stopButton = document.querySelector("#stop-button");
const resetButton = document.querySelector("#reset-button");

const sound = new Audio(
  "/src/magical-notification-tone-soft-fantasy-digital-alert-438278.mp3"
);
const tenSecSound = new Audio("/src/notification-alert-6-331724.mp3");

const workSessionInput = document.querySelector("#work-session");
const breakSessionInput = document.querySelector("#break-session");

let isWorkSession = true;
let timeLeft = workSessionInput.value * 60;
let isTimerRunning = false;
let intervalId;

let workSessionsCompleted = 0;

function startTimer() {
  intervalId = setInterval(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId);
      sound.play();
      if (isWorkSession) {
        workSessionsCompleted += 1;
        isWorkSession = false;
        if (workSessionsCompleted % 4 === 0) {
          timeLeft = 600;
          sessionType.textContent = "Long Break";
        } else {
          timeLeft = breakSessionInput.value * 60;
          sessionType.textContent = "Break Session";
        }
      } else {
        isWorkSession = true;
        timeLeft = workSessionInput.value * 60;
        sessionType.textContent = "Work Session";
      }

      updateDisplay();
      startTimer();
    } else {
      timeLeft -= 1;
      if (timeLeft === 10) {
        tenSecSound.play();
      }
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
    timeLeft = workSessionInput.value * 60;
  } else {
    clearInterval(intervalId);
    isTimerRunning = false;
    timeLeft = breakSessionInput.value * 60;
  }
  updateDisplay();
});

resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  isWorkSession = true;
  isTimerRunning = false;
  timeLeft = 1500;
  sessionType.textContent = "Work Session";
  workSessionInput.value = 25;
  breakSessionInput.value = 5;
  updateDisplay();
});

// for inpiuts

workSessionInput.addEventListener("input", () => {
  if (isWorkSession && !isTimerRunning) {
    timeLeft = workSessionInput.value * 60;
    updateDisplay();
  }
});

breakSessionInput.addEventListener("input", () => {
  if (!isWorkSession && !isTimerRunning) {
    timeLeft = breakSessionInput.value * 60;
    updateDisplay();
  }
});
