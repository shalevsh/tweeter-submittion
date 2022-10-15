import json
from fastapi import FastAPI, status, HTTPException, Request
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from teams_id import teams_id
from dream_team import dream_team
from pathlib import Path
import functions
current_file = Path(__file__)
current_file_dir = current_file.parent
project_root = current_file_dir.parent
project_root_absolute = project_root.resolve()
root_absolute = project_root_absolute / "Dist/src"

app = FastAPI()
app.mount("/Dist/src", StaticFiles(directory=root_absolute), name="src")


@app.get("/")
def on_load():
    return FileResponse('./Dist/src/index.html')


@app.get("/players", status_code=status.HTTP_200_OK)
def get_team_players(team_name, year):
    team_id = teams_id.get(team_name)
    if (team_id == None):
        raise HTTPException(status_code=404, detail="the team dosent excit")
    players_list = functions.get_leauge_players(year, team_id)
    return json.dumps(players_list)


@app.post('/player/', status_code=status.HTTP_201_CREATED)
async def add_player_dream(request: Request):
    respone = await request.json()
    player = functions.init_dream_player(respone)
    dream_team.append(player)
    new_player = json.dumps(player)
    return new_player


@app.delete('/player/{player_id}', status_code=status.HTTP_200_OK)
async def delete_player(player_id):
    global dream_team
    dream_list = [item for item in dream_team if item.get(
        'id').replace(" ", "") != player_id.replace(" ", "")]
    dream_team = dream_list
    return {"ok": True}


@app.get('/playersDream/', status_code=status.HTTP_200_OK)
async def get_players_dream():
    return json.dumps(dream_team)

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8080, reload=True)
