"use strict";
class View {
    RenderEmptyPlayers() {
        $('#row-container').empty();
    }
    RenderEmptyStatsPlayer() {
        $('#stats-container').empty();
    }
    RenderPlayers(players) {
        this.RenderEmptyPlayers();
        this.RenderEmptyStatsPlayer();
        const source = $('#player-tamplate').html();
        const template = Handlebars.compile(source);
        const newHtml = template({ results: players });
        $('#row-container').append(newHtml);
        $("#floating-square").hide();
        $("#birth-date").prop("disabled", false);
        $("#get-dream-team").prop("disabled", false);
    }
    RenderPlayerStats(playerStats) {
        this.RenderEmptyStatsPlayer();
        const source = $('#player-stats-tamplate').html();
        const template = Handlebars.compile(source);
        const newHtml = template({ stats: playerStats });
        $('#stats-container').append(newHtml);
    }
}
