import { Time } from './time.js';
import { computeStrTimeFromSeconds, SECONDS_PER_HOUR } from './helpers.js';
import { kilometerToMiles } from './conversions.js';

function computeSpeed(secondsPerUnit) {
    return +(SECONDS_PER_HOUR / secondsPerUnit).toFixed(2);
}

function getSpeedPerHour(timeToObtainStr, distance = 4.0, distanceUnit = 'km') {
    const timeToObtain = new Time(timeToObtainStr);
    const totalSeconds = timeToObtain.transformInSeconds();

    const timePerUnit = Math.floor(totalSeconds / distance);
    const timePerUnitFormatted = computeStrTimeFromSeconds(timePerUnit);
    const timePerUnitObj = new Time(timePerUnitFormatted);

    let output = computeSpeed(timePerUnitObj.transformInSeconds());
    if (distanceUnit === 'miles') {
        output = kilometerToMiles(output);
    }

    return output;
}

export function getSpeedPerHourMessage(timeStr, distance, unit) {
    const speed = getSpeedPerHour(timeStr, distance, unit);
    return `To run ${distance} ${unit} in ${timeStr} you must run with ${speed} ${unit} per hour.`;
}
