function kilometerToMiles(km) {
    return parseFloat(km * 0.621371192);
}

function milesToKilometers(miles) {
    return parseFloat(miles * 1.609344);
}

export function convertUnit(distance, inputUnit) {
    if (inputUnit === "km"){
        return kilometerToMiles(distance)
    }
    return milesToKilometers(distance)
}