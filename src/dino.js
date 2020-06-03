class Dino {
    constructor(dinoData) {
      this.id = dinoData.id
      this.name = dinoData.attributes.name
      this._species = dinoData.attributes.specie.name
      this._images = dinoData.attributes.specie.sprite_url
      this.happiness = dinoData.attributes.happiness
      Dino.all.push(this)
    }

    // get happiness(){
    //     return this.happiness
    // }

    // set happiness(num){
    //     this.happiness = happiness
    // }
    renderDinoDiv(){
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
                    <button id="feed" data-id="${this.id}">Feed</button><button id="Nap" data-id="${this.id}">Nap</button><button id="play" data-id="${this.id}">Play</button>
                </div>
            </div>`
    
    }
  
  }
  
  Dino.all = [];