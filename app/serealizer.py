from app.model import *
from flask_marshmallow import Marshmallow 
ma = Marshmallow()

def configure(app):
    ma.init_app(app)

class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
       model = Project
       load_instance = True