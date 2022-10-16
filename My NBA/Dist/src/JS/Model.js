"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Model {
    GetPlayers(year, teamMate) {
        return __awaiter(this, void 0, void 0, function* () {
            let playersArr = [];
            try {
                const urlGetPlayers = `/players/?team_name=${teamMate.toLowerCase()}&year=${year}`;
                const getPlayers = yield $.get(urlGetPlayers);
                const players = JSON.parse(getPlayers);
                playersArr = yield this.createPlayers(players);
                const dreamTeam = yield this.GetDreamTeam();
                let inDreamTeam;
                playersArr.forEach((player) => {
                    if (Array.isArray(dreamTeam)) {
                        inDreamTeam = dreamTeam.filter(dreamTeamPlayer => dreamTeamPlayer.id.trim() === player.id.trim());
                    }
                    if (inDreamTeam.length > 0) {
                        player.DreamTeam = true;
                    }
                });
                return (playersArr);
            }
            catch (err) {
                return { err: err };
            }
        });
    }
    GetDreamTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            let dreamTeam;
            try {
                const urlGetDreamTeam = `/playersDream/`;
                dreamTeam = yield $.get(urlGetDreamTeam);
                const players_json = JSON.parse(dreamTeam);
                const players = this.createPlayerDreamTeam(players_json);
                return players;
            }
            catch (err) {
                return { err: err };
            }
        });
    }
    FilterBirthDatePlayers(year, teamMate) {
        return __awaiter(this, void 0, void 0, function* () {
            const playersFilter = yield this.GetPlayers(year, teamMate);
            let playersHasBirth = [];
            if (Array.isArray(playersFilter)) {
                playersHasBirth = playersFilter.filter(player => player.HasBirthDate !== "");
            }
            return playersHasBirth;
        });
    }
    createPlayers(playersArr) {
        return __awaiter(this, void 0, void 0, function* () {
            const players = [];
            playersArr.forEach((element) => {
                const nameArr = element.name.split(' ');
                const firstName = nameArr[0];
                const lastName = nameArr[1];
                let image = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;
                players.push(new Player(element.name, firstName, lastName, element.jersey_number, element.position, element.dateOfBirthUTC, false, image));
            });
            return players;
        });
    }
    createPlayerDreamTeam(players) {
        return __awaiter(this, void 0, void 0, function* () {
            const playersArr = [];
            players.forEach((player) => {
                let image = `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`;
                playersArr.push(new Player(player.id, player.firstName, player.lastName, player.jerseyNumber, player.position, player.birthDate, true, image));
            });
            return playersArr;
        });
    }
    AddPlayerToDreamTeam(player) {
        return __awaiter(this, void 0, void 0, function* () {
            let newPlayerResponse;
            try {
                newPlayerResponse = yield $.post({
                    url: "/player/",
                    type: "post",
                    async: false,
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify({
                        player
                    })
                });
                const players = JSON.parse(newPlayerResponse);
                const newPlayer = this.createPlayerDreamTeam([players]);
                return newPlayer;
            }
            catch (err) {
                return { err: err };
            }
        });
    }
    DeletePlayer(player) {
        return __awaiter(this, void 0, void 0, function* () {
            let newPlayer;
            try {
                newPlayer = yield $.ajax({
                    url: `/player/${player["_id"]}`,
                    type: "DELETE",
                    async: false,
                    dataType: "json",
                    contentType: "application/json",
                });
                return newPlayer;
            }
            catch (err) {
                return { err: err };
            }
        });
    }
    GetPlayerStats(player) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playerStatsUrl = `https://nba-players.herokuapp.com/players-stats/${player.lastName}/${player.firstName}`.replace(" ", "").trim();
                const data = yield $.get(playerStatsUrl);
                return new PlayerStats(data["name"], data["team_name"], data["steals_per_game"], data["three_point_percentage"], data["games_played"], data["player_efficiency_rating"]);
            }
            catch (err) {
                return { err: err };
            }
        });
    }
}
