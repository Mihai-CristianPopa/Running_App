export const MINUTES_PER_HOUR = 60;
export const SECONDS_PER_HOUR = MINUTES_PER_HOUR * 60;

export function bindClickAndTouch(element, handler) {
    let touched = false;
    element.addEventListener("touchstart", (e) => {
      touched = true;
      handler(e);
    });
    element.addEventListener("click", (e) => {
      if (!touched) {
        handler(e);
      }
      touched = false;
    });
  }
  

export function formatTimeWithZeroInFront(value) {
    return value < 10 ? `0${value}` : String(value);
}

export function computeStrTimeFromSeconds(seconds) {
    const hours = Math.floor(seconds / SECONDS_PER_HOUR);
    const minutes = Math.floor((seconds % SECONDS_PER_HOUR) / 60);
    const secs = seconds % 60;

    const hoursStr = formatTimeWithZeroInFront(hours);
    const minutesStr = formatTimeWithZeroInFront(minutes);
    const secondsStr = formatTimeWithZeroInFront(secs);

    return hours === 0
        ? `${minutesStr}:${secondsStr}`
        : `${hoursStr}:${minutesStr}:${secondsStr}`;
}

export function validateInput(inputElement, isValidFn, errorMessage, relatedButtons = []) {
    const errorDisplay = inputElement.closest('.block').querySelector('.error-message');
    inputElement.addEventListener('input', () => {
        const value = inputElement.value;
        if (!isValidFn(value)) {
            if(isPhoneUser()) {
              errorDisplay.textContent = errorMessage;
              errorDisplay.style.display = 'block';
            } else {
              inputElement.title = errorMessage;
              inputElement.classList.add('invalid');
            }
            relatedButtons.forEach(btn => btn.disabled = true);
        } else {
            if(isPhoneUser()) {
              errorDisplay.style.display = 'none';
            } else {
              inputElement.title = "";
              inputElement.classList.remove('invalid');
            }
            relatedButtons.forEach(btn => btn.disabled = false);
        }
    });
}

export function changeValueOfNumericInput(inputElement, step, type="float", increment=true){
  if (type === "integer") {
    increment ? inputElement.stepUp(step) : inputElement.stepDown(step);
    return;
  }

  const inputValue = parseFloat(inputElement.value)
  if (inputValue - step < 0 && !increment) return;
  if (!increment) step = -step
  const result = inputValue + step
  inputElement.value = result.toFixed(1)
}

function isPhoneUser() {
  return window.innerWidth <= 600;
}

export function extractStepValue(stepSelect) {
  return parseFloat(stepSelect.value)
}

export function roundingWithDecimals(floatingPointNumber, numberOfDecimalsToKeep = 1) {
  return Math.round(floatingPointNumber * (10 ** (numberOfDecimalsToKeep))) / (10 ** numberOfDecimalsToKeep);
}
