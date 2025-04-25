import { Time } from './time.js';
import { computeStrTimeFromSeconds, roundingWithDecimals, SECONDS_PER_HOUR } from './helpers.js';
import { convertUnit } from './conversions.js';

// function computeSpeed(secondsPerUnit) {
//     // return Math.round((SECONDS_PER_HOUR / secondsPerUnit) * 10) / 10;
//     return roundingWithDecimals(SECONDS_PER_HOUR / secondsPerUnit);
// }

function getSpeedPerHour(timeObject, distance = 4.0) {
    const totalSeconds = timeObject.transformInSeconds();

    const secondsPerUnit = Math.round(totalSeconds / distance);
    // const timePerUnitFormatted = computeStrTimeFromSeconds(secondsPerUnit);
    // const timePerUnitObj = new Time(timePerUnitFormatted);

    let computedSpeed = roundingWithDecimals(SECONDS_PER_HOUR / secondsPerUnit);

    return computedSpeed;
}

export function getSpeedPerHourMessage(timeStr, distance, distanceUnit, interfaceUnit) {
    let inputtedDistance = null
    if (interfaceUnit !== distanceUnit) {
        // Convert the distance from what you expect in what you are going to see on the treadmill screen
        inputtedDistance = distance
        distance = convertUnit(distance, distanceUnit)
    }
    const timeObject = new Time(timeStr)
    const computedSpeed = getSpeedPerHour(timeObject, distance);
    return buildOutputString(distance, distanceUnit, timeObject.toString(), computedSpeed, interfaceUnit, inputtedDistance)
}

function buildOutputString(distance, distanceUnit, stringifiedTime, computedSpeed, interfaceUnit, inputtedDistance){
    if (inputtedDistance === null) {
       return `To run ${distance} ${distanceUnit} in ${stringifiedTime} you must run with ${computedSpeed} ${interfaceUnit} per hour.`;
    }
    return `To run ${inputtedDistance} ${distanceUnit} (which is the equivalent of ${distance} ${interfaceUnit}) in ${stringifiedTime} you must run with ${computedSpeed} ${interfaceUnit} per hour.`;
}