const textEl = document.querySelector(".timer-text");
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

// From URL ?t=[minutes] or 5 minutes by default
const duration =
  new URLSearchParams(window.location.search).get("t") * 60000 || 300000;
const endTime = Date.now() + duration;

function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t + 2) + b;
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
  const ICON_SIZE = 64; // Arbitrary constant

  // Modify the cloned ring to look better at small size
  miniRingEl.setAttribute("height", ICON_SIZE);
  miniRingEl.setAttribute("width", ICON_SIZE);
  miniRingCircleEl.style.strokeWidth = "33%";
  miniRingBackgroundEl.style.strokeWidth = "33%";

  const circumference = ICON_SIZE * Math.PI;

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
  const timeRemaining = endTime - Date.now();
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
window.addEventListener("dblclick", () => {
  document.body.requestFullscreen();
});

// Force the loop even when the tab is inactive
setInterval(animate, 1000);

// Main loop
animationLoop();
