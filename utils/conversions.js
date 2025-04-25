function kilometerToMiles(km) {
    return +(km * 0.621371192).toFixed(2);
}

function milesToKilometers(miles) {
    return +(miles * 1.609344).toFixed(2);
}

export function convertUnit(distance, inputUnit) {
    if (inputUnit === "km"){
        return kilometerToMiles(distance)
    }
    return milesToKilometers(distance)
}