const dinosEndp = 'http://localhost:3000/api/v1/dinos'

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
    let name = dino.attributes.name
    let dinoDiv = document.createElement("div")
    dinoDiv.id = dino.id
    let dinoName = document.createElement("h2")
    
    dinoName.innerText = name
    dinoDiv.appendChild(dinoName)
    dinoEgg.appendChild(dinoDiv)
}