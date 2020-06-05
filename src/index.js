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
                console.log(thisDino.hunger)
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
        const bodyJSON = {happiness, hunger };
        fetch(`${dinosEndp}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(bodyJSON),
        })
          .then(res => res.json())
          // our backend responds with the updated note instance represented as JSON
          .then(updatedDino => console.log(updatedDino));
      
    })
    
}
