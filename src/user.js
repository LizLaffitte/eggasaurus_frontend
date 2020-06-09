class User {
    constructor(userData) {
      this.id = userData.id
      this.username = userData.username
      
    User.currentUser = this
    }

    get dinos() { 
       return Dino.all.filter(dino => dino.owner_id == this.id)
    }

    dinoList(){
        let list = ""
        if(this.dinos.length > 1){
            list = `<ul>`
            this.dinos.map(dino =>{
                list += `<li>${dino.name}</li>`
            })
            list += `</ul>`
        }
        return list
    }
        
  }
  
