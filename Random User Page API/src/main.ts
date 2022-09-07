const module = new moduleData();
const render = new Render();

$("#generate-brn" ).on( "click", function() {
        module.fetchData().then((data:PageData)=>{
        render.renderMainUser(data.getUser());
        render.renderUserFriends(data.getFriends());
        render.renderPokemon(data.getPokemon());
        render.renderQuote(data.getQuote());
        render.renderAboutMe(data.getAbout());
    });
});
