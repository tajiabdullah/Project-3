##################################################
# Dependencies
##################################################

from flask import Flask, render_template, redirect
import pandas as pd
from flask_pymongo import PyMongo

##################################################
# Flask Initiation
##################################################

app = Flask(__name__)

##################################################
# MangoDB Initiation
##################################################

app.config["MONGO_URI"] = "mongodb://localhost:27017/world_happiness"
mongo = PyMongo(app)

mars_data = mongo.db.world_happiness_data.find_one()

##################################################
# Flask Routes
##################################################

# Created API from the data stored in Postgres database
@app.route('/')
def happiness():
    world_happiness_data = list(mongo.db.world_happiness_data.find())
    #print(list(world_happiness_data))  
    return render_template('index.html', world_happiness_data = world_happiness_data)

# Loaded the index.html when requesting the https://localhost:5000
@app.route('/123')
def index():
    return render_template('index.html')

##################################################
# Close Out by Defining Main Behavior
##################################################

if __name__ == '__main__':
    app.run(debug=True)