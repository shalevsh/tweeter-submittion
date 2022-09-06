
export default class moduleData{
    users=[];
    quote=""
    aboutMe=""
    pokemon = null


    async getRandomUsers(){
    await fetch('https://randomuser.me/api/?results=5000')
      .then((response) => response.json())
      .then((data) => console.log(data));
    }
    
    
    
    }
    interface Person {
        name : string;
        age : number;
        isCat : boolean;
    }
    
    interface PersonNameOnly {
        name : string;
    }

    
    // arr.forEach((p:PersonNameOnly)=>{console.log(p.name)})
    // fetch('https://randomuser.me/api/?results=7')
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));