const dinosEndp = 'http://localhost:3000/api/v1/dinos'
const speciesEndp = 'http://localhost:3000/api/v1/species'
const signup = 'http://localhost:3000/users'
const loginUrl = 'http://localhost:3000/auth'
let newMoodAdjust
document.addEventListener("DOMContentLoaded", () => {
    getSpecies()
    optionsListener()
    
})

function optionsListener(){
    const options = document.querySelectorAll("div#options div")
    const containers = document.querySelectorAll("div.page")
    options.forEach(option => {
        option.addEventListener("click", (e) => {
            const activeOption = e.target
            const activeContainer = document.getElementById(`${e.target.id}-container`)
            options.forEach(option => option.classList.remove("active"))
            activeOption.classList.add("active")
            containers.forEach(page => hideElement(page))
            showElement(activeContainer)
        })
    })
}

function logoutListener(){
    document.getElementById("logout").addEventListener("click", (e) => {
        saveAllUsersDinos()
        localStorage.clear()
        User.currentUser = ''
        clearInterval(newMoodAdjust)
        renderDinoEgg()
        showElement(document.getElementById("login-form"))
        userFormListeners()
        hideElement(document.getElementById("options"))
        document.querySelectorAll("#details-container div").forEach(div => {
            hideElement(div)
        })
    })
}

function getSpecies(){
    fetch(speciesEndp)
    .then(response => response.json())
    .then(species => {
        species.data.forEach(specie => {
            const newSpecies = new Specie(specie)            
        })
        console.log("Species Loaded")
        getDinos()
    })
}

function getDinos(){
    fetch(dinosEndp)
    .then(response => response.json())
    .then(dinos => {
        dinos.data.forEach(dino => {
            const newDino = new Dino(dino)
        })
        logInCheck()
    })
}

function logInCheck(){
    if(localStorage.id){
        const user = {
            id: parseInt(localStorage.id, 10),
            username: localStorage.username,
            score: localStorage.score 
        }
        const newUser = new User(user)
        if(newUser.dinos.length > 0) {
            const id = User.currentUser.dinos[0].id
            renderUserDino(newUser, id)
        } else {
            renderDinoEgg()
        }
        renderUserDetails(newUser)
        logoutListener()

    } else {
        hideElement(document.getElementById("options"))
        renderDinoEgg()
        userFormListeners()
    }
}

function renderDinoEgg(){
    document.getElementById("dino-egg").innerHTML = `<div><img src="images/dino_egg.jpg" id="egg-sprite" style="width:224px; height:248px;" /></div>`
}

function userFormListeners(){
    const loginForm = document.getElementById("login-form")
    const signupForm = document.getElementById("signup-form")
    showElement(loginForm)
    document.getElementById('signup-link').addEventListener("click", (e) => {
        e.preventDefault()
        hideElement(loginForm)
        showElement(signupForm)
    })
    document.getElementById("login-link").addEventListener("click", (e) => {
        e.preventDefault()
        hideElement(signupForm)
        showElement(loginForm)
    })
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const password_confirmation = e.target.confirm.value
        const bodyData = {username, email, password, password_confirmation}
        createUser(bodyData)
        e.target.reset()
        hideElement(document.getElementById("signup-form"))
    })
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        const bodyData = {username, password}
        loginUser(bodyData)
        e.target.reset()
        logoutListener()
        hideElement(document.getElementById("login-form"))
    })
}

