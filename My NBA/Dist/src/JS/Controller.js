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
addListners();
function getPlayers(year, teamMate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const players = yield model.GetPlayers(year, teamMate);
            if (!Array.isArray(players)) {
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
function filterBirthDatePlayers(year, teamMate) {
    return __awaiter(this, void 0, void 0, function* () {
        const players = yield model.FilterBirthDatePlayers(year, teamMate);
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
        const newPlayer = yield model.addPlayerToDreamTeam(player);
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
function getPlayerDetailsFromCardHtml(playerCardElement) {
    const firstName = $(playerCardElement).closest(".card-body").find(".card-first-name").text();
    const lastName = $(playerCardElement).closest(".card-body").find(".card-last-name").text();
    const jersyNumber = $(playerCardElement).closest(".card-body").find(".card-jersy").text();
    const position = $(playerCardElement).closest(".card-body").find(".card-position").text();
    const birthDate = $(playerCardElement).closest(".card-body").find(".card-birth-date").text();
    const dreamTeam = $(playerCardElement).closest(".card-body").find(".card-dream-team").text();
    const image = $(playerCardElement).closest(".card").find("#image-player").prop('src');
    const dreamTeamIn = dreamTeam === 'true';
    const player = new Player(`${firstName}${lastName}`, firstName, lastName, jersyNumber, position, birthDate, dreamTeamIn, image);
    return player;
}
function addListners() {
    $("#birth-date").prop("disabled", true);
    $("#get-team").prop("disabled", true);
    $("#get-dream-team").prop("disabled", true);
    $('#get-team').on('click', function () {
        getPlayerByTeamAndYear(getPlayers);
    });
    $('#birth-date').on('click', () => {
        const checkbox = document.getElementById('birth-date');
        if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
            getPlayerByTeamAndYear(filterBirthDatePlayers);
        }
        else {
            getPlayerByTeamAndYear(getPlayers);
        }
    });
    $('body').on('click', '#add-player', function () {
        const player = getPlayerDetailsFromCardHtml($(this));
        let playerNewPromise = addPlayer(player);
        playerNewPromise.then(() => {
            $(this).hide();
        });
    });
    $('body').on('click', '#delete-player', function () {
        const player = getPlayerDetailsFromCardHtml($(this));
        let playerNewPromise = this.deletePlayer(player);
        playerNewPromise.then(() => {
            let playerNewPromise = this.getDreamTeam();
            playerNewPromise.then((value) => {
                this.view.RenderPlayers(value);
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
    $('body').on('click', '#stats-player', function () {
        const player = getPlayerDetailsFromCardHtml($(this));
        let playerStatsPromise = getPlayerStats(player);
        playerStatsPromise.then((value) => {
            view.RenderPlayerStats(value);
        });
    });
    $('#team-name').on("blur", function () {
        $("#get-team").prop("disabled", false);
    });
}
