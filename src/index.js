const dinosEndp = 'http://localhost:3000/api/v1/dinos'
document.addEventListener("DOMContentLoaded", () => {
    hatchListener()
    getDinos()
})

function hatchListener(){
    document.getElementById("hatch").addEventListener("click", (e) => {
        e.target.style.display = "none"
        speciesOptions()
        document.getElementById("form-container").style.display = "block"
        
    })
    document.getElementById("new-dino-form").addEventListener("submit", (e) =>{
        e.preventDefault()
    })
}

function speciesOptions(){
    let speciesHtml = ""
    Dino.all.forEach(dino =>{
        speciesHtml += `
            <option value="${dino._species}">${dino._speciesName}</option>
        `
    document.getElementById("species").innerHTML += speciesHtml
    })
}
function getDinos(){
    fetch(dinosEndp)
    .then(response => response.json())
    .then(dinos => {
        dinos.data.forEach(dino => {
            const newDino = new Dino(dino)
            document.getElementById("dino-egg").innerHTML += newDino.createDinoDiv()
            moodListeners()
            saveListener()
        })
    })
}

function moodListeners(){
    document.getElementById("care-btns").childNodes.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const thisDino = Dino.findDino(e.target.dataset.id)
            if(e.target.id == "play"){
                thisDino.play()
                console.log(thisDino.happiness)
            } else if(e.target.id == "feed"){
                thisDino.feed()
            } else if(e.target.id == "nap"){
                thisDino.nap()
            }

        })
    })

}

function saveListener(){
    document.getElementById("save").addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        const dino = Dino.findDino(id);
        const happiness = dino.happiness
        const hunger = dino.hunger
        const tiredness = dino.tiredness
        const bodyJSON = {happiness, hunger, tiredness};
        updateDino(id, bodyJSON)
    })
    
}
function updateDino(id, bodyJSON){
    fetch(`${dinosEndp}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(bodyJSON),
      })
        .then(res => res.json())
        .then(updatedDino => console.log(updatedDino));
}