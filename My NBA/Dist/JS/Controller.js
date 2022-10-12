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
class Controller {
    constructor() {
        this._model = new Model();
        this._view = new View();
        this.addListners();
    }
    getPlayers(year, teamMate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const players = yield this._model.GetPlayers(year, teamMate);
                if (!Array.isArray(players)) {
                    this._view.RenderEmptyPlayers();
                    $("#project-id-select-error").html("there is an error in your team or year").addClass("error-msg");
                }
                else {
                    this._view.RenderPlayers(players);
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    filterHasBirthDatePlayers(year, teamMate) {
        return __awaiter(this, void 0, void 0, function* () {
            const players = yield this._model.FilterHasBirthDatePlayers(year, teamMate);
            this._view.RenderPlayers(players);
        });
    }
    getPlayerByTeamAndYear(callback) {
        const teamName = document.querySelector('#team-name');
        const year = document.querySelector('#year-player');
        callback(year.value, teamName.value);
    }
    addPlayer(player) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPlayer = yield this._model.addPlayerTeam(player);
            return newPlayer;
        });
    }
    deletePlayer(player) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletePlayer = yield this._model.DeletePlayer(player);
            return deletePlayer;
        });
    }
    getDreamTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const dreamTeam = yield this._model.GetDreamTeam();
            return dreamTeam;
        });
    }
    getPlayerStats(player) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerStats = yield this._model.GetPlayerStats(player);
            return playerStats;
        });
    }
    findPlayerPush(thePlayer) {
        const firstName = $(thePlayer).closest(".card-body").find(".card-firstName").text();
        const lastName = $(thePlayer).closest(".card-body").find(".card-lastName").text();
        const jersyNumber = $(thePlayer).closest(".card-body").find(".card-jersy").text();
        const position = $(thePlayer).closest(".card-body").find(".card-position").text();
        const HasBirthDate = $(thePlayer).closest(".card-body").find(".card-hasBirthDate").text();
        const DreamTeam = $(thePlayer).closest(".card-body").find(".card-DreamTeam").text();
        const Image = $(thePlayer).closest(".card").find("#ImagePlayer").prop('src');
        const dreamTeamIn = DreamTeam === 'true';
        const player = new Player(firstName + lastName, firstName, lastName, jersyNumber, position, HasBirthDate, dreamTeamIn, Image);
        return player;
    }
    addListners() {
        $('#get-team').on('click', () => {
            this.getPlayerByTeamAndYear(this.getPlayers);
        });
        $('#HasBirthDate').on('click', () => {
            const checkbox = document.getElementById('HasBirthDate');
            if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
                this.getPlayerByTeamAndYear(this.filterHasBirthDatePlayers);
            }
            else {
                this.getPlayerByTeamAndYear(this.getPlayers);
            }
        });
        $('body').on('click', '#AddPlayer', () => {
            const player = this.findPlayerPush($(this));
            let playerNewPromise = this.addPlayer(player);
            playerNewPromise.then(() => {
                $(this).hide();
            });
        });
        $('body').on('click', '#DeletePlayer', () => {
            const player = this.findPlayerPush($(this));
            let playerNewPromise = this.deletePlayer(player);
            playerNewPromise.then(() => {
                let playerNewPromise = this.getDreamTeam();
                playerNewPromise.then((value) => {
                    this._view.RenderPlayers(value);
                    $('.btn-outline-danger').show();
                });
            });
        });
        $('#DreamTeamGet').on('click', (() => {
            let playerNewPromise = this.getDreamTeam();
            playerNewPromise.then((value) => {
                this._view.RenderPlayers(value);
                $('#DeletePlayer').show();
                $(".hide-dream-team").hide();
                $('.show-in-dreamteam').show();
            });
        }));
        $('body').on('click', '#StatusPlayer', () => {
            const player = this.findPlayerPush($(this));
            let playerStatsPromise = this.getPlayerStats(player);
            playerStatsPromise.then((value) => {
                this._view.RenderPlayerStats(value);
            });
        });
    }
}
