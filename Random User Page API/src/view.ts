
class Render{
    userData:any []=[];

    getUserData(){       
        return this.userData;
    }

    renderTemplate(handleBarTemplate:string,objectKind:any,cssClass:string){           
        const source = $(handleBarTemplate).html();
        const template = Handlebars.compile(source)
        const newHTML = template({object:objectKind})
        $(cssClass).empty();      
        $(cssClass).append(newHTML);       
    }


    renderMainUser(user:User |Object){   
       this.renderTemplate(HandleBarTemplate.User,user,CssTemplate.User)
       this.userData.push(user)
    }

    renderUserFriends(userFriends:User[] |Object){
        this.renderTemplate(HandleBarTemplate.Friends,userFriends,CssTemplate.Friends)
        this.userData.push(userFriends)
    }

    renderPokemon(pokemon:Pokemon |Object){
        this.renderTemplate(HandleBarTemplate.Pokemon,pokemon,CssTemplate.Pokemon) 
        this.userData.push(pokemon)
    }

    renderQuote(quote:string |Object){
       this.renderTemplate(HandleBarTemplate.Quote,quote,CssTemplate.Quote)  
       this.userData.push(quote) 
    }

    renderAboutMe(aboutMe:string |Object){
        this.renderTemplate(HandleBarTemplate.Friends,aboutMe,CssTemplate.Friends)   
        this.userData.push(aboutMe)
    }

   
    
}

enum CssTemplate{
    User = '.user-container',// '.header',
    Friends = '.friends-container', //SectionOfUserFriends
    Pokemon = '.pokemon-container', //partMainPockimon
    Quote = '.quote-container', // partMainQuote
    About  = '.about-container', // partMainbackonText
  }
  enum HandleBarTemplate{
    User = "#user-template" ,
    Friends = "#friends-template" ,
    Pokemon = "#pokemon-template" ,
    Quote = "#quote-template" ,
    About= "#about-template" ,
  }