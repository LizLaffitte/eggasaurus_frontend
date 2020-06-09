const dinosEndp = 'http://localhost:3000/api/v1/dinos'
const speciesEndp = 'http://localhost:3000/api/v1/species'
const signup = 'http://localhost:3000/users'
const loginUrl = 'http://localhost:3000/auth'
document.addEventListener("DOMContentLoaded", () => {
    getSpecies()
    getDinos()
    document.getElementById("logout").addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.clear();
        User.currentUser = ''
    })
})

function getSpecies(){
    fetch(speciesEndp)
    .then(response => response.json())
    .then(species => {
        species.data.forEach(specie => {
            const newSpecies = new Specie(specie)
        })
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
            username: localStorage.username
        }
        const newUser = new User(user)
        // showElement(document.getElementById("options"))
        // hatchListener()
        renderUserDino(newUser)
    } else {
        userFormListeners()
    }
}

function dinoCheck(){

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
        hideElement(document.getElementById("signup-form"))
    })
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        const bodyData = {username, password}
        loginUser(bodyData)
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
        console.log(user)
        localStorage.setItem('id', user.id);
        localStorage.setItem('username', user.username)
        const newUser = new User(user)
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
        if(resp) {
            localStorage.setItem('id', resp.user.id);
            localStorage.setItem('username', resp.user.username)
            const newUser = new User(resp.user)
            renderUserDino(newUser)
        }
    })
    .catch(err => console.log(err));
}



function renderUserDino(user){
    document.getElementById("dino-egg").innerHTML += user.dinos[0].createDinoDiv()
    moodListeners()
    saveListener()
    const autoMoodAdjust = window.setInterval(() => {Dino.measureMoods()}, 10000)
    deleteListener()
}

function removeDino(dinoId){
    document.getElementById("dino-egg")

}


function createDinoForm(){
    const formContainer = document.getElementById("form-container")

    const formHtml = `<form id="new-dino-form">
        <label for="name-input">Dino Name:</label><br />
        <input type="text"  id="name-input" required>
        <p>Dino Species: </p>
        <select id="species-name" name="species" required>
            ${Specie.buildOptions()}
        </select>
        <br><br>
        <input id='create-button' type="submit" name="submit" value="Hatch Your Egg" class="submit">
    </form>`
    formContainer.innerHTML += formHtml
    newDinoListener()
}
function hatchListener(){
    
    document.getElementById("hatch").addEventListener("click", (e) => {
        e.target.style.display = "none"
        createDinoForm()
    })
}
function newDinoListener(){
    document.getElementById("new-dino-form").addEventListener("submit", (e) =>{
        e.preventDefault()
        const name = document.getElementById("name-input").value
        const specie_id = parseInt(document.getElementById("species-name").value, 10)
        const happiness = 659
        const hunger = 659
        const tiredness = 659
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
                console.log(thisDino.happiness)
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
        const id = parseInt(e.target.dataset.id);
        const dino = Dino.findDino(id);
        const happiness = dino.happiness
        const hunger = dino.hunger
        const tiredness = dino.tiredness
        const bodyJSON = {name, happiness, hunger, tiredness};
        updateDino(id, bodyJSON)
    })
    
}

function deleteListener(){
    document.getElementById("delete").addEventListener("click", (e) =>{
        const id = parseInt(e.target.dataset.id)
        deleteDino(id)
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
    .then(res => res.text())
    .then(dino => {
        console.log(dino)
        displayMessage("You created a dino!")
    })
    .catch(err => console.log(err));
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
            displayMessage("Your dino is saved!")
        });
}
function deleteDino(id){
    fetch(`${dinosEndp}/${id}`, {
        method: 'DELETE'
      })
        .then(res => {
            console.log(res.json())

        })
}
function displayMessage(message){
    const popDiv = document.getElementById("pops")
    const popMessage = document.createElement("div")
    popMessage.id = "pop-message"
    popMessage.innerText = message
    popDiv.appendChild(popMessage)
    setTimeout(() => popDiv.removeChild(popMessage), 1400)
}

