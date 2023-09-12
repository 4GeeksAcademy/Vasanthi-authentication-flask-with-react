"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route("/signup", methods=["POST"])
def addUser():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Check if the email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user is None:
        new_user_data = User(email= email, password=password, is_active=True)
        db.session.add(new_user_data)
        db.session.commit()
        return jsonify({"msg": "User added successfully!"}), 200
    return jsonify({"msg": "email is already exists in the database try login instead?"}), 401

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def createToken():
    email= request.json.get("email", None)
    # Check if the email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user is None:
       return jsonify({"Unauthorized Acess"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/hello", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify({"msg": "Welcome " + current_user}), 200
