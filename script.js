const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timer = document.getElementById("minutes");
const time = document.getElementById("time");
const saraLuna = new Audio("sara-luna.mp3");


let interval, timeLeft = 5;


const updateTimer = () => {
  let minutes = Math.floor(timeLeft/60);
  let seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

  time.innerHTML = formattedTime;
};

const startTimer = () => {
  interval = setInterval(()=>{
    timeLeft--;
    updateTimer();
    if(timeLeft === 0){
      clearInterval(interval);
      saraLuna.play();
      timeLeft = 1500;
      updateTimer();
    }
  },1000);

};

const stopTimer = () => {
  clearInterval(interval);
};

const resetTimer = () => {
  clearInterval(interval);
  timeLeft = 1500;  
  updateTimer();

};

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);