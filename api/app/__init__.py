from flask import Flask
from .serealizer import configure as ma_cfg
from flask_migrate import Migrate
from .model import configure as db_cfg

from flask_cors import CORS




def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/jedi.db'
    CORS(app)
    db_cfg(app)
    ma_cfg(app)
    Migrate(app, app.db)

    from .project import bp_project
    app.register_blueprint(bp_project)
    return app