function hideElement(element){
    element.classList.remove("show")
    element.classList.add("hide")
}
function showElement(element){
    element.classList.remove("hide")
    element.classList.add("show")
}
function createUser(bodyData){
    fetch(signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
    .then(res => res.json())
    .then(user => {
        localStorage.setItem('id', user.id);
        localStorage.setItem('username', user.username)
        localStorage.setItem('score', user.score)
        const newUser = new User(user)
        renderDinoEgg()
        showElement(document.getElementById("options"))
        renderUserDetails(newUser)
    })
    .catch(err => console.log(err));
}

function loginUser(bodyData){
    fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
    .then(res => res.json()) 
    .then(resp => {
        if(resp.errors){
            console.log(resp.errors);
            if(resp.errors == "Password incorrect"){
                alert("Password incorrect");
                const loginForm = document.getElementById("login-form")
                showElement(loginForm)
            }
        }
        else if(resp) {
            localStorage.setItem('id', resp.user.id);
            localStorage.setItem('username', resp.user.username)
            localStorage.setItem('score', resp.user.score)
            const newUser = new User(resp.user)
            if(newUser.dinos.length > 0){
                const id = newUser.dinos[0].id
                renderUserDino(newUser, id)
            }else{
                renderDinoEgg()
            }   
            renderUserDetails(newUser)
            showElement(document.getElementById("options"))
        }
    })
    .catch(err => console.log(err));
}

function renderUserDino(user, dinos_id){
    const egg = document.getElementById("dino-egg")
    egg.innerHTML = ''
    if(user.dinos.length > 0){ 
        let dinoDiv = document.createElement("div")
        dinoDiv.setAttribute("id", "current-dino")
        dinoDiv.setAttribute("data-id", dinos_id)
        dinoDiv.innerHTML = Dino.findDino(dinos_id).createDinoDiv()
        document.getElementById("dino-egg").appendChild(dinoDiv)
        moodListeners()
        saveListener()
        clearInterval(newMoodAdjust)
        moodTimer(dinos_id)
        deleteListener()
        scoreTimer(User.currentUser, dinos_id)
    } else {
        renderDinoEgg()
    }
}
function moodTimer(dinoId){
    newMoodAdjust = window.setInterval(() => {Dino.findDino(dinoId).decreaseMoods()}, 1000)
}
function scoreTimer(user, dino_id){
    scoreAdjust = window.setInterval(() => {user.scoreKeeper(Dino.findDino(dino_id))}, 5000)
}

function renderUserDetails(user){
    const stats = document.getElementById("stats-container")
    stats.innerHTML = `<h2>${user.username}</h2>`
    stats.innerHTML += `<p><strong>Dinos:</strong> ${user.dinos.length}</p>`
    stats.innerHTML += `<p><strong>Score:</strong> <span id="score-display">${user.score}</span></p>`
    showElement(stats)
    const dinos = document.getElementById("dinos-container")
    dinos.innerHTML = `<h2>Your Dinos</h2>`
    dinos.innerHTML += user.dinoList()
    playListener()

    const hatch = document.getElementById("hatch-container")
    hatch.innerHTML = ''
    hatch.appendChild(renderDinoForm())
    newDinoListener()
}

function playListener(){
    document.querySelectorAll("a.other-dinos").forEach(dinoLink => {
        dinoLink.addEventListener("click", (e) => {
            console.log(`play ${e.target}`)
            saveCurrentDino()
            clearInterval(newMoodAdjust)
            renderUserDino(User.currentUser, parseInt(e.target.dataset.id,10))
        })
    })
}

function renderDinoForm(){
    const formContainer = document.createElement("div")
    formContainer.setAttribute("id","new-dino-form")
    formContainer.innerHTML = `<h2>Hatch a New Dino</h2>
    <form id="new-dino-form">
        <label for="name-input">Dino Name:</label><br />
        <input type="text"  id="name-input" required>
        <p>Dino Species: </p>
        <select id="species-name" name="species" required>
            ${Specie.buildOptions()}
        </select>
        <br><br>
        <input id='create-button' type="submit" name="submit" value="Hatch Your Egg" class="submit">
    </form>`
    return formContainer
}

function newDinoListener(){
    document.getElementById("new-dino-form").addEventListener("submit", (e) =>{
        console.log("New Dino")
        e.preventDefault()
        const name = document.getElementById("name-input").value
        const specie_id = parseInt(document.getElementById("species-name").value, 10)
        const happiness = 100
        const hunger = 100
        const tiredness = 100
        const user_id = localStorage.id
        const bodyData = {name, happiness, hunger, tiredness, specie_id, user_id}
        createDino(bodyData)
    })
}

function moodListeners(){
    document.getElementById("care-btns").childNodes.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const thisDino = Dino.findDino(e.target.dataset.id)
            if(e.target.id == "play"){
                thisDino.play()
            } else if(e.target.id == "feed"){
                thisDino.feed()
            } else if(e.target.id == "nap"){
                thisDino.nap()
            }
        })
    })

}

function saveListener(){
    document.getElementById("save").addEventListener("click", (e) => {
        saveCurrentDino()
        displayMessage("Your dino is saved!")
    })
}

function saveCurrentDino(){
    const id = parseInt(document.getElementById("current-dino").dataset.id)
    const dino = Dino.findDino(id);
    const name = dino.name
    const happiness = dino.happiness
    const hunger = dino.hunger
    const tiredness = dino.tiredness
    const user_id = dino.owner_id
    const specie_id = dino._species
    const bodyJSON = {name, happiness, hunger, tiredness, user_id, specie_id};
    updateDino(id, bodyJSON)
}

function saveAllUsersDinos(){
    const user = User.currentUser
    user.dinos.forEach(dino => {
        const id = dino.id
        const name = dino.name
        const happiness = dino.happiness
        const hunger = dino.hunger
        const tiredness = dino.tiredness
        const user_id = dino.owner_id
        const specie_id = dino._species
        const bodyJSON = {name, happiness, hunger, tiredness, user_id, specie_id};
        updateDino(id, bodyJSON)
    })
}

function deleteListener(){
    document.getElementById("delete").addEventListener("click", (e) =>{
        const id = parseInt(e.target.dataset.id)
        deleteDino(id)
        removeDino(Dino.findDino(id))
        clearInterval(newMoodAdjust)
    })
}

function createDino(bodyData){

    fetch(dinosEndp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData),
    })
    .then(res => res.json())
    .then(dino => {
            console.log(dino)
            const newDino = new Dino(dino.data)
            const dinos = document.getElementById("dinos")
            const user = User.currentUser
            renderUserDetails(user)
            if(user.dinos.length < 2){
                renderUserDino(user, newDino.id)
            }
            dinos.click()
            displayMessage("You created a dino!")
    })
    .catch(err => console.log(err))
}
function updateDino(id, bodyJSON){
    fetch(`${dinosEndp}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(bodyJSON),
      })
        .then(res => res.json())
        .then(updatedDino => {
            console.log(updatedDino)
        });
}
function deleteDino(id){
    fetch(`${dinosEndp}/${id}`, {
        method: 'DELETE'
      })
        .then(res => {
            return res.json()
        }).then(dino => {
            displayMessage("Dino deleted!")
        })
}

function removeDino(dino){
    delete dino.owner_id
    const id = User.currentUser.dinos[0].id
    renderUserDino(User.currentUser, id)
    renderUserDetails(User.currentUser)
    const dinos = document.getElementById("dinos")
    dinos.click()
}
function displayMessage(message){
    const popDiv = document.getElementById("pops")
    const popMessage = document.createElement("div")
    popMessage.id = "pop-message"
    popMessage.innerText = message
    popDiv.appendChild(popMessage)
    setTimeout(() => popDiv.removeChild(popMessage), 1400)
}

