class User {
    constructor(userData) {
      this.id = userData.id
      this.username = userData.username
      
    User.currentUser = this
    }

    get dinos() { 
       return Dino.all.filter(dino => dino.owner_id == this.id)
    }

    dinoList() {
        let list = `<ul>`
        if(this.dinos.length > 0){
            this.dinos.map(dino =>{
                list += `<li>${dino.name}</li>`
            })
        }
        list += `</ul>`
        return list
    }
        
  }
  
