const incrementButton = document.getElementById("increment");
const decrementButton = document.getElementById("decrement");

function increment() {
	var input = document.getElementById("duration");
	input.stepUp();
}
function decrement() {
	var input = document.getElementById("duration");
	input.stepDown();
}

incrementButton.addEventListener("click", increment);
decrementButton.addEventListener("click", decrement);

const saveSettingsButton = document.getElementById("save_settings");
var focusPeriodDuration;
var breakDuration;
var idealSession;

function updateIdealSession() {
	focusPeriodDuration = parseInt(document.getElementById("focus_period").value);
	breakDuration = parseInt(document.getElementById("break_duration").value);
	idealSession = focusPeriodDuration + breakDuration;
	console.log(`Ideal Session duration = ${idealSession}`);
	document.getElementById("duration").step = idealSession;
	document.getElementById("duration").min = idealSession;
	document.getElementById("duration").value = idealSession;
}

saveSettingsButton.addEventListener("click", updateIdealSession);
updateIdealSession();

const desiredDurationInput = document.getElementById("duration");
const breaksInfo = document.getElementById("breaks_info");

function updateInfo() {
	var userSession = parseInt(desiredDurationInput.value);
	console.log(`${userSession}`);
	const numberOfSessions = userSession / idealSession;
	if (numberOfSessions == 1) {
		breaksInfo.textContent = `You'll have ${numberOfSessions} break`;
	} else {
		breaksInfo.textContent = `You'll have ${numberOfSessions} breaks`;
	}
}
desiredDurationInput.addEventListener("input", updateInfo);
incrementButton.addEventListener("click", updateInfo);
decrementButton.addEventListener("click", updateInfo);
updateInfo();

const startButton = document.getElementById("start_session");
const pauseButton = document.getElementById("pauseContinue");
const stopButton = document.getElementById("terminateSession");
const timer = document.getElementById("timer");
const durationSetter = document.getElementById("set_duration");
const minutesParagraph = document.getElementById("minutes");
const secondsParagraph = document.getElementById("seconds");
let timerInterval;
let minutes = focusPeriodDuration;
let seconds = 0;
let isPaused = false;

function updateTimerDisplay() {
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
	minutesParagraph.textContent = formattedMinutes;
	secondsParagraph.textContent = formattedSeconds;
}

function startTimer() {
    startButton.style.display = "none";
    timer.style.display = "flex";
    durationSetter.style.display = "none";
    breaksInfo.style.display = "none";

    if (!timerInterval) {
        timerInterval = setInterval(function () {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);  // Fix: Change 'countdownInterval' to 'timerInterval'
                alert("Time for a break");
            } else {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateTimerDisplay();
            }
        }, 1000);
    }
}

// Other functions remain unchanged
function pauseTimer() {
	clearInterval(timerInterval);
	pauseButton.innerHTML = "resume";
	isPaused = true;
}
function continueTimer() {
	if (isPaused) {
		timerInterval = setInterval(function () {
			if (minutes === 0 && seconds === 0) {
				clearInterval(timerInterval);
				alert("Time for a break");
			} else {
				if (seconds === 0) {
					minutes--;
					seconds = 59;
				} else {
					seconds--;
				}
				updateTimerDisplay();
			}
		}, 1000);

		pauseButton.innerHTML = "pause";
		isPaused = false;
	}
}
function stopTimer() {
	clearInterval(timerInterval);
	minutes = focusPeriodDuration;
	seconds = 0;
	updateTimerDisplay();
	pauseButton.innerHTML = "pause";
	isPaused = false;

	startButton.style.display = "flex";
	timer.style.display = "none";
	durationSetter.style.display = "flex";
	breaksInfo.style.display = "flex";
}
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", () => {
	if (isPaused) {
		continueTimer();
	} else {
		pauseTimer();
	}
});
stopButton.addEventListener("click", stopTimer);
