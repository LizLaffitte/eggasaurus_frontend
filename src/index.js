const dinosEndp = 'http://localhost:3000/api/v1/dinos'
document.addEventListener("DOMContentLoaded", () => {
    getDinos()
})

function getDinos(){
    fetch(dinosEndp)
    .then(response => response.json())
    .then(dinos => {
        dinos.data.forEach(dino => {
            const newDino = new Dino(dino)
            document.getElementById("dino-egg").innerHTML += newDino.createDinoDiv()
            moodListeners()
        })
    })
}

function moodListeners(){
    document.getElementById("care-btns").childNodes.forEach(btn => {
        btn.addEventListener("click", (e) => {
            console.log(e.target)

        })
    })
}

