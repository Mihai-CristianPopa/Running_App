const unitSelect = document.getElementById('unit');
const distanceInput = document.getElementById('distance');
const timeInput = document.getElementById('time');
const speedInput = document.getElementById('speed');
const speedResult = document.getElementById('speed-result');
const timeResult = document.getElementById('time-result');

import { getSpeedPerHourMessage } from './utils/speed.js';
import { getTimeBasedOnSpeedMessage } from './utils/timeFromSpeed.js';
import { bindClickAndTouch, changeValueOfNumericInput, validateInput } from './utils/helpers.js';
import { isNonNegativeFloat, isValidTimeFormat } from './utils/validators.js';

bindClickAndTouch(document.getElementById('compute-speed-btn'), () => {
    const time = timeInput.value;
    const distance = parseFloat(distanceInput.value);
    const unit = unitSelect.value;
    
    try {
        const resultText = getSpeedPerHourMessage(time, distance, unit);
        speedResult.textContent = resultText;
    } catch (error) {
        speedResult.textContent = 'Error: ' + error.message;
    }
});

bindClickAndTouch(document.getElementById('compute-time-btn'), () => {
    const speed = parseFloat(speedInput.value);
    const distance = parseFloat(distanceInput.value);
    const unit = unitSelect.value;

    try {
        const resultText = getTimeBasedOnSpeedMessage(speed, distance, unit);
        timeResult.textContent = resultText;
    } catch (error) {
        timeResult.textContent = 'Error: ' + error.message;
    }
});

bindClickAndTouch(document.getElementById('increment-distance-btn'), () => changeValueOfNumericInput(distanceInput, 1));

bindClickAndTouch(document.getElementById('decrement-distance-btn'), () => changeValueOfNumericInput(distanceInput, 1, "float", false));

bindClickAndTouch(document.getElementById('increment-speed-btn'), () => changeValueOfNumericInput(speedInput, 0.1, "float", true));

bindClickAndTouch(document.getElementById('decrement-speed-btn'), () => changeValueOfNumericInput(speedInput, 0.1, "float", false));

validateInput(distanceInput, (val) => isNonNegativeFloat(val), "Distance must be a positive floating point number", [document.getElementById('compute-speed-btn'), document.getElementById('compute-time-btn')]);
validateInput(speedInput, (val) => isNonNegativeFloat(val), "Speed must be a positive floating point number", [document.getElementById('compute-time-btn')]);
validateInput(timeInput, (val) => isValidTimeFormat(val), "Time must be in one of the formats formats like mm:ss, hh:mm:ss, mm.ss, hh.mm.ss, or 999", [document.getElementById('compute-speed-btn')]);
