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
const model = new Model();
const view = new View();
function getPlayers(year, teamMate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(self, "get player this");
            const players = yield model.GetPlayers(year, teamMate);
            if (!Array.isArray(players)) {
                view.RenderEmptyPlayers();
                $("#project-id-select-error").html("there is an error in your team or year").addClass("error-msg");
            }
            else {
                view.RenderPlayers(players);
            }
        }
        catch (error) {
            return error;
        }
    });
}
function filterHasBirthDatePlayers(year, teamMate) {
    return __awaiter(this, void 0, void 0, function* () {
        const players = yield model.FilterHasBirthDatePlayers(year, teamMate);
        view.RenderPlayers(players);
    });
}
function getPlayerByTeamAndYear(callback) {
    const teamName = document.querySelector('#team-name');
    const year = document.querySelector('#year-player');
    callback(year.value, teamName.value);
}
function addPlayer(player) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPlayer = yield model.addPlayerTeam(player);
        return newPlayer;
    });
}
function deletePlayer(player) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletePlayer = yield model.DeletePlayer(player);
        return deletePlayer;
    });
}
function getDreamTeam() {
    return __awaiter(this, void 0, void 0, function* () {
        const dreamTeam = yield model.GetDreamTeam();
        return dreamTeam;
    });
}
function getPlayerStats(player) {
    return __awaiter(this, void 0, void 0, function* () {
        const playerStats = yield model.GetPlayerStats(player);
        return playerStats;
    });
}
function findPlayerPush(thePlayer) {
    const firstName = $(thePlayer).closest(".card-body").find(".card-first-name").text();
    const lastName = $(thePlayer).closest(".card-body").find(".card-last-name").text();
    const jersyNumber = $(thePlayer).closest(".card-body").find(".card-jersy").text();
    const position = $(thePlayer).closest(".card-body").find(".card-position").text();
    const birthDate = $(thePlayer).closest(".card-body").find(".card-birth-date").text();
    const dreamTeam = $(thePlayer).closest(".card-body").find(".card-dream-team").text();
    const image = $(thePlayer).closest(".card").find("#image-Player").prop('src');
    const dreamTeamIn = dreamTeam === 'true';
    const player = new Player(`${firstName}${lastName}`, firstName, lastName, jersyNumber, position, birthDate, dreamTeamIn, image);
    return player;
}
function addListners() {
    $('#get-team').on('click', function () {
        getPlayerByTeamAndYear(getPlayers);
    });
    $('#HasBirthDate').on('click', () => {
        const checkbox = document.getElementById('HasBirthDate');
        if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
            getPlayerByTeamAndYear(filterHasBirthDatePlayers);
        }
        else {
            getPlayerByTeamAndYear(getPlayers);
        }
    });
    $('body').on('click', '#AddPlayer', function () {
        const player = findPlayerPush($(this));
        let playerNewPromise = addPlayer(player);
        playerNewPromise.then(() => {
            $(this).hide();
        });
    });
    $('body').on('click', '#DeletePlayer', function () {
        const player = findPlayerPush($(this));
        let playerNewPromise = this.deletePlayer(player);
        playerNewPromise.then(() => {
            let playerNewPromise = this.getDreamTeam();
            playerNewPromise.then((value) => {
                this._view.RenderPlayers(value);
                $('.btn-outline-danger').show();
            });
        });
    });
    $('#dream-team-get').on('click', (function () {
        let playerNewPromise = getDreamTeam();
        playerNewPromise.then((value) => {
            view.RenderPlayers(value);
            $('#delete-player').show();
            $(".hide-dream-team").hide();
            $('.show-in-dreamteam').show();
        });
    }));
    $('body').on('click', '#StatusPlayer', function () {
        const player = this.findPlayerPush($(this));
        let playerStatsPromise = this.getPlayerStats(player);
        playerStatsPromise.then((value) => {
            view.RenderPlayerStats(value);
        });
    });
}
