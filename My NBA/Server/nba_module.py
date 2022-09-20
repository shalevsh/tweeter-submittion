from fastapi import FastAPI
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

word_counter = {"name": 4, "inventory": 9, "price": 5}


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/sanity/")
async def check_server():
    return {"hello": "world"}


@app.get("/wordCounter/{word_name}")
async def get_count(word_name):
    return {"count": word_counter.get(word_name,0)}

@app.post("/wordCounter/",status_code=201)
async def post_word(request):
    new_word = await request.json()
    for key in new_word.keys():
        if word_counter.get(key)!= None:
            word_counter[key]+=1
        word_counter.setdefault(new_word,0)
        
    count = word_counter[key]
    return {f"text":"Added {key}","currentCount":"{count}"}



if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
