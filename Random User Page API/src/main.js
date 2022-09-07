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
const module = new moduleData();
const render = new Render();
$("#generate-brn").on("click", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield module.fetchData().then((data) => {
            console.log(data, "data");
            render.renderMainUser(data.getUser());
            render.renderUserFriends(data.getFriends());
            render.renderPokemon(data.getPokemon());
            render.renderQuote(data.getQuote());
            render.renderAboutMe(data.getAbout());
        });
    });
});
