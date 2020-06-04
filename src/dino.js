class Dino {
    constructor(dinoData) {
      this.id = dinoData.id
      this.name = dinoData.attributes.name
      this._species = dinoData.attributes.specie.name
      this._images = "images/" + dinoData.attributes.specie.sprite_url
      this.happiness = dinoData.attributes.happiness
      this.hunger = dinoData.attributes.hunger      
      Dino.all.push(this)
    }
    
    play(){
        this.happiness += 5
        
    }
    feed(){
        this.hunger += 5
        this.decreasehungerMeterYPosition()
        console.log(this.hungerMeterYPosition)
    }
    get hungerMeterYPosition(){
        let hungerMeter = document.getElementById("hunger")
        let hungerMeterStyle = window.getComputedStyle(hungerMeter)
        return parseInt(hungerMeterStyle.getPropertyValue("background-position-y").split("px")[0])
    }

    

    decreasehungerMeterYPosition(){
        if(this.hungerMeterYPosition > 0){
            let newPos = (this.hungerMeterYPosition - 33).toString(10) + "px"
            let hungerMeter = document.getElementById("hunger")
            hungerMeter.style.backgroundPosition = `0px ${newPos}`
        } else {
            hungerMeter.style.backgroundPosition = `0px 0px`
        }
    }

    createDinoDiv(){
        return `
            <div data-id=${this.id}>
                <h2>${this.name}</h2>
                <h3>${this._species}</h3>
                <div id="levels">
                    <div id="hunger"></div>
                    <div id="tiredness"></div>
                    <div id="happiness"></div>
                </div>
                <img src="${this._images}" />
                <div id="care-btns">
                    <button id="feed" data-id="${this.id}">Feed</button><button id="nap" data-id="${this.id}">Nap</button><button id="play" data-id="${this.id}">Play</button>
                </div>
            </div>`
    
    }

    static findDino(id){
        return this.all.find(dino => dino.id == id)
    }
  
  }
  
  Dino.all = [];