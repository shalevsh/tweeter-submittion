class PlayerStats{
private _playerName:String
private _teamName:String
private _stealsPerGame:String
private _threePointPercentege:String
private _gamePlayed:String
private _playerEfficiencyRating:String



constructor(playerName:String,teamName:String,stealsPerGame:String,threePointPercentege:String,gamePlayed:String,playerEfficiencyRating:String){
    this._playerName=playerName;
    this._teamName = teamName;
    this._stealsPerGame = stealsPerGame;
    this._threePointPercentege=threePointPercentege;
    this._gamePlayed=gamePlayed;
    this._playerEfficiencyRating=playerEfficiencyRating;
}
public get teamName() {
    return this._teamName;
}
public get stealsPerGame() {
    return this._stealsPerGame;
}

public get threePointPercentege() {
    return this._threePointPercentege;
}

public get gamePlayed() {
    return this._gamePlayed;
}

public get playerEfficiencyRating() {
    return this._playerEfficiencyRating;
}

public get playerName() {
    return this._playerName;
}
}