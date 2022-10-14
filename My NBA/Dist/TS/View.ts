class View{  
   public RenderEmptyPlayers(){
        $('#row-container').empty();
    }

    public RenderEmptyStatsPlayer(){
        $('#stats-container').empty();
    }


    public RenderPlayers(players:Player[] | Object){
        this.RenderEmptyPlayers();
        this.RenderEmptyStatsPlayer();
        const source = $('#player-tamplate').html();
        const template = Handlebars.compile(source)
        const newHtml = template({results:players})  
        $('#row-container').append(newHtml)
        $("#floating-square").hide()
        $( "#birth-date" ).prop( "disabled", false );
        $("#get-dream-team").prop( "disabled", false );


    }

    public RenderPlayerStats(playerStats:PlayerStats |Object){
        this.RenderEmptyStatsPlayer();
        const source = $('#player-stats-tamplate').html();
        const template = Handlebars.compile(source)
        const newHtml = template({stats:playerStats})                
        $('#stats-container').append(newHtml)
    }
        
}