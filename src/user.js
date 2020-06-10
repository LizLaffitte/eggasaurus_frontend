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
        let list = document.createElement("ul")
        if(this.dinos.length > 1){
            this.dinos.map(dino =>{
                debugger
                const item = document.createElement("li")
                item.innerText = dino.name
                list.appendChild(item)
            })
        }
        return list
    }
        
  }
  
