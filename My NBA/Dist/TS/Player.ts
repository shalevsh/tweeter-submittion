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
    public get fullName() {
        return `${this._firstName} ${this._lastName}`;
    }
    public get firstName() {
        return this._firstName;
    }
    public get lastName() {
        return this._lastName;
    }

    public get id() {
        return this._id;
    }

    public get jerseyNumber() {
        return this._jerseyNumber;
    }

    public get position() {
        return this._position;
    }

    public get birthDate() {
        return this._birthDate;
    }

    public get isDreamTeam() {
        return this._isDreamTeam;
    }
    public get image() {
        return this._image;
    }

    public set fullName(name: string) {
        let parts = name.split(' ');
        if (parts.length != 2) {
            throw new Error('Invalid name format: first last');
        }
        this._firstName = parts[0];
        this._lastName = parts[1];
    }

}