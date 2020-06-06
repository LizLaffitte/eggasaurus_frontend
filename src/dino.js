class Dino {
    constructor(dinoData) {
      this.id = dinoData.id
      this.name = dinoData.attributes.name
      this._species = dinoData.attributes.specie.id
      this._speciesName = dinoData.attributes.specie.name
      this._images = "images/" + dinoData.attributes.specie.sprite_url
      this.happiness = dinoData.attributes.happiness
      this.hunger = dinoData.attributes.hunger      
      this.tiredness = dinoData.attributes.tiredness
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
    get tiredPx(){
        return this.moodPx(this.tiredness)
    }

    feed(){
        if(this.hunger > 33){
            this.hunger -= 33
            const hungerMeter = document.getElementById("hunger")
            hungerMeter.style.backgroundPosition = `0px ${this.hungerPx}`
        }
    }
    play(){
        if(this.happiness > 33){
            this.happiness -= 33
            this.adjustHappinessMeter()
        }
    }
    nap(){
        if(this.tiredness > 33){
            this.tiredness -= 33
            const napMeter = document.getElementById("tiredness")
            napMeter.style.backgroundPosition = `183px ${this.tiredPx}`
        }
    }

    adjustHappinessMeter(){
        const happinessMeter = document.getElementById("happiness")
        happinessMeter.style.backgroundPosition = `367px ${this.happinessPx}`
    }
    
    createDinoDiv(){
        return `
            <div data-id=${this.id}>
                <h2>${this.name}</h2>
                <h3>${this._speciesName}</h3>
                <div id="levels">
                    <div id="hunger" style="background-position-y:${this.hungerPx};"></div>
                    <div id="tiredness" style="background-position-y:${this.tiredPx};" ></div>
                    <div id="happiness" style="background-position-y:${this.happinessPx};"></div>
                </div>
                <img src="${this._images}" id="dino" />
                <div id="care-btns">
                    <button id="feed" data-id="${this.id}">Feed</button><button id="nap" data-id="${this.id}">Nap</button><button id="play" data-id="${this.id}">Play</button>
                </div>
            </div>
            <button id="save" data-id="${this.id}">Save</button>`
    }
// Every 2 seconds, check levels, if they aren't 659, add to the moods
    sad() { 
        if(this.happiness < 659){
            this.happiness += 33
            this.adjustHappinessMeter()
        }
    }
    static measureMoods(){
        this.all.forEach(dino => {
            if(dino.happiness != 659){
                dino.sad()
            }
        })
    }
    static findDino(id){
        return this.all.find(dino => dino.id == id)
    }
  
  }
  
  Dino.all = [];