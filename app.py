##################################################
# Dependencies
##################################################

from flask import Flask, render_template
import pandas as pd
from sqlalchemy import create_engine

##################################################
# Flask Initiation
##################################################

app = Flask(__name__)

##################################################
# Flask Routes
##################################################

# Created API from the data stored in Postgres database
@app.route('/world_happiness')
def happiness():
    engine = create_engine('postgresql://postgres:postgres@localhost:5432/world_happiness')
    df = pd.read_sql_table("world_happiness_data",con=engine)
    return df.to_json(orient='split', index=False, indent=4)

# Loaded the index.html when requesting the https://localhost:5000
@app.route('/')
def index():
    return render_template('index.html')

##################################################
# Close Out by Defining Main Behavior
##################################################

if __name__ == '__main__':
    app.run(debug=True)