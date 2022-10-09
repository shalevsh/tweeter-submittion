class Player{
    private readonly _id:String 
    private _firstName:String
    private _lastName:String
    private _jerseyNumber:String
    private _position:String
    private _birthDate:String
    private _isDreamTeam:boolean
    private _image:String
    
    constructor(id:String,firstName:String,lastName:String,jerseyNumber:String,position:String,birthDate:String,isDreamTeam:boolean,image:String){
        this._id=id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._jerseyNumber=jerseyNumber;
        this._position=position;
        this._birthDate=birthDate;
        this._isDreamTeam=isDreamTeam;
        this._image=image;
    }


}