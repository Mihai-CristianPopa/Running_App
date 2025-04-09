from utils import compute_str_time_from_seconds, kilometer_to_miles, SECONDS_PER_HOUR, Time

def compute_speed(seconds_per_kilometer):
    kilometers_per_hour = round(SECONDS_PER_HOUR / seconds_per_kilometer, 2)
    return kilometers_per_hour

def get_speed_per_hour(time_to_obtain: str, distance: int = 4, distance_unit: str = "km"):
    try:
        time_to_obtain = Time(stringified_time=time_to_obtain)
        # Minutes and seconds per kilometer
        time_per_one_distance_unit = Time(compute_str_time_from_seconds(time_to_obtain.transform_in_seconds() // distance))
        output = compute_speed(time_per_one_distance_unit.transform_in_seconds())
        if distance_unit == "miles":
            return kilometer_to_miles(output)
        return output
    except ValueError as error:
        print(error)

def get_speed_per_hour_outside_call(time_to_obtain:str, distance:int, unit:str):
    # time_to_obtain = str(input("Time to Obtain: "))
    # dist = int(input("Distance: "))
    # unit = str(input("Unit of measurement: "))
    # distance = 4
    # unit = "km"
    speed_per_hour = get_speed_per_hour(time_to_obtain, distance, unit)
    return f"To run {distance} {unit} in {time_to_obtain} you must run with {speed_per_hour} {unit} per hour"
