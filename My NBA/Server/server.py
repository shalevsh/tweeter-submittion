from distutils.log import error
import json
from fastapi import FastAPI
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import requests
teams_id = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}


def get_players(team_name, players_list):
    team_id = teams_id.get(team_name, 0)
    if not team_id:
        raise error
    return players_list


def get_leauge_players(year):
    res = requests.get(f'http://data.nba.net/10s/prod/v1/{year}/players.json')
    data_list = res.json()["league"]["standard"]
    players_list = [generate_player(player_data) for player_data in data_list]
    return players_list


def generate_player(player_data):
    return {
        "name": f"{player_data.get('firstName')} {player_data.get('lastName')}",
        "pos": player_data.get("pos"),
        "jersey": player_data.get("jersey")
    }


app = FastAPI()


@app.get("/players")
def get_team_players(team_name, year):
    players_list = get_leauge_players(year)
    team_players = get_players(team_name, players_list)
    return json.dumps(team_players)


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
