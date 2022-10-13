"use strict";
class Player {
    constructor(id, firstName, lastName, jerseyNumber, position, birthDate, isDreamTeam, image) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._jerseyNumber = jerseyNumber;
        this._position = position;
        this._birthDate = birthDate;
        this._isDreamTeam = isDreamTeam;
        this._image = image;
    }
    get fullName() {
        return `${this._firstName}${this._lastName}`;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get id() {
        return this._id;
    }
    get jerseyNumber() {
        return this._jerseyNumber;
    }
    get position() {
        return this._position;
    }
    get birthDate() {
        return this._birthDate;
    }
    get isDreamTeam() {
        return this._isDreamTeam;
    }
    get image() {
        return this._image;
    }
}
