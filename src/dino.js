class Dino {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      Dino.all.push(this);
    }
  
  }
  
  Dino.all = [];