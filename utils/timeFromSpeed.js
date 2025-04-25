import { computeStrTimeFromSeconds, roundingWithDecimals, SECONDS_PER_HOUR } from './helpers.js';
import { convertUnit } from './conversions.js';
import { Time } from './time.js';

function computeSecondsPerUnit(speed_per_hour) {
    return Math.round(SECONDS_PER_HOUR / speed_per_hour);
}

function getTimeBasedOnSpeed(speed, distance = 4.0) {
    const seconds = Math.round(computeSecondsPerUnit(speed) * distance);
    const formattedTime = computeStrTimeFromSeconds(seconds);
    return new Time(formattedTime);
}

export function getTimeBasedOnSpeedMessage(speed, speedUnit, distance, distanceUnit, interfaceUnit) {
    let inputtedDistance = null
    let inputtedSpeed = null
    if (interfaceUnit !== distanceUnit) {
        // Convert the distance from what you expect in what you are going to see on the treadmill screen
        inputtedDistance = distance
        distance = convertUnit(distance, distanceUnit)
    }
    if (interfaceUnit !== speedUnit) {
        inputtedSpeed = speed
        speed = roundingWithDecimals(convertUnit(speed, speedUnit))
    }
    const time = getTimeBasedOnSpeed(speed, distance);
    return buildOutputString(speed, speedUnit, interfaceUnit, distance, distanceUnit, time.toString(), inputtedDistance, inputtedSpeed);
}

function buildOutputString(speed, speedUnit, interfaceUnit, distance, distanceUnit, stringifiedTime, inputtedDistance, inputtedSpeed){
    if (inputtedDistance === null && inputtedSpeed === null) {
        // All measurements units are equal
       return `When running with ${speed} ${speedUnit} per hour you are going to run ${distance} ${distanceUnit} in ${stringifiedTime}`;
    } else if (inputtedDistance !== null && inputtedSpeed === null){
        // Distance has been converted, speedUnit equals interfaceUnit
        return `When running with ${speed} ${speedUnit} per hour you are going to run ${inputtedDistance} ${distanceUnit} (which is equivalent to ${distance} ${interfaceUnit}) in ${stringifiedTime}`;  
    } else if (inputtedDistance !== null && inputtedSpeed !== null) {
        // Both the speed and distance have been converted to the interface unit
        return `When running with ${speed} ${interfaceUnit} per hour (which is equivalent to ${inputtedSpeed} ${speedUnit} per hour) you are going to run ${inputtedDistance} ${distanceUnit} (which is the equivalent of ${distance} ${interfaceUnit}) in ${stringifiedTime}`;
    } else if (inputtedDistance === null && inputtedSpeed !== null) {
        return `When running with ${speed} ${interfaceUnit} per hour (which is equivalent to ${inputtedSpeed} ${speedUnit} per hour) you are going to run ${distance} ${distanceUnit} in ${stringifiedTime}`;
    }
}
