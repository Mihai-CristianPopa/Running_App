import { getSpeedPerHourMessage } from './utils/speed.js';
import { getTimeBasedOnSpeedMessage } from './utils/timeFromSpeed.js';
import { bindClickAndTouch, changeValueOfNumericInput, extractStepValue, getTranslatedStepOptionSelectedValue, setSelectOptions, validateInput } from './utils/helpers.js';
import { isNonNegativeFloat, isValidTimeFormat } from './utils/validators.js';
import { translations } from './utils/constants.js';
document.addEventListener('DOMContentLoaded', () => {
    // Setting Labels based on user's preffered browser language
    const userLanguage = (navigator.language).split("-")[0] || "en";
    const displayTexts = translations[userLanguage];
    document.title = displayTexts.title;
    document.querySelector(".header h1").textContent = displayTexts.header;
    document.querySelector("label[for='unit']").textContent = displayTexts.unitLabel;
    document.querySelector("label[for='distance']").textContent = displayTexts.distanceLabel;
    document.querySelector("label[for='time']").textContent = displayTexts.timeLabel;
    document.querySelector("label[for='speed']").textContent = displayTexts.speedLabel;
    document.getElementById("compute-speed-btn").textContent = displayTexts.computeSpeedBtn;
    document.getElementById("compute-time-btn").textContent = displayTexts.computeTimeBtn;
    document.getElementById("speed-result").textContent = displayTexts.speedResultPlaceholder;
    document.getElementById("time-result").textContent = displayTexts.timeResultPlaceholder;

    const interfaceUnitSelect = document.getElementById("unit");
    setSelectOptions(interfaceUnitSelect, displayTexts.unitOptions);

    const distanceUnitSelect = document.getElementById("distance-unit");
    setSelectOptions(distanceUnitSelect, displayTexts.unitOptions);

    const speedUnitSelect = document.getElementById('speed-unit');
    setSelectOptions(speedUnitSelect, displayTexts.unitOptions);

    const distanceStepSelect = document.getElementById('distance-step');
    setSelectOptions(distanceStepSelect, displayTexts.stepOptions);
    const distanceStepValue = getTranslatedStepOptionSelectedValue(displayTexts.stepOptions, 1, 0);
    if (distanceStepValue) {
        distanceStepSelect.value = distanceStepValue;
    }

    const speedStepSelect = document.getElementById('speed-step');
    setSelectOptions(speedStepSelect, displayTexts.stepOptions);
    const speedStepValuet = getTranslatedStepOptionSelectedValue(displayTexts.stepOptions, 0, 1);
    if (speedStepValuet) {
        speedStepSelect.value = speedStepValuet;
    }

    const distanceInput = document.getElementById('distance');
    const timeInput = document.getElementById('time');
    const speedInput = document.getElementById('speed');
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
