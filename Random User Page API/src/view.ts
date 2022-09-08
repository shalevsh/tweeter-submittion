
class Render{
    userData:any []=[];

    getUserData(){       
        return this.userData;
    }

    renderTemplate(handleBarTemplate:string,objectKind:any,htmlContainer:string){           
        const source = $(handleBarTemplate).html();
        const template = Handlebars.compile(source)
        const newHTML = typeof objectKind ==="string"? template({text:objectKind}): template({object:objectKind})
        $(htmlContainer).empty();      
        $(htmlContainer).append(newHTML);       
    }


    renderMainUser(user:User |Object){   
       this.renderTemplate(HandleBarTemplate.User,user,Container.User)
       this.userData.push(user)
    }

    renderUserFriends(userFriends:User[] |Object){
        this.renderTemplate(HandleBarTemplate.Friends,userFriends,Container.Friends)
        this.userData.push(userFriends)
    }

    renderPokemon(pokemon:Pokemon |Object){
        this.renderTemplate(HandleBarTemplate.Pokemon,pokemon,Container.Pokemon) 
        this.userData.push(pokemon)
    }

    renderQuote(quote:string |Object){
       this.renderTemplate(HandleBarTemplate.Quote,quote,Container.Quote)  
       $(".quote-content").text(`${quote}`);
       this.userData.push(quote) 
    }

    renderAboutMe(aboutMe:string |Object){
        this.renderTemplate(HandleBarTemplate.About,aboutMe,Container.About)   
        this.userData.push(aboutMe)
    }
}

enum Container{
    User = '.user-container',
    Friends = '.friends-container', 
    Pokemon = '.pokemon-container', 
    Quote = '.quote-container', 
    About  = '.about-container', 
  }
  enum HandleBarTemplate{
    User = "#user-template" ,
    Friends = "#friends-template" ,
    Pokemon = "#pokemon-template" ,
    Quote = "#quote-template" ,
    About= "#about-template" ,
  }