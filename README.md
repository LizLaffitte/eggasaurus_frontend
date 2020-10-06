# Eggasaurus 
<img src="https://user-images.githubusercontent.com/52801558/95231836-ad2e8b00-07d1-11eb-806c-f8d0fc751299.PNG" align="left" />A JavaScript SPA game designed for young dino lovers. Junior Park Rangers can hatch, name and interact with their own virtual dinos.

Eggasaurus was created for the developer's favorite dino expert: her toddler. It is meant to be simple enough for even the youngest Park Rangers to enjoy, with a little help from Senior Park Rangers.


[Frontend Repo](https://github.com/LizLaffitte/eggasaurus_frontend): Vanilla JavaScript, HTML & CSS | [Backend Repo](https://github.com/LizLaffitte/eggasaurus_backend): Rails API

## Local Installation

These instructions will get you a copy of Eggasaurus up and running on your computer.

### Prerequisites

Other than the gems listed in this app's Gemfile, you will need to have [Ruby](https://www.ruby-lang.org/en/downloads/) and [Rails](https://guides.rubyonrails.org/v5.0/getting_started.html) installed on your local machine as well as the ability to install Ruby gems.

### Installing

To run this app locally, fork and clone the [frontend GitHub repo](https://github.com/LizLaffitte/eggasaurus_frontend) and the [backend Github repo](https://github.com/LizLaffitte/eggasaurus_backend) to your local machine. 

Change directories into the backend local directory. Run bundle install to install dependencies, and rails db:migrate and rails db:seed to create and seed the database. 
```
$cd eggasaurus_backend
$bundle install
$rails db:migrate
$rails db:seed
```

Run $rails s to start a web server and access the app in a web browser. 
```
$rails s
```

Change directories into the frontend local directory. Use your favorite browser to visit index.html.

```
$cd ..
$cd eggasaurus_frontend
$open index.html
```

## Playing Eggasaurus


Sign in or login to get started.

![LogIn](https://user-images.githubusercontent.com/52801558/95231911-cb948680-07d1-11eb-9f9b-1568b358940a.PNG)

### Hatch Dinos
In the right-hand sidebar, click Hatch to pull up the Hatck pane. Give your new dino a name and pick its species and then click the hatch button.

![Hatch](https://user-images.githubusercontent.com/52801558/95232648-cbe15180-07d2-11eb-93a2-a3f1ba433ba8.PNG)


### Pick a Dino to Play With
Click Dinos in your sidebar to see a list of your hatched dinos. Click the play link next to the dino's name you'd like to play with.

![Dinos](https://user-images.githubusercontent.com/52801558/95232552-a94f3880-07d2-11eb-9da5-0b4e07a0de11.PNG)


## Feed, Play, Nap, Repeat
Oh no, your dino needs you! As you play with your dino, their mood meters will slowly start to decrease. Click the icons underneath your dino to fill up the corresponding mood meter. Click the save button to save your progress, and the delete button if you would like to delete the dino and start over.

![Stega](https://user-images.githubusercontent.com/52801558/95232680-d7347d00-07d2-11eb-9520-c04b0be03ce9.PNG)


## Built With
* JavaScript 
* Rails
* SQLite3 
* CSS Animations

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/LizLaffitte/eggasaurus_frontend. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant [code of conduct](code_of_conduct.md).


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details