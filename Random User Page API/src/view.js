"use strict";
class Render {
    constructor() {
        this.userData = [];
    }
    getUserData() {
        return this.userData;
    }
    renderTemplate(handleBarTemplate, objectKind, htmlContainer) {
        const source = $(handleBarTemplate).html();
        const template = Handlebars.compile(source);
        const newHTML = typeof objectKind === "string" ? template({ text: objectKind }) : template({ object: objectKind });
        $(htmlContainer).empty();
        $(htmlContainer).append(newHTML);
    }
    renderMainUser(user) {
        this.renderTemplate(HandleBarTemplate.User, user, Container.User);
        this.userData.push(user);
    }
    renderUserFriends(userFriends) {
        this.renderTemplate(HandleBarTemplate.Friends, userFriends, Container.Friends);
        this.userData.push(userFriends);
    }
    renderPokemon(pokemon) {
        this.renderTemplate(HandleBarTemplate.Pokemon, pokemon, Container.Pokemon);
        this.userData.push(pokemon);
    }
    renderQuote(quote) {
        this.renderTemplate(HandleBarTemplate.Quote, quote, Container.Quote);
        $(".quote-content").text(`${quote}`);
        this.userData.push(quote);
    }
    renderAboutMe(aboutMe) {
        this.renderTemplate(HandleBarTemplate.About, aboutMe, Container.About);
        this.userData.push(aboutMe);
    }
}
var Container;
(function (Container) {
    Container["User"] = ".user-container";
    Container["Friends"] = ".friends-container";
    Container["Pokemon"] = ".pokemon-container";
    Container["Quote"] = ".quote-container";
    Container["About"] = ".about-container";
})(Container || (Container = {}));
var HandleBarTemplate;
(function (HandleBarTemplate) {
    HandleBarTemplate["User"] = "#user-template";
    HandleBarTemplate["Friends"] = "#friends-template";
    HandleBarTemplate["Pokemon"] = "#pokemon-template";
    HandleBarTemplate["Quote"] = "#quote-template";
    HandleBarTemplate["About"] = "#about-template";
})(HandleBarTemplate || (HandleBarTemplate = {}));
