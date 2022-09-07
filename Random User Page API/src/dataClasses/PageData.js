"use strict";
class PageData {
    constructor(user, friends, pokemon, quote, about) {
        this.user = user;
        this.friends = friends;
        this.pokemon = pokemon;
        this.quote = quote;
        this.about = about;
    }
    getUser() {
        return this.user;
    }
    getFriends() {
        return this.friends;
    }
    getPokemon() {
        return this.pokemon;
    }
    getQuote() {
        return this.quote;
    }
    getAbout() {
        return this.about;
    }
}
