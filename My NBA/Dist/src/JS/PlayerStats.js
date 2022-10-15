"use strict";
class PlayerStats {
    constructor(playerName, teamName, stealsPerGame, threePointPercentege, gamePlayed, playerEfficiencyRating) {
        this._playerName = playerName;
        this._teamName = teamName;
        this._stealsPerGame = stealsPerGame;
        this._threePointPercentege = threePointPercentege;
        this._gamePlayed = gamePlayed;
        this._playerEfficiencyRating = playerEfficiencyRating;
    }
    get teamName() {
        return this._teamName;
    }
    get stealsPerGame() {
        return this._stealsPerGame;
    }
    get threePointPercentege() {
        return this._threePointPercentege;
    }
    get gamePlayed() {
        return this._gamePlayed;
    }
    get playerEfficiencyRating() {
        return this._playerEfficiencyRating;
    }
    get playerName() {
        return this._playerName;
    }
}
