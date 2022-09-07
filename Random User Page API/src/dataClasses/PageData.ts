class PageData{
    private user:User;
    private friends:User[];
    private pokemon:Pokemon;
    private quote:string;
    private about:string;
     constructor(user:User,friends:User[],pokemon:Pokemon,quote:string,about:string){
        this.user=user;
        this.friends=friends;
        this.pokemon=pokemon;
        this.quote=quote;
        this.about=about;
     }
     getUser(){       
        return this.user;
    }
    getFriends(){       
        return this.friends;
    }
    getPokemon(){       
        return this.pokemon;
    }
    getQuote(){       
        return this.quote;
    }
    getAbout(){       
        return this.about;
    }
}