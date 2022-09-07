const module = new moduleData();
const render = new Render();

$("#generate-brn" ).on( "click",async function() {
    await module.fetchData().then((data:PageData)=>{
        console.log(data,"data");
        render.renderMainUser(data.getUser());
        render.renderUserFriends(data.getFriends());
        render.renderPokemon(data.getPokemon());
        render.renderQuote(data.getQuote());
        render.renderAboutMe(data.getAbout());
    });
});
