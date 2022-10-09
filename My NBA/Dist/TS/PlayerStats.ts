class PlayerStats{
private _playerName:String
private _teamName:String
private _stealsPerGame:String
private _threePointPercentege:String
private _gamePlayed:String
private _playerEfficiencyRating:String



constructor(teamName:String,stealsPerGame:String,threePointPercentege:String,gamePlayed:String,playerEfficiencyRating:String,playerName:String){
    this._teamName = teamName;
    this._stealsPerGame = stealsPerGame;
    this._threePointPercentege=threePointPercentege;
    this._gamePlayed=gamePlayed;
    this._playerEfficiencyRating=playerEfficiencyRating;
    this._playerName=playerName;
}
}