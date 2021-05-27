# JEDI_Project_manager
Simple project management software.(for jedis only)

## Installation

### Front-end

- Using default angular cli stack, more information present on README inside jpm folder.


### Back-end
- Create a python3 virtualenv 

- Use the package manager [pip](https://pip.pypa.io/en/stable/) witin requirements.txt file  to install all required dependencies inside your virtualenv.

## Usage
### Front-end

- np serve -o 

### Back-end
- For development run flask cli commands
```bash
export FLASK_APP=app
export FLASK_ENV=Development
export FLASK_DEBUG=True
```
- Create db and run migrations
```bash
flask db init
flask db upgrade
flask db migrate
```

- Run 
```bash
flask run
```
