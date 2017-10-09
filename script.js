const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const wpmDisplay = document.querySelector("#wpm p");

var timer = [0, 0, 0, 0];
var timerRunning = false;
var interval;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
	if (time <= 9) {
		time = "0" + time;
	}
	return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
	let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
	theTimer.innerHTML = currentTime;
	timer[3]++;

	timer[0] = Math.floor((timer[3]/100)/60); // Minutes
	timer[1] = Math.floor((timer[3]/100) - (timer[0]*60)); // Seconds
	timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000)); // Hundreths of a second
}

// Match the text entered with the provided text on the page:
function spellCheck() {
	let textEntered = testArea.value;

	if ( textEntered == originText ) {
		testWrapper.style.borderColor = "#429890";
		clearInterval(interval);
		calculateWPM();
	} else {
		if ( textEntered == originText.substring(0,textEntered.length) ) {
			testWrapper.style.borderColor = "#65CCF3";
		} else {
			testWrapper.style.borderColor = "#E95D0F";
			// Increment error counter
		}
	}
}

// Calculate gross WPM after test is complete:
function calculateWPM() {
	let words = originText.length / 5;
	let minutes = (timer[3]/100)/60;
	let wpm = words / minutes;

	wpmDisplay.innerHTML = wpm.toFixed(2);
}

// Start the timer:
function start() {
	let textEnteredLength = testArea.value.length;
	if (textEnteredLength === 0 && !timerRunning) {
		interval = setInterval(runTimer, 10);
		timerRunning = true;
	}
}

// Reset everything:
function reset() {
	clearInterval(interval);
	interval = null;
	timer = [0, 0, 0, 0];
	timerRunning = false;

	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	testWrapper.style.borderColor = "grey";
	wpmDisplay.innerHTML = "Complete test to see WPM.";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
