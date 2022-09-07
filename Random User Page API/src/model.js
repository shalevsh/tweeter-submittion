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
const NUMBER_OF_POKEMONS = 949;
class moduleData {
    constructor() {
        this.users = [];
        this.quote = "";
        this.aboutMe = "";
        this.pokemon = new Pokemon("", "");
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            Promise.all([yield this.getRandomUsers(), yield this.getQuote(), yield this.getPokemon(), yield this.getAboutMe()]);
        });
    }
    getRandomUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch('https://randomuser.me/api/?results=7')
                .then((response) => response.json())
                .then((data) => {
                let arrayOfUsers = data.results;
                arrayOfUsers.forEach((user) => {
                    this.users.push(new User(user.name.first, user.name.last, user.location.city, user.location.state, user.picture.medium));
                });
            });
        });
    }
    getQuote() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch('https://api.kanye.rest')
                .then((response) => response.json())
                .then((data) => this.quote = data.quote);
        });
    }
    getPokemon() {
        return __awaiter(this, void 0, void 0, function* () {
            const pokemonId = Math.floor(Math.random() * NUMBER_OF_POKEMONS) + 1;
            return yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
                .then((response) => response.json())
                .then((data) => this.pokemon = new Pokemon(data.name, data.sprites.front_default));
        });
    }
    getAboutMe() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch('https://baconipsum.com/api/?type=meat-and-filler')
                .then((response) => response.json())
                .then((data) => this.aboutMe = data[0]);
        });
    }
}
