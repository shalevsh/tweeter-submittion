const model : Model =new Model();
const view: View = new View();


 async function getPlayers(year:String,teamMate:String) {
    try{       
        console.log(self,"get player this")
        const players= await model.GetPlayers(year,teamMate); 
        if(!Array.isArray(players)){
            view.RenderEmptyPlayers();
            $("#project-id-select-error").html("there is an error in your team or year").addClass("error-msg"); 
        }else{       
            view.RenderPlayers(players)
        }
    }catch(error){
        return error;
    }
}

 async function filterHasBirthDatePlayers(year:String,teamMate:String){
    const players = await model.FilterHasBirthDatePlayers(year,teamMate);    
    view.RenderPlayers(players)
}

 function getPlayerByTeamAndYear(callback:Function){
    const teamName = document.querySelector('#team-name') as HTMLInputElement;
    const year = document.querySelector('#year-player') as HTMLInputElement;    
    callback(year.value,teamName.value);
}


 async function addPlayer(player:Player):Promise<Player |Object>{
    const newPlayer= await model.addPlayerTeam(player);
    return newPlayer;
}
 async function deletePlayer(player:Player):Promise<Player |Object>{
    const deletePlayer= await model.DeletePlayer(player);
    return deletePlayer;
}
 async function getDreamTeam(): Promise<Player |Object>{
    const dreamTeam= await model.GetDreamTeam();
    return dreamTeam;
}
 async function getPlayerStats(player:Player):Promise<PlayerStats |Object>{
    const playerStats= await model.GetPlayerStats(player);
    return playerStats;
}


    function findPlayerPush(thePlayer:any):Player{
    const firstName= $(thePlayer).closest(".card-body").find(".card-first-name").text()
    const lastName= $(thePlayer).closest(".card-body").find(".card-last-name").text()
    const jersyNumber= $(thePlayer).closest(".card-body").find(".card-jersy").text()
    const position= $(thePlayer).closest(".card-body").find(".card-position").text()   
    const birthDate= $(thePlayer).closest(".card-body").find(".card-birth-date").text()
    const dreamTeam= $(thePlayer).closest(".card-body").find(".card-dream-team").text()
    const image= $(thePlayer).closest(".card").find("#image-Player").prop('src')
    const dreamTeamIn = dreamTeam === 'true';
    const player:Player = new Player(firstName+lastName,firstName,lastName,jersyNumber,position,birthDate,dreamTeamIn,image);
    
    return player;   
}

function addListners(){
    $('#get-team').on('click',function(){
        getPlayerByTeamAndYear(getPlayers);
    })

    $('#HasBirthDate').on('click',()=>{
        const checkbox = document.getElementById('HasBirthDate',) as HTMLInputElement | null;
          if (checkbox?.checked) {
            getPlayerByTeamAndYear(filterHasBirthDatePlayers);    
          }else{
            getPlayerByTeamAndYear(getPlayers);
          }  
    })

    $('body').on('click','#AddPlayer',function(){       
        const player:Player = findPlayerPush($(this))
        let playerNewPromise = addPlayer(player)  
        playerNewPromise.then(()=>{        
            $(this).hide();
        })
    })
    
    $('body').on('click','#DeletePlayer',function(){
       const player:Player = findPlayerPush($(this));
       let playerNewPromise = this.deletePlayer(player)  
       playerNewPromise.then(()=>{ 
            let playerNewPromise = this.getDreamTeam()
            playerNewPromise.then((value: any)=>{             
                this._view.RenderPlayers(value)     
                $('.btn-outline-danger').show();        
            })         
             
        })
    })
    
    $('#dream-team-get').on('click',(function(){
        let playerNewPromise = getDreamTeam()    
        playerNewPromise.then((value)=>{   
            view.RenderPlayers(value)
            $('#delete-player').show();     
            $(".hide-dream-team").hide();
            $('.show-in-dreamteam').show();     
        
        })
    }))    
    
    $('body').on('click','#StatusPlayer',function(){
        const player:Player = this.findPlayerPush($(this));   
        let playerStatsPromise= this.getPlayerStats(player)  
        playerStatsPromise.then((value: any)=>{
            view.RenderPlayerStats(value);
             
        })
    
    })
}

