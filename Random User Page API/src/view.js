"use strict";
class Render {
    constructor() {
        this.userData = [];
    }
    getUserData() {
        return this.userData;
    }
    renderTemplate(handleBarTemplate, objectKind, cssClass) {
        const source = $(handleBarTemplate).html();
        const template = Handlebars.compile(source);
        const newHTML = typeof objectKind === "string" ? template({ text: objectKind }) : template({ object: objectKind });
        $(cssClass).empty();
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
    renderQuote(quote) {
        this.renderTemplate(HandleBarTemplate.Quote, quote, CssTemplate.Quote);
        $(".quote-content").text(`${quote}`);
        this.userData.push(quote);
    }
    renderAboutMe(aboutMe) {
        this.renderTemplate(HandleBarTemplate.About, aboutMe, CssTemplate.About);
        this.userData.push(aboutMe);
    }
}
var CssTemplate;
(function (CssTemplate) {
    CssTemplate["User"] = ".user-container";
    CssTemplate["Friends"] = ".friends-container";
    CssTemplate["Pokemon"] = ".pokemon-container";
    CssTemplate["Quote"] = ".quote-container";
    CssTemplate["About"] = ".about-container";
})(CssTemplate || (CssTemplate = {}));
var HandleBarTemplate;
(function (HandleBarTemplate) {
    HandleBarTemplate["User"] = "#user-template";
    HandleBarTemplate["Friends"] = "#friends-template";
    HandleBarTemplate["Pokemon"] = "#pokemon-template";
    HandleBarTemplate["Quote"] = "#quote-template";
    HandleBarTemplate["About"] = "#about-template";
})(HandleBarTemplate || (HandleBarTemplate = {}));
