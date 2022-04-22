from flask import Flask, render_template
import pandas as pd
from sqlalchemy import create_engine
app = Flask(__name__)


# create my own API from the data stored in Postgres database
@app.route('/world_happiness')
def hello():
    engine = create_engine('postgresql://postgres:postgres@localhost:5432/world_happiness')
    df = pd.read_sql_table("world_happiness_data",con=engine)
    return df.to_json(orient='index', indent=4)
# load the index.html when requesting the https://localhost:5000
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)