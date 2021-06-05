const textEl = document.querySelector(".timer-text");
const ringEl = document.querySelector(".timer-ring__circle");
// From URL ?t=[minutes] or 5 minutes by default
const duration = new URLSearchParams(window.location.search).get("t") * 60 || 300;

function clockTimer(timeRemaining) {
    if (timeRemaining < 0) return;

    setText(timeRemaining);
    setRing(1 - timeRemaining / duration);

    setTimeout(() => clockTimer(timeRemaining - 1), 1000);
}

function setText(timeRemaining) {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const strMinutes = String(minutes).padStart(1, "0");
    const strSeconds = String(seconds).padStart(2, "0");
    const clock = strMinutes + ":" + strSeconds;

    textEl.innerText = clock;
}

function setRing(progress) {
    const circumference = ringEl.getBBox().width * Math.PI;

    ringEl.style.strokeDasharray = `${circumference} ${circumference}`;
    ringEl.style.strokeDashoffset = circumference - progress * circumference;
}

clockTimer(duration);
