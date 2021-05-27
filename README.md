# JEDI_Project_manager
Simple project management software.(for jedis only)

## Installation

### Front-end
- Install project dependencies, run command inside jpm folder.
```bash
npm i
```


### Back-end
- Create a python3 virtualenv 

- Use the package manager [pip](https://pip.pypa.io/en/stable/) witin requirements.txt file  to install all required dependencies inside your virtualenv.
```bash
pip install -r requirements.txt 
```
## Usage
### Front-end
- To open on browser
```bash
np serve -o 
```

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
