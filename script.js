const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timer = document.getElementById("minutes");
const time = document.getElementById("time");
const saraLuna = new Audio("sara-luna.mp3");
const workMode = document.getElementById("work");
const breakMode = document.getElementById("break");

const toggleClassWork = () => {
  workMode.classList.toggle("active");
};

const toggleClassBreak = () => {
  breakMode.classList.toggle("active");
};

workMode.addEventListener("click", toggleClassWork);
breakMode.addEventListener("click", toggleClassBreak);

// global variables
let interval,
    timeLeft = 5,
    breakTime = 5;

// main timer functions
const updateTimer = () => {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  time.innerHTML = formattedTime;
};

const startTimer = () => {
  workMode.classList.add("active");
  breakMode.classList.remove("active");
  interval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      toggleClassWork(false);
      clearInterval(interval);
      saraLuna.play();
      timeLeft = 1500;
      updateTimer();
      startBreak();
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(interval);
};

const resetTimer = () => {
  clearInterval(interval);
  timeLeft = 1500;
  updateTimer();
};

// break timer
const startBreak = () => {
  interval = setInterval(() => {
    breakMode.classList.add("active");
    workMode.classList.remove("active");

    let minutes = Math.floor(breakTime / 60);
    let seconds = breakTime % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    time.innerHTML = formattedTime;

    breakTime--;

    if(breakTime === 0){
      toggleClassBreak()
      clearInterval(interval);
      updateTimer();
    }

  }, 1000);
};

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
