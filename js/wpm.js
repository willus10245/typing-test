// Calculate gross WPM after test is complete:
const wpmDisplay = document.querySelector("#wpm p");

function calculateWPM(value, time) {
  let words = value.length / 5;
	let minutes = (time/100)/60;
	let wpm = words / minutes;

	wpmDisplay.innerHTML = wpm.toFixed(2);
}

function resetWPM() {
  wpmDisplay.innerHTML = "Complete test to see WPM.";
}
