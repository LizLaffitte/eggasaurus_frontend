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
    moodPx(moodValue){
        return (moodValue).toString(10) + "px"
    }
    get hungerPx(){
        return this.moodPx(this.hunger)
    }

    get happinessPx(){
        return this.moodPx(this.happiness)
    }

    

    feed(){
        if(this.hunger > 33){
            this.hunger -= 33
            let hungerMeter = document.getElementById("hunger")
            hungerMeter.style.backgroundPosition = `0px ${this.hungerPx}`
        }
    }

    play(){
        if(this.happiness > 33){
            this.happiness -= 33
            let happinessMeter = document.getElementById("happiness")
            happinessMeter.style.backgroundPosition = `183px ${this.happinessPx}`
        }
    }
    
    createDinoDiv(){
        return `
            <div data-id=${this.id}>
                <h2>${this.name}</h2>
                <h3>${this._species}</h3>
                <div id="levels">
                    <div id="hunger" style="background-position-y:${this.hunger.toString(10)}px;"></div>
                    <div id="tiredness" style="" ></div>
                    <div id="happiness" style="background-position-y:${this.happiness.toString(10)}px;"></div>
                </div>
                <img src="${this._images}" />
                <div id="care-btns">
                    <button id="feed" data-id="${this.id}">Feed</button><button id="nap" data-id="${this.id}">Nap</button><button id="play" data-id="${this.id}">Play</button>
                </div>
            </div>
            <button id="save" data-id="${this.id}">Save</button>`
            
    
    }

    static findDino(id){
        return this.all.find(dino => dino.id == id)
    }
  
  }
  
  Dino.all = [];