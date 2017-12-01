const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const backButton = document.querySelector("#back-button");
const nextButton = document.querySelector("#next-button");
const randomButton = document.querySelector("#random-button");

var timer = [0, 0, 0, 0];
var timerRunning = false;
var interval;

var testTexts = ["Ooh, you think darkness is your ally? You merely adopted the dark, I was born in it. Molded by it. I didn't see the light until I was already a man. By then there was nothing to be but blinded.", "Someone like you. Someone who'll rattle the cages.", "Yes. The fire rises.", "I know why you choose to have your little, ahem... group-therapy sessions in broad daylight. I know why you're afraid to go out at night. The Batman.", "You have nothing, nothing to threaten me with. Nothing to do with all your strength.", "You know how to fight six men. We can teach you how to engage 600."];

var textArrayindex = 2;
originText.innerHTML = testTexts[textArrayindex];

function backText() {
	if (textArrayindex == 0) {
		textArrayindex = testTexts.length - 1;
	} else {
		textArrayindex--;
	}

	originText.innerHTML = testTexts[textArrayindex];
}

function nextText() {
	if (textArrayindex == testTexts.length - 1) {
		textArrayindex = 0;
	} else {
		textArrayindex++;
	}

	originText.innerHTML = testTexts[textArrayindex];
}

function randomText() {
	textArrayindex = Math.floor(Math.random() * ((testTexts.length) - 0) + 0);
	originText.innerHTML = testTexts[textArrayindex];
}

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
	errorCounter();

	if ( textEntered == originText.innerHTML ) {
		testWrapper.style.borderColor = "#429890";
		clearInterval(interval);
		calculateWPM(originText.innerHTML, timer[3]);
	} else {
		if ( textEntered == originText.innerHTML.substring(0,textEntered.length) ) {
			testWrapper.style.borderColor = "#65CCF3";
		} else {
			testWrapper.style.borderColor = "#E95D0F";
		}
	}
}

function errorCounter() {
	let textEntered = testArea.value;
	let testTextArray = testTexts[textArrayindex].split("");
	let textEnteredArray = textEntered.split("");
	let errors = 0;
	let i = 0;

	while (i < (testArea.value.length - 1)) {
		i++;
		if (textEnteredArray[i] != testTextArray[i]) {
			errors++;
		}
	}

	console.log(errors);
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
	resetWPM();
}

// Event listeners for keyboard input and buttons:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
backButton.addEventListener("click", backText, false);
nextButton.addEventListener("click", nextText, false);
randomButton.addEventListener("click", randomText, false);
