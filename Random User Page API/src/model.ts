
class moduleData<Type>{
    users:Type[]=[];
    quote="";
    aboutMe=""
    pokemon=null;

    
    async fetchData(){
        await this.getRandomUsers();
    }
    async getRandomUsers(){
        return await fetch('https://randomuser.me/api/?results=5000')
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            this.users.push(data);
          });
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