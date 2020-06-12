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
      this.owner_id = dinoData.attributes.user_id
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
            this.adjustHungerMeter()
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
            this.adjustTirednessMeter()
        }
    }

    hungry(){
        if(this.hunger < 659){
            this.hunger += 33
            this.adjustHungerMeter()
        }
    }

    bored() { 
        if(this.happiness < 659){
            this.happiness += 33
            this.adjustHappinessMeter()
        }
    }

    tired() { 
        if(this.tiredness < 659){
            this.tiredness += 33
            this.adjustTirednessMeter()
        }
    }

    adjustHungerMeter(){
        const hungerMeter = document.getElementById("hunger")
        hungerMeter.style.backgroundPosition = `0px ${this.hungerPx}`
    }

    adjustHappinessMeter(){
        const happinessMeter = document.getElementById("happiness")
        happinessMeter.style.backgroundPosition = `367px ${this.happinessPx}`
    }

    adjustTirednessMeter(){
        const napMeter = document.getElementById("tiredness")
        napMeter.style.backgroundPosition = `183px ${this.tiredPx}`
    }
    
    createDinoDiv(){
        return `
                <h2>${this.name}</h2>
                <h3>${this._speciesName}</h3>
                <div id="levels">
                    <div id="hunger" style="background-position-y:${this.hungerPx};"></div>
                    <div id="tiredness" style="background-position-y:${this.tiredPx};" ></div>
                    <div id="happiness" style="background-position-y:${this.happinessPx};"></div>
                </div>
                <img src="${this._images}" id="dino" />
                <div id="care-btns">
                    <img id="feed" data-id="${this.id}" src="images/feed.jpg" /><img id="nap" data-id="${this.id}" src="images/nap.jpg" /><img id="play" data-id="${this.id}" src="images/play.jpg" />
                </div>
                <div>
                    <button id="save" data-id="${this.id}">Save</button><button id="delete" data-id="${this.id}">Delete</button>
                </div>`
    }

    measureMoods(){
        if(this.hunger != 659){
            this.hungry()
        }
        if(this.happiness != 659){
            this.bored()
        }
        if(this.tiredness != 659){
            this.tired()
        }
    }
    static findDino(id){
        return this.all.find(dino => dino.id == id)
    }
  
  }
  
  Dino.all = [];