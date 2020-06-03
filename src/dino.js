class Dino {
    constructor(dinoData) {
      this.id = dinoData.id
      this.name = dinoData.attributes.name
      this.species = dinoData.attributes.specie.name
      this.images = dinoData.attributes.specie.sprite_url
      Dino.all.push(this)
    }

    renderDinoDiv(){
        return `
            <div data-id=${this.id}>
                <h2>${this.name}</h2>
                <h3>${this.species}</h3>
                <img src="${this.images}" />
                <div id="care-btns">
                    <button id="feed" data-id=${this.id}>Feed</button><button id="Nap" data-id=${this.id}>Nap</button><button id="play" data-id=${this.id}>Play</button>
                </div>
            </div>`
    
    }
  
  }
  
  Dino.all = [];