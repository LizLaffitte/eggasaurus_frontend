class Dino {
    constructor(dinoData) {
      this.id = dinoData.id
      this.name = dinoData.attributes.name
      this.species = dinoData.attributes.specie.name
      this.images = dinoData.attributes.specie.sprite_url
      Dino.all.push(this)
    }
  
  }
  
  Dino.all = [];