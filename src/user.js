class User {
    constructor(userData) {
      this.id = userData.id
      this.username = userData.username
      
    User.currentUser = this
    }

    dinos() { 
       return Dino.all.filter(dino => dino.owner_id == this.id)
    }
        
  }
  
