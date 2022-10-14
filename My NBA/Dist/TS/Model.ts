class Model{
   public async GetPlayers(year:String,teamMate:String):Promise<Player[] | Object | Error >{     
        let playersArr:Player[]=[]; 
        try{            
            const urlGetPlayers = `/players/?team_name=${teamMate.toLowerCase( )}&year=${year}`  
            const getPlayers = await $.get(urlGetPlayers)
            const players = JSON.parse(getPlayers)
            playersArr = await this.createPlayers(players);
            const dreamTeam = await this.GetDreamTeam();
            let inDreamTeam:any;
            playersArr.forEach((player:any)=>{
                if(Array.isArray(dreamTeam)){
                    inDreamTeam=dreamTeam.filter(dreamTeamPlayer => dreamTeamPlayer.id.trim() === player.id.trim())
                }
                if(inDreamTeam.length>0){
                    player.DreamTeam=true;     
                }
            })         
            return (playersArr)       
        } catch(err){
            return {err:err}
        }  
        

    }


     public async GetDreamTeam():Promise<Player [] | Object> {                                 
        let dreamTeam;        
        try{
                const urlGetDreamTeam = `/playersDream/`;                  
                dreamTeam= await $.get(urlGetDreamTeam)
                const players_json:Player[] = JSON.parse(dreamTeam);     
                const players:Promise<Player[]> = this.createPlayerDreamTeam(players_json);               
                return players;             
        } catch(err){
            return {err:err}
        }  
        
    }


    public async FilterHasBirthDatePlayers(year:String,teamMate:String):Promise<Player[] | Object>{     
        const playersFilter:Player[] | Object=await this.GetPlayers(year,teamMate);
        let playersHasBirth:Player[]=[]
        if(Array.isArray(playersFilter)){
            playersHasBirth = playersFilter.filter(player => player.HasBirthDate!=="")    
        }
        return playersHasBirth;
    }

    
    async createPlayers(playersArr:any):Promise<Player[]>{
        const players:Player[]=[];   
            playersArr.forEach((element:any) => {    
                const nameArr:String = element.name.split(' ');    
                const firstName = nameArr[0];
                const lastName = nameArr[1];                          
                let image = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;
                players.push(new Player(element.name,firstName,lastName,element.jersey,element.pos,element.dateOfBirthUTC,false,image))
            });
        
        return players; 
    }


    async createPlayerDreamTeam(players:Player[]):Promise<Player[]>{
        const playersArr:Player[]=[];   
        players.forEach((player:Player) => {
            let image:String=`https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`
            playersArr.push(new Player(player.id,player.firstName,player.lastName,player.jerseyNumber,player.position,player.birthDate,true,image))
        });
        return playersArr;
    }

    
    async addPlayerTeam(player:Player):Promise<Player | Object> {                                 
        let newPlayerResponse: string;   
        try{
            newPlayerResponse= await $.post({
                url: "/player/",
                type: "post",
                async: false,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    player
                })              
    
            }) 
            const players = JSON.parse(newPlayerResponse);            
            const newPlayer =  this.createPlayerDreamTeam([players])            
              
            return newPlayer;          
        } catch(err){
            return {err:err}
        }  
        
    }


    public async DeletePlayer(player:Player):Promise<Player | Object> {                                 
        let newPlayer:string;      
        try{           
                newPlayer= await $.ajax({
                    url: `/player/${player["_id"]}`,
                    type: "DELETE",
                    async: false,
                    dataType: "json",
                    contentType: "application/json",                            
        
                })  
                
                return newPlayer;             
        } catch(err){
            return {err:err}
        }  
    }

    public async GetPlayerStats(player:Player):Promise<PlayerStats|Object> {                                 
        try{  
            const getPlayerStats =`https://nba-players.herokuapp.com/players-stats/${player.lastName}/${player.firstName}`;
            const data= await $.get(getPlayerStats)
            return new PlayerStats(data["team_name"],data["steals_per_game"],data["three_point_percentage"],data["games_played"],data["player_efficiency_rating"],data["name"]);             
        } catch(err){
            return {err:err}
        }     
    }
}