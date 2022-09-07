
const NUMBER_OF_POKEMONS = 949;
class moduleData<Type>{
    users:User[]=[];
    quote="";
    aboutMe=""
    pokemon:Pokemon=new Pokemon("","");

    
     fetchData():Promise<PageData>{
        return Promise.all([this.getRandomUsers(), this.getQuote(), this.getPokemon(), this.getAboutMe()])
            .then(() => {
                return new PageData(this.users[0], this.users.slice(1), this.pokemon, this.quote, this.aboutMe);
            });
    }


    async getRandomUsers(){
        return await fetch('https://randomuser.me/api/?results=7')
          .then((response) => response.json())
          .then((data) => {
           let arrayOfUsers = data.results;
           arrayOfUsers.forEach((user: any)=>{ 
            this.users.push(
                new User(
                user.name.first,
                user.name.last,
                user.location.city,
                user.location.state,
                user.picture.medium
                )
                )
            })
        })
    }
    async getQuote(){
        return await fetch('https://api.kanye.rest')
        .then((response) => response.json())
        .then((data)=>this.quote = data.quote)
    }
    
    async getPokemon(){
        const pokemonId = Math.floor(Math.random() * NUMBER_OF_POKEMONS)+1;
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then((response) => response.json())
        .then((data)=> this.pokemon=new Pokemon(data.name,data.sprites.front_default));
    }
    async getAboutMe(){
        return await fetch('https://baconipsum.com/api/?type=meat-and-filler')
        .then((response) => response.json())
        .then((data)=>this.aboutMe = data[0])
    }
}
    
    