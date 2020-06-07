class Specie {
    constructor(speciesData) {
      this.id = speciesData.id
      this.name = speciesData.attributes.name
      Specie.all.push(this)
    }
  }
  
  Specie.all = [];