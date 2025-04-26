import { getSpeedPerHourMessage } from './utils/speed.js';
import { getTimeBasedOnSpeedMessage } from './utils/timeFromSpeed.js';
import { bindClickAndTouch, changeValueOfNumericInput, extractStepValue, validateInput } from './utils/helpers.js';
import { isNonNegativeFloat, isValidTimeFormat } from './utils/validators.js';
document.addEventListener('DOMContentLoaded', () => {
    const interfaceUnitSelect = document.getElementById('unit');
    const distanceInput = document.getElementById('distance');
    const distanceUnitSelect = document.getElementById('distance-unit');
    const distanceStepSelect = document.getElementById('distance-step');
    const timeInput = document.getElementById('time');
    const speedInput = document.getElementById('speed');
    const speedStepSelect = document.getElementById('speed-step');
    const speedResult = document.getElementById('speed-result');
    const timeResult = document.getElementById('time-result');

    // Initialize the step attribute for distance and speed inputs
    distanceInput.step = parseFloat(distanceStepSelect.value);
    speedInput.step = parseFloat(speedStepSelect.value);

    distanceStepSelect.addEventListener('change', () => {
        const selectedStep = parseFloat(distanceStepSelect.value);
        distanceInput.step = selectedStep;
    });

    speedStepSelect.addEventListener('change', () => {
        const selectedStep = parseFloat(speedStepSelect.value);
        speedInput.step = selectedStep;
    });

    bindClickAndTouch(document.getElementById('compute-speed-btn'), () => {
        const time = timeInput.value;
        const distance = parseFloat(distanceInput.value);
        const distanceUnit = distanceUnitSelect.value;
        const interfaceUnit = interfaceUnitSelect.value;

        try {
            const resultText = getSpeedPerHourMessage(time, distance, distanceUnit, interfaceUnit);
            speedResult.textContent = resultText;
        } catch (error) {
            speedResult.textContent = 'Error: ' + error.message;
        }
    });

    bindClickAndTouch(document.getElementById('compute-time-btn'), () => {
        const speed = parseFloat(speedInput.value);
        const speedUnitSelect = document.getElementById('speed-unit');
        const speedUnit = speedUnitSelect.value;
        const distance = parseFloat(distanceInput.value);
        const distanceUnit = distanceUnitSelect.value;
        const interfaceUnit = interfaceUnitSelect.value;

        try {
            const resultText = getTimeBasedOnSpeedMessage(speed, speedUnit, distance, distanceUnit, interfaceUnit);
            timeResult.textContent = resultText;
        } catch (error) {
            timeResult.textContent = 'Error: ' + error.message;
        }
    });

    bindClickAndTouch(document.getElementById('increment-distance-btn'), () => changeValueOfNumericInput(distanceInput, extractStepValue(distanceStepSelect)));

    bindClickAndTouch(document.getElementById('decrement-distance-btn'), () => changeValueOfNumericInput(distanceInput, extractStepValue(distanceStepSelect), "float", false));

    bindClickAndTouch(document.getElementById('increment-speed-btn'), () => changeValueOfNumericInput(speedInput, extractStepValue(speedStepSelect), "float", true));

    bindClickAndTouch(document.getElementById('decrement-speed-btn'), () => changeValueOfNumericInput(speedInput, extractStepValue(speedStepSelect), "float", false));

    validateInput(distanceInput, (val) => isNonNegativeFloat(val), "Distance must be a positive floating point number", [document.getElementById('compute-speed-btn'), document.getElementById('compute-time-btn')]);
    validateInput(speedInput, (val) => isNonNegativeFloat(val), "Speed must be a positive floating point number", [document.getElementById('compute-time-btn')]);
    validateInput(timeInput, (val) => isValidTimeFormat(val), "Time must be in one of the formats formats like mm:ss, hh:mm:ss, mm.ss, hh.mm.ss, or 999", [document.getElementById('compute-speed-btn')]);
});
