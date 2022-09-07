"use strict";
class Render {
    constructor() {
        this.userData = [];
    }
    getUserData() {
        return this.userData;
    }
    renderTemplate(handleBarTemplate, objectKind, cssClass) {
        $(cssClass).empty();
        const source = $(handleBarTemplate).html();
        const template = Handlebars.compile(source);
        const newHTML = template({ object: objectKind });
        $(cssClass).append(newHTML);
    }
    renderMainUser(user) {
        this.renderTemplate(HandleBarTemplate.User, user, CssTemplate.User);
        this.userData.push(user);
    }
    renderUserFriends(userFriends) {
        this.renderTemplate(HandleBarTemplate.Friends, userFriends, CssTemplate.Friends);
        this.userData.push(userFriends);
    }
    renderPokemon(pokemon) {
        this.renderTemplate(HandleBarTemplate.Pokemon, pokemon, CssTemplate.Pokemon);
        this.userData.push(pokemon);
    }
    RenderQoute(quote) {
        this.renderTemplate(HandleBarTemplate.Quote, quote, CssTemplate.Quote);
        this.userData.push(quote);
    }
    renderAboutMe(aboutMe) {
        this.renderTemplate(HandleBarTemplate.Friends, aboutMe, CssTemplate.Friends);
        this.userData.push(aboutMe);
    }
}
var CssTemplate;
(function (CssTemplate) {
    CssTemplate["User"] = ".user";
    CssTemplate["Friends"] = ".userFriends";
    CssTemplate["Pokemon"] = ".pokimon";
    CssTemplate["Quote"] = ".quote";
    CssTemplate["About"] = ".about";
})(CssTemplate || (CssTemplate = {}));
var HandleBarTemplate;
(function (HandleBarTemplate) {
    HandleBarTemplate["User"] = "#user-template";
    HandleBarTemplate["Friends"] = "#friends-template";
    HandleBarTemplate["Pokemon"] = "#pokemon-template";
    HandleBarTemplate["Quote"] = "#quote-template";
    HandleBarTemplate["About"] = "#about-template";
})(HandleBarTemplate || (HandleBarTemplate = {}));
