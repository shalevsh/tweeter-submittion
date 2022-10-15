const model : Model =new Model();
const view: View = new View();
addListners();

 async function getPlayers(year:String,teamMate:String) {
    try{       
        const players= await model.GetPlayers(year,teamMate); 
        if(!Array.isArray(players)){
            $("#project-id-select-error").html("there is an error in your team or year").addClass("error-msg"); 
        }else{       
            view.RenderPlayers(players)
        }
    }catch(error){
        return error;
    }
}

 async function filterBirthDatePlayers(year:String,teamMate:String){
    const players = await model.FilterBirthDatePlayers(year,teamMate);    
    view.RenderPlayers(players)
}

 function getPlayerByTeamAndYear(callback:Function){
    const teamName = document.querySelector('#team-name') as HTMLInputElement;
    const year = document.querySelector('#year-player') as HTMLInputElement;    
    callback(year.value,teamName.value);
}


 async function addPlayer(player:Player):Promise<Player |Object>{
    const newPlayer= await model.AddPlayerToDreamTeam(player);
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


    function getPlayerDetailsFromCardHtml(playerCardElement:JQuery<any>):Player{
    const firstName= $(playerCardElement).closest(".card-body").find(".card-first-name").text()
    const lastName= $(playerCardElement).closest(".card-body").find(".card-last-name").text()
    const jersyNumber= $(playerCardElement).closest(".card-body").find(".card-jersy").text()
    const position= $(playerCardElement).closest(".card-body").find(".card-position").text()   
    const dreamTeam= $(playerCardElement).closest(".card-body").find(".card-dream-team").text()
    const image= $(playerCardElement).closest(".card").find("#image-player").prop('src')
    const dreamTeamIn = dreamTeam === 'true';
    const player:Player = new Player(`${firstName}${lastName}`,firstName,lastName,jersyNumber,position,"",dreamTeamIn,image);
    return player;   
}

function addListners(){
    $("#birth-date").prop( "disabled", true );
    $("#get-team").prop( "disabled", true );
    $("#get-dream-team").prop( "disabled", true );

    $('#get-team').on('click',function(){
        getPlayerByTeamAndYear(getPlayers);
    })

    $('#birth-date').on('click',()=>{
        const checkbox = document.getElementById('birth-date',) as HTMLInputElement | null;
          if (checkbox?.checked) {
            getPlayerByTeamAndYear(filterBirthDatePlayers);    
          }else{
            getPlayerByTeamAndYear(getPlayers);
          }  
    })

    $('body').on('click','#add-player',function(){       
        const player:Player = getPlayerDetailsFromCardHtml($(this))
        let playerNewPromise = addPlayer(player)  
        playerNewPromise.then(()=>{        
            $(this).hide();
        })
    })
    
    $('body').on('click','#delete-player',function(){
       const player:Player = getPlayerDetailsFromCardHtml($(this));
       let playerNewPromise = this.deletePlayer(player)  
       playerNewPromise.then(()=>{ 
            let playerNewPromise = this.getDreamTeam()
            playerNewPromise.then((value: any)=>{             
                this.view.RenderPlayers(value)     
                $('.btn-outline-danger').show();        
            })         
             
        })
    })
    
    $('#get-dream-team').on('click',(function(){
        let playerNewPromise = getDreamTeam()    
        playerNewPromise.then((value)=>{   
            view.RenderPlayers(value)
            $('#delete-player').show();     
            $(".hide-dream-team").hide();
            $('.show-in-dreamteam').show();     
        
        })
    }))    
    
    $('body').on('click','#stats-player',function(){
        window.scrollTo(0,0);
        const player:Player = getPlayerDetailsFromCardHtml($(this));   
        let playerStatsPromise= getPlayerStats(player)  
        playerStatsPromise.then((value: any)=>{
            view.RenderPlayerStats(value);            
        })
       
    })
    $('#team-name').on("blur",function(){
        $("#get-team").prop( "disabled", false );
    });

}
