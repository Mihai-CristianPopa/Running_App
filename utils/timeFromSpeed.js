import { computeStrTimeFromSeconds, SECONDS_PER_HOUR } from './helpers.js';
import { kilometerToMiles } from './conversions.js';
import { Time } from './time.js';

function computeSecondsFromSpeed(kph) {
    return Math.round(SECONDS_PER_HOUR / kph);
}

function getTimeBasedOnSpeed(speed, distance = 4, unit = "km") {
    if (unit === "miles") {
        distance = kilometerToMiles(distance);
    }
    const seconds = computeSecondsFromSpeed(speed) * distance;
    const formattedTime = computeStrTimeFromSeconds(seconds);
    return new Time(formattedTime);
}

export function getTimeBasedOnSpeedMessage(speed, distance, unit) {
    const time = getTimeBasedOnSpeed(speed, distance, unit);
    return `When running with ${speed} ${unit} per hour you are going to run ${distance} km in ${time.toString()}`;
}
