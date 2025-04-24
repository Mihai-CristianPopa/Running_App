// Not used as of now with distance becoming a float
export function isNonNegativeInteger(value) {
    if (value === "") return false;
    const number = Number(value)
    return Number.isInteger(number) && number >= 0;
}

export function isNonNegativeFloat(value) {
    if (isNaN(value)) return false;
    const floatValue = parseFloat(value)
    return Number(value) === floatValue && floatValue >=0;
}

// Accepts formats like "mm:ss", "hh:mm:ss", "mm.ss", "hh.mm.ss", or "999"
export function isValidTimeFormat(value) {
    const colonPattern = /^(\d{1,2}:)?[0-5]?\d:[0-5]?\d$/;  // hh:mm:ss or mm:ss
    const dotPattern = /^(\d{1,2}\.)?[0-5]?\d\.[0-5]?\d$/;   // hh.mm.ss or mm.ss
    const numberPattern = /^\d{1,3}$/;                      // integer-only

    return colonPattern.test(value) || dotPattern.test(value) || numberPattern.test(value);
}
