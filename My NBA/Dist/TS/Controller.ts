class Controller{
private _model =new Model();
private _view = new View();

constructor(){
    this.addListners();
}

private async getPlayers(year:String,teamMate:String) {
    try{        
        const players=await this._model.GetPlayers(year,teamMate); 
        if(!Array.isArray(players)){
            this._view.RenderEmptyPlayers();
            $("#project-id-select-error").html("there is an error in your team or year").addClass("error-msg"); 
        }else{       
            this._view.RenderPlayers(players)
        }
    }catch(error){
        return error;
    }
}

private async filterHasBirthDatePlayers(year:String,teamMate:String){
    const players = await this._model.FilterHasBirthDatePlayers(year,teamMate);    
    this._view.RenderPlayers(players)
}

private getPlayerByTeamAndYear(callback:Function){
    const teamName = document.querySelector('#team-name') as HTMLInputElement;
    const year = document.querySelector('#year-player') as HTMLInputElement;    
    callback(year.value,teamName.value);
}


private async addPlayer(player:Player):Promise<Player |Object>{
    const newPlayer= await this._model.addPlayerTeam(player);
    return newPlayer;
}
private async deletePlayer(player:Player):Promise<Player |Object>{
    const deletePlayer= await this._model.DeletePlayer(player);
    return deletePlayer;
}
private async getDreamTeam(): Promise<Player |Object>{
    const dreamTeam= await this._model.GetDreamTeam();
    return dreamTeam;
}
private async getPlayerStats(player:Player):Promise<PlayerStats |Object>{
    const playerStats= await this._model.GetPlayerStats(player);
    return playerStats;
}


private findPlayerPush(thePlayer:any):Player{
    const firstName= $(thePlayer).closest(".card-body").find(".card-firstName").text()
    const lastName= $(thePlayer).closest(".card-body").find(".card-lastName").text()
    const jersyNumber= $(thePlayer).closest(".card-body").find(".card-jersy").text()
    const position= $(thePlayer).closest(".card-body").find(".card-position").text()   
    const HasBirthDate= $(thePlayer).closest(".card-body").find(".card-hasBirthDate").text()
    const DreamTeam= $(thePlayer).closest(".card-body").find(".card-DreamTeam").text()
    const Image= $(thePlayer).closest(".card").find("#ImagePlayer").prop('src')
    const dreamTeamIn = DreamTeam === 'true';
    const player:Player = new Player(firstName+lastName,firstName,lastName,jersyNumber,position,HasBirthDate,dreamTeamIn,Image);
    
    return player;   
}

private addListners(){
    $('#get-team').on('click',()=>{
        this.getPlayerByTeamAndYear(this.getPlayers);
    })

    $('#HasBirthDate').on('click',()=>{
        const checkbox = document.getElementById('HasBirthDate',) as HTMLInputElement | null;
          if (checkbox?.checked) {
            this.getPlayerByTeamAndYear(this.filterHasBirthDatePlayers);    
          }else{
            this.getPlayerByTeamAndYear(this.getPlayers);
          }  
    })

    $('body').on('click','#AddPlayer',()=>{       
        const player:Player = this.findPlayerPush($(this));
        let playerNewPromise = this.addPlayer(player)  
        playerNewPromise.then(()=>{        
            $(this).hide();
        })
    })
    
    $('body').on('click','#DeletePlayer',()=>{
       const player:Player = this.findPlayerPush($(this));
       let playerNewPromise = this.deletePlayer(player)  
       playerNewPromise.then(()=>{ 
            let playerNewPromise = this.getDreamTeam()
            playerNewPromise.then((value: any)=>{             
                this._view.RenderPlayers(value)     
                $('.btn-outline-danger').show();        
            })         
             
        })
    })
    
    $('#DreamTeamGet').on('click',(()=>{
        let playerNewPromise = this.getDreamTeam()    
        playerNewPromise.then((value)=>{   
            this._view.RenderPlayers(value)
            $('#DeletePlayer').show();     
            $(".hide-dream-team").hide();
            $('.show-in-dreamteam').show();     
        
        })
    }))    
    
    $('body').on('click','#StatusPlayer',()=>{
        const player:Player = this.findPlayerPush($(this));   
        let playerStatsPromise= this.getPlayerStats(player)  
        playerStatsPromise.then((value: any)=>{
            this._view.RenderPlayerStats(value);
             
        })
    
    })
}

}