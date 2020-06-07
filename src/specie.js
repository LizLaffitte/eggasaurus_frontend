class Specie {
    constructor(speciesData) {
      this.id = speciesData.id
      this.name = speciesData.attributes.name
      Specie.all.push(this)
    }

    static buildOptions(){
        let optionsHtml = ``
        this.all.map(specie =>{
            optionsHtml += `<option value="${specie.id}">${specie.name}</option>`
        })
        return optionsHtml
    }
  }
  
  Specie.all = [];