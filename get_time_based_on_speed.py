from utils import compute_str_time_from_seconds, kilometer_to_miles, SECONDS_PER_HOUR, Time

def compute_seconds_from_speed(kilometers_per_hour):
    seconds_per_kilometer = round(SECONDS_PER_HOUR / kilometers_per_hour) 
    return seconds_per_kilometer

def get_time_based_on_speed(speed: float, distance: int = 4, unit: str="km"):
    if unit == "miles":
        distance = kilometer_to_miles(distance)
    return  Time(compute_str_time_from_seconds(compute_seconds_from_speed(speed) * distance))

def get_time_based_on_speed_outside_call(speed:float, dist:int, unit:str):
# speed = float(input("Speed: "))
# dist = int(input("Distance: "))
# unit = str(input("Unit of measurement: "))
# dist = 4 # always in kilometers
# unit = "km"
    output = get_time_based_on_speed(speed, dist, unit)
    return f"When running with {speed} {unit} per hour you are going to run {dist} {unit} in {str(output)}"