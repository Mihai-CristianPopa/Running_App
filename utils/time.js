import { SECONDS_PER_HOUR, MINUTES_PER_HOUR, formatTimeWithZeroInFront } from './helpers.js';

export class Time {
    constructor(input = "00:00") {
        const [hours, minutes, seconds] = this.extractTimeFromString(input);
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    extractTimeFromString(input) {
        let parts = null;
        if (input.includes(".")) {
            parts = input.split(".").map(Number);
            if (parts.length === 2) parts.unshift(0);
        } else if (input.includes(":")) {
            parts = input.split(":").map(Number);
            if (parts.length === 2) parts.unshift(0);
        } else if (input.length === 2 || input.length === 3) {
            const minutes = parseInt(input);
            parts = minutes <= 60
                ? [0, minutes, 0]
                : [Math.floor(minutes / 60), minutes % 60, 0];
        }
        if (!parts) throw new Error("Invalid format. Expected hh:mm:ss, hh.mm.ss, mm:ss, mm.ss or plain minutes.");
        if (parts[0] > 24) throw new Error("Invalid value. The number of hours can't be larger than 24.");
        return parts;
    }

    transformInSeconds() {
        return this.hours * SECONDS_PER_HOUR + this.minutes * MINUTES_PER_HOUR + this.seconds;
    }

    toString() {
        let output = "";

        if (this.hours > 0) {
            output += formatTimeWithZeroInFront(this.hours);
        }
    
        if (this.minutes > 0) {
            if (output === "") {
                output = "00";
            }
            output += ":" + formatTimeWithZeroInFront(this.minutes);
        }
    
        if (this.seconds > 0) {
            if (output === "") {
                output = "00:00";
            }
            output += ":" + formatTimeWithZeroInFront(this.seconds);
        } else {
            output += ":00";
        }
        return output;
    }
}
