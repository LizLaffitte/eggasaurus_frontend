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
    moodP(moodValue){
        return (moodValue).toString(10) + "%"
    }
    get hungerP(){
        return this.moodP(this.hunger)
    }
    get happinessP(){
        return this.moodP(this.happiness)
    }
    get tiredP(){
        return this.moodP(this.tiredness)
    }

    feed(){
        if(this.hunger <= 95){
            this.hunger += 5
        } else {
            this.hunger = 100
        }
        this.adjustHungerMeter()
    }
    play(){
        if(this.happiness <= 95){
            this.happiness += 5
        }else {
            this.hunger = 100
        }
        this.adjustHappinessMeter()
    }
    nap(){
        if(this.tiredness < 100){
            this.tiredness += 5
            this.adjustTirednessMeter()
        }
    }

    hungry(){
            this.hunger -= 0.5
            this.adjustHungerMeter()
    }

    bored() { 
            this.happiness -= 0.5
            this.adjustHappinessMeter()
    }

    tired() { 
        if(this.tiredness < 659){
            this.tiredness -= 33
            this.adjustTirednessMeter()
        }
    }

    adjustHungerMeter(){
        const hungerMeter = document.getElementById("hunger-meter")
        hungerMeter.style.width = this.hungerP
    }

    adjustHappinessMeter(){
        const happinessMeter = document.getElementById("happiness-meter")
        happinessMeter.style.width = this.happinessP
    }

    adjustTirednessMeter(){
        const napMeter = document.getElementById("tiredness")
        napMeter.style.backgroundPosition = `183px ${this.tiredPx}`
    }
    //Every second, decrease hunger and adjust width
    //Every click, increase hunger and adjust width
    createDinoDiv(){
        return `
                <div class="meters">
                    <div id="hunger-meter" class="green" style="width:${this.hungerP}">
                        <div class="sprite-holder">
                            <div class="sprite"></div>
                        </div>
                    </div>
                </div>
                <div class="meters">
                <div id="happiness-meter" class="green" style="width:${this.happinessP}">
                    <div class="sprite-holder">
                        <div class="sprite"></div>
                    </div>
                </div>
            </div>
            <div class="meters">
                <div id="tiredness-meter" class="green" style="width:${this.tiredP}">
                    <div class="sprite-holder">
                        <div class="sprite"></div>
                    </div>
                </div>
            </div>
                <h2>${this.name}</h2>
                <h3>${this._speciesName}</h3>
                <img src="${this._images}" id="dino" />
                <div id="care-btns">
                    <div id="feed" data-id="${this.id}"></div><div id="play" data-id="${this.id}"></div><div id="nap" data-id="${this.id}"></div>
                </div>
                <div>
                    <button id="save" data-id="${this.id}">Save</button><button id="delete" data-id="${this.id}">Delete</button><button id="pause">Pause</button
                </div>`
    }

    decreaseMoods(){
        if(this.hunger > 0){
            this.hungry()
        }
        if(this.happiness > 0){
            this.bored()
        }
    }
    static findDino(id){
        return this.all.find(dino => dino.id == id)
    }
  
  }
  
  Dino.all = [];