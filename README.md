# Eggasaurus

A game (built as a Flatiron Portfolio Project) that lets Junior Park Rangers hatch and play with their own dinos. HTML, CSS, and JavaScript frontend with a Rails API backend.

## Getting Started

These instructions will get Eggasaurus up and running on your computer.

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

## Built With

* Rails
* SQLite3 

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/LizLaffitte/eggasaurus_frontend. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant [code of conduct](code_of_conduct.md).


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details