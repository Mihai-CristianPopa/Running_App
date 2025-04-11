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
    inputElement.addEventListener('input', () => {
        const value = inputElement.value;
        if (!isValidFn(value)) {
            inputElement.title = errorMessage;
            inputElement.classList.add('invalid');
            relatedButtons.forEach(btn => btn.disabled = true);
        } else {
            inputElement.title = "";
            inputElement.classList.remove('invalid');
            relatedButtons.forEach(btn => btn.disabled = false);
        }
    });
}

export function changeValueOfNumericInput(inputElement, step, type="integer", increment=true){
  if (type === "integer") {
    increment ? inputElement.stepUp(step) : inputElement.stepDown(step);
    return;
  }

  const inputValue = parseFloat(inputElement.value)
  if (inputValue <= 0) return;
  if (!increment) step = -step
  const result = inputValue + step
  inputElement.value = result.toFixed(1)
}
