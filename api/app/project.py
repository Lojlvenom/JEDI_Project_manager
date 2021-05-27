from flask.wrappers import Response
from .model import Project
from .serealizer import ProjectSchema
from flask import Blueprint, current_app, request,jsonify
import datetime
import json


bp_project = Blueprint('project',__name__)

@bp_project.route('/show', methods=["GET"])
def show_all():
    ps = ProjectSchema(many=True)
    query = Project.query.all()
    return ps.jsonify(query), 200

@bp_project.route('/create', methods=['POST'])
def create():
    ps = ProjectSchema()
    body = request.json
    if (body["risco_projeto"] > '2' or body["risco_projeto"] < '0'):
        return jsonify('Invalid risk value'),401
    try:
        project = ps.load(request.json)
    except Exception as e:
        return jsonify(str(e)), 401
    current_app.db.session.add(project)
    current_app.db.session.commit()
    
    return ps.jsonify(project), 201


@bp_project.route('/modify/<modify_id>', methods=['POST'])
def mod(modify_id):
    body = request.json
    if (body["risco_projeto"] > 2 or body["risco_projeto"] < 0):
        return jsonify('Invalid risk value'),401
    data_inicio = body["data_inicio"]
    data_fim = body["data_fim"]
    data_inicio_obj = datetime.datetime.strptime(data_inicio, '%Y-%m-%d')
    data_fim_obj = datetime.datetime.strptime(data_fim, '%Y-%m-%d')
    body["data_inicio"] = data_inicio_obj
    body["data_fim"] = data_fim_obj
    ps = ProjectSchema()
    query = Project.query.filter(Project.id == modify_id)
    query.update(body)
    current_app.db.session.commit()
    
    return ps.jsonify(query.first()), 200


@bp_project.route('/getProject/<project_id>', methods=['GET'])
def getProject(project_id):
    ps = ProjectSchema()
    query = Project.query.filter(Project.id == project_id)
    return ps.jsonify(query.first()), 200

@bp_project.route('/delete/<delete_id>', methods=['GET'])
def delete(delete_id):
    ps = ProjectSchema()
    query = Project.query.filter(Project.id == delete_id).delete()
    current_app.db.session.commit()
    return jsonify("Project deleted")
