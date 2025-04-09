from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from get_time_based_on_speed import get_time_based_on_speed_outside_call
from get_speed_per_hour import get_speed_per_hour_outside_call

app = FastAPI()

class QueryParams(BaseModel):
    distance: int
    unit: str

@app.get("/get-speed")
async def get_speed(time: str, distance: int, unit: str):
    try:
        result = get_speed_per_hour_outside_call(time, distance, unit)
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}

@app.get("/get-time")
async def get_time(speed: float, distance: int, unit: str):
    try:
        result = get_time_based_on_speed_outside_call(speed, distance, unit)
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}
