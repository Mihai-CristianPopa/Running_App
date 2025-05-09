import { Time } from './time.js';
import { roundingWithDecimals, SECONDS_PER_HOUR } from './helpers.js';
import { convertUnit } from './conversions.js';

function getSpeedPerHour(timeObject, distance = 4.0) {
    const totalSeconds = timeObject.transformInSeconds();

    const secondsPerUnit = parseFloat(totalSeconds / distance);

    const computedSpeed = roundingWithDecimals(SECONDS_PER_HOUR / secondsPerUnit, 2);

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
    return buildOutputString(roundingWithDecimals(distance, 2), distanceUnit, timeObject.toString(), computedSpeed, interfaceUnit, inputtedDistance)
}

function buildOutputString(distance, distanceUnit, stringifiedTime, computedSpeed, interfaceUnit, inputtedDistance){
    if (inputtedDistance === null) {
       return `To run ${distance} ${distanceUnit} in ${stringifiedTime} you must run with ${computedSpeed} ${interfaceUnit} per hour.`;
    }
    return `To run ${inputtedDistance} ${distanceUnit} (which is the equivalent of ${distance} ${interfaceUnit}) in ${stringifiedTime} you must run with ${computedSpeed} ${interfaceUnit} per hour.`;
}