# class Utils:
MINUTES_PER_HOUR = 60
SECONDS_PER_HOUR = MINUTES_PER_HOUR * 60

def format_time_with_zero_in_front(hours_minutes_seconds):
    return f"0{hours_minutes_seconds}" if hours_minutes_seconds < 10 else str(hours_minutes_seconds)

def compute_str_time_from_seconds(seconds:int):
    hours = seconds // SECONDS_PER_HOUR
    minutes = seconds // 60
    minutes_output = format_time_with_zero_in_front(minutes)
    seconds = seconds % 60
    seconds_output = format_time_with_zero_in_front(seconds)
    if hours == 0:
        return f"{minutes_output}:{seconds_output}"
    else:
         hours_output = format_time_with_zero_in_front(hours)
         return f"{hours_output}:{minutes_output}:{seconds_output}"
    
def kilometer_to_miles(num_of_kilometers):
    return round(num_of_kilometers * 0.621371192)

class Time:
    def __init__(self, stringified_time: str=None):
        self.hours, self.minutes, self.seconds = self.extract_time_from_string(stringified_time)

    def extract_time_from_string(self, input):
        """
        If input comes in format hh:mm:ss we will be splitting by :
        If input comes in format hh.mm.ss we will be splitting by .
        If input comes in format mm:ss
        If input comes in format mm.ss
        If input comes in format without point or column we consider that as number of minutes,
        With a maximum of 999 minutes
        """
        if "." in input:
            split_time = [int(el) for el in input.split(".")]
            if len(split_time) == 2:
                split_time.insert(0, 0)
            return split_time
        elif ":" in input:
            split_time = [int(el) for el in input.split(":")]
            if len(split_time) == 2:
                split_time.insert(0, 0)
            return split_time
        elif len(input) in [2, 3]:
            minutes = int(input)
            return [0, minutes, 0] if minutes <= 60 else [minutes // 60, minutes % 60, 0]
        raise ValueError("Input must be in one of the formats mm:ss / mm.ss / mm")
    
    def __str__(self):
        output = ""
        if self.hours > 0:
            output += format_time_with_zero_in_front(self.hours)
        if self.minutes > 0:
            if output == "":
                output = "00"
            output += ":" + format_time_with_zero_in_front(self.minutes)
        if self.seconds > 0:
            if output == "":
                output = "00:00"
            output += ":" + format_time_with_zero_in_front(self.seconds)
        else:
            output += ":00"
        return output

    def transform_in_seconds(self):
        return self.hours * SECONDS_PER_HOUR + self.minutes * MINUTES_PER_HOUR + self.seconds