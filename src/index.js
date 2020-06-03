const dinosEndp = 'http://localhost:3000/api/v1/dinos'
const trexImg = '/trex_color.png'
document.addEventListener("DOMContentLoaded", () => {
    getDinos()
})

function getDinos(){
    fetch(dinosEndp)
    .then(response => response.json())
    .then(dinos => {
        dinos.data.forEach(dino => {
           createDinoDiv(dino)
        })
    })
}

function createDinoDiv(dino){
    const dinoEgg = document.getElementById("dino-egg")
    const dinoDiv = 
        `<div data-id=${dino.id}>
            <h2>${dino.attributes.name}</h2>
            <h3>${dino.attributes.specie.name}</h3>
            <img src="${dino.attributes.specie.sprite_url}" />
            <div id="care-btns">
                <button id="feed" data-id=${dino.id}>Feed</button><button id="Nap" data-id=${dino.id}>Nap</button><button id="play" data-id=${dino.id}>Play</button>
            </div>
        </div>`
    dinoEgg.innerHTML += dinoDiv

}