from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def configure(app):
    db.init_app(app)
    app.db = db

class Project(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    nome_projeto = db.Column(db.String(255), nullable=False)
    data_inicio = db.Column(db.TIMESTAMP, nullable=False)
    data_fim = db.Column(db.TIMESTAMP, nullable=False)
    valor_projeto = db.Column(db.Integer, nullable=False)
    participantes = db.Column(db.String(255), nullable=False)
    risco_projeto = db.Column(db.Integer,nullable=False)
