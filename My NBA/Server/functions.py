from fastapi import HTTPException
import requests
from player import Player
from dream_player import Dream_player


def get_players(team_id, players_list):
    players_list = list(
        filter(lambda player: player["teamId"] == team_id, players_list))
    return players_list


def get_leauge_players(year, team_id):
    res = requests.get(f'http://data.nba.net/10s/prod/v1/{year}/players.json')
    if (res.status_code == 200):
        data_list = res.json()["league"]["standard"]
        players_list = get_players(team_id, data_list)
        players_list = [generate_player(player_data)
                        for player_data in players_list]
        return players_list
    else:
        raise HTTPException(status_code=404, detail="erorr in api")


def generate_player(player_data):
    name = f"{player_data.get('firstName')} {player_data.get('lastName')}"
    pos= player_data.get("pos")
    jersey = player_data.get("jersey")
    return Player(name,pos,jersey).__dict__

def init_dream_player(player):
    player_dream = player["player"]
    id_player = (
        f'{player_dream["_firstName"]}{player_dream["_lastName"]}').replace(" ", "")
    first_name = player_dream["_firstName"].replace(" ", "")
    last_name = player_dream["_lastName"].replace(" ", "")
    jersey_number = player_dream["_jerseyNumber"]
    position = player_dream["_position"]
    birth_date = player_dream["_birthDate"]
    image = player_dream["_image"]
    return Dream_player(id_player, first_name, last_name, jersey_number, position, birth_date, image).__dict__
