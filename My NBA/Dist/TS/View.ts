class View{  
    public RenderPlayers(players:Player[] | Object){
        const source = $('#player-tamplate').html();
        const template = Handlebars.compile(source)
        const newHtml = template({results:players})  
        $('#row-container').empty();
        $('#stats-container').empty();
        $('#row-container').append(newHtml)
        $("#floating-square").hide()
        $( "#birth-date" ).prop( "disabled", false );
        $("#get-dream-team").prop( "disabled", false );
    }
    public RenderPlayerStats(playerStats:PlayerStats |Object){
        const source = $('#player-stats-tamplate').html();
        const template = Handlebars.compile(source)
        const newHtml = template({stats:playerStats})   
        $('#stats-container').empty();             
        $('#stats-container').append(newHtml)
    }    
}