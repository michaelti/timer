const textEl = document.querySelector(".timer-text");
const editFormEl = document.querySelector(".timer-edit-form");
const editEl = document.querySelector(".timer-edit");
const ringEl = document.querySelector(".timer-ring");
const ringElCircle = document.querySelector(".timer-ring__circle");
const ringElBackground = document.querySelector(".timer-ring__background");

// From URL dark=true
const darkMode =
  new URLSearchParams(window.location.search).get("theme") === "dark";

if (darkMode) {
  ringEl.classList.add("dark");
  ringElBackground.classList.add("dark");
  document.body.classList.add("dark");
}

// Initial values to be used by the clock
let duration = 0;
let startTime = 0;
let endTime = 0;

// Keep track of when the timer is paused
let isPaused = false;
let timePausedAt = null;
let totalTimePaused = 0;

function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t + 2) + b;
}

function setInitialValues() {
  const urlParam = new URLSearchParams(window.location.search).get("t");
  const durationFromURL = urlParam * 60000; // minutes to milliseconds
  const durationFromStorage = Number(localStorage.getItem("custom-duration"));
  const durationDefault = 300000; // 5 minutes

  duration = durationFromURL || durationFromStorage || durationDefault;
  duration = Math.min(duration, 5999000); // max 99m59s
  startTime = Date.now();
  endTime = startTime + duration;

  isPaused = false;
  timePausedAt = null;
  totalTimePaused = 0;
}

function setText(timeRemaining) {
  const secondsRemaining = Math.ceil(timeRemaining / 1000);

  const clockMinutes = Math.floor(secondsRemaining / 60);
  const clockSeconds = secondsRemaining % 60;

  const strMinutes = String(clockMinutes).padStart(1, "0");
  const strSeconds = String(clockSeconds).padStart(2, "0");

  const strClock = strMinutes + ":" + strSeconds;

  // Optimization: if time hasn't changed, don't update
  if (textEl.innerText === strClock) {
    return;
  }

  textEl.innerText = strClock;
  editEl.placeholder = strClock;
  document.title = `Break | ${strClock}`;
}

function setRing(progress) {
  const circumference = ringElCircle.getBBox().width * Math.PI;

  ringElCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  ringElCircle.style.strokeDashoffset =
    circumference - progress * circumference;

  ringElBackground.style.strokeDasharray = `${circumference} ${circumference}`;
  ringElBackground.style.strokeDashoffset =
    circumference * 2 - progress * circumference;
}

function setFavicon(progress) {
  const miniRingEl = ringEl.cloneNode(true);
  const miniRingCircleEl = miniRingEl.querySelector(".timer-ring__circle");
  const miniRingBackgroundEl = miniRingEl.querySelector(
    ".timer-ring__background"
  );

  // Modify the cloned ring to look better at small size
  miniRingCircleEl.style.strokeWidth = "33%";
  miniRingBackgroundEl.style.strokeWidth = "33%";

  const circumference = miniRingEl.getAttribute("width") * Math.PI;

  miniRingCircleEl.style.strokeDasharray = `${circumference} ${circumference}`;
  miniRingCircleEl.style.strokeDashoffset =
    circumference - progress * circumference;

  miniRingBackgroundEl.style.strokeDasharray = `${circumference} ${circumference}`;
  miniRingBackgroundEl.style.strokeDashoffset =
    circumference * 2 - progress * circumference;

  const SVG = new XMLSerializer().serializeToString(miniRingEl);
  const dataURL = "data:image/svg+xml;base64," + btoa(SVG);
  const favicon = document.querySelector("link[rel=icon]");
  favicon.setAttribute("href", dataURL);
}

function animate() {
  if (isPaused) return;

  const timeRemaining = endTime - Date.now() + totalTimePaused;
  const timeElapsed = duration - timeRemaining;

  // End animation when the time is over
  if (timeRemaining <= 0) {
    setText(0);
    setRing(1);
    setFavicon(1);
    return;
  }

  // Intro animation for one second
  if (timeElapsed <= 1000) {
    setText(timeRemaining);
    setRing(easeInOutCubic(timeElapsed, 1, 1 + timeElapsed / duration, 1000));
    setFavicon(0);
  }

  // Usual animation
  if (timeElapsed > 1000) {
    setText(timeRemaining);
    setRing(timeElapsed / duration);
    setFavicon(timeElapsed / duration);
  }
}

function animationLoop() {
  animate();
  requestAnimationFrame(animationLoop);
}

// Fullscreen mode
window.addEventListener("dblclick", (event) => {
  if (event.target === editEl) return;
  document.body.requestFullscreen();
});

// Set the intial clock values
setInitialValues();

// Force the loop even when the tab is inactive
setInterval(animate, 1000);

// Main loop
animationLoop();

/*
 *
 * Edit Functionality
 *
 */

// "State" of input
let inputValue = "";

function checkValidInput(value) {
  const regex = /^[0-9:]*$/;
  return regex.test(value);
}

function updateTime(value) {
  // If there's no input, exit
  if (!value) {
    return;
  }

  // If the input contains anything but numbers and colons, exit
  if (!checkValidInput(value)) {
    return;
  }

  // If the input is a simple number, just convert it to minutes
  if (!isNaN(value)) {
    const timeInMs = value * 60000;
    localStorage.setItem("custom-duration", timeInMs);
    setInitialValues();
    return;
  }

  // Parse the string to digits
  const digits = value.split(":");

  // If there aren't at least two digits, exit
  if (digits.length < 2) {
    return;
  }

  const minutesInMs = digits[0] * 60000;
  const secondsInMs = digits[1] * 1000;
  const timeInMs = minutesInMs + secondsInMs;
  localStorage.setItem("custom-duration", timeInMs);
  setInitialValues();
}

editEl.addEventListener("input", (event) => {
  // If invalid characters, exit
  if (!checkValidInput(event.target.value)) {
    event.target.value = inputValue;
    return;
  }

  // If more than one colon, exit
  if ((event.target.value.match(/:/g) || []).length > 1) {
    event.target.value = inputValue;
    return;
  }

  // If more than two digits beside colon, exit
  if (event.target.value.includes(":")) {
    const split = event.target.value.split(":");
    const beforeColon = split[0];
    const afterColon = split[1];

    if (beforeColon && beforeColon.length > 2) {
      event.target.value = inputValue;
      return;
    }

    if (afterColon && afterColon.length > 2) {
      event.target.value = inputValue;
      return;
    }
  }

  // If DELETING, skip helpers
  if (event.target.value.length < inputValue.length) {
    console.log("del");
    inputValue = event.target.value;
    return;
  }

  // If colon entered first, add a 0 before it
  if (event.target.value.length === 1 && event.target.value === ":") {
    event.target.value = "0:";
  }

  // If first two digits entered, add a colon
  if (event.target.value.length >= 2 && !event.target.value.includes(":")) {
    let modifiedString = event.target.value.split("");
    modifiedString.splice(2, 0, ":");
    modifiedString = modifiedString.join("");
    event.target.value = modifiedString;
  }

  inputValue = event.target.value;
});

editEl.addEventListener("focus", () => {
  isPaused = true;
  timePausedAt = Date.now();
});

editEl.addEventListener("blur", (event) => {
  isPaused = false;
  totalTimePaused += Date.now() - timePausedAt;

  // Update the clock
  updateTime(event.target.value);

  // Reset the form
  event.target.value = "";
});

editFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  editEl.blur();
});
