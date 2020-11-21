class User {
    constructor(userData) {
      this.id = userData.id
      this.username = userData.username
      this.score = parseInt(userData.score)
      this.scoreInt = 5000
    User.currentUser = this
    }

    get dinos() { 
       return Dino.all.filter(dino => dino.owner_id == this.id)
    }

    scoreKeeper(dino){
        if(dino.hunger > 0 && dino.happiness > 0 && dino.tiredness > 0){
            this.score += 1
            document.getElementById("score-display").innerText = this.score

        }
    }

 


    dinoList() {
        let list = `<ul>`
        if(this.dinos.length > 0){
            this.dinos.map(dino =>{
                list += `<li>${dino.name} | <a href="#" class="other-dinos" data-id="${dino.id}">Play</a></li>`
            })
        }
        list += `</ul>`
        return list
    }
        
  }
  
