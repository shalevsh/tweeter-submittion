from distutils.log import error
import json
from fastapi import FastAPI, status, HTTPException
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import requests
from teams_id import teams_id
from dream_team import dream_team


def get_players(team_name, players_list):
    team_id = teams_id.get(team_name, 0)
    if not team_id:
        raise error
    return players_list


def get_leauge_players(year):
    res = requests.get(f'http://data.nba.net/10s/prod/v1/{year}/players.json')
    if (res.status_code == 200):
        data_list = res.json()["league"]["standard"]
        players_list = [generate_player(player_data)
                        for player_data in data_list]
        return players_list

    else:
        raise HTTPException(status_code=404, detail="erorr in api")


def generate_player(player_data):
    return {
        "name": f"{player_data.get('firstName')} {player_data.get('lastName')}",
        "pos": player_data.get("pos"),
        "jersey": player_data.get("jersey")
    }


def init_dream_player(player):
    id_player = (
        f'{player["player"]["firstName"]} {player["player"]["lastName"]}').replace(" ", "")
    player_dream = player["player"]
    dream_player = {
        "id": id_player,
        "firstName": player_dream["firstName"],
        "lastName": player_dream["lastName"],
        "jerseyNumber": player_dream["jerseyNumber"],
        "position": player_dream["position"],
        "hasBirthDate": player_dream["hasBirthDate"],
        "dreamTeam": player_dream["dreamTeam"],
        "image": player_dream["image"]
    }
    return dream_player


app = FastAPI()
app.mount("/Dist/src", StaticFiles(directory="./Dist/src"), name="src")


@app.get("/")
def on_load():
    return FileResponse('src/index.html')


@app.get("/players", status_code=status.HTTP_200_OK)
def get_team_players(team_name, year):
    tems_id = teams_id.get(team_name)
    if (tems_id == None):
        raise HTTPException(status_code=404, detail="the team dosent excit")

    players_list = get_leauge_players(year)
    team_players = get_players(team_name, players_list)
    return json.dumps(team_players)


@app.post('/player/', status_code=status.HTTP_201_CREATED)
async def add_player_dream(request: Request):
    respone = await request.json()
    player = init_dream_player(respone)
    dream_team.append(player)
    new_player = json.dumps(player)
    return new_player


@app.delete('/player/{player_id}', status_code=status.HTTP_200_OK)
async def delete_player(player_id):
    global dream_team
    dream_list = [item for item in dream_team if item.get('id').replace(" ", "") != player_id.replace(" ", "")]
    dream_team = dream_list
    return {"ok": True}

@app.get('/playersDream/', status_code=status.HTTP_200_OK)
async def get_players_dream():
    return json.dumps(dream_team)

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
