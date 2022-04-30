#!/usr/bin/env python
# coding: utf-8

# ## Dependencies

# In[1]:


# Imports 
import pandas as pd
get_ipython().run_line_magic('matplotlib', 'inline')
import matplotlib.pyplot as plt
from matplotlib import style
import seaborn as sns
import json
import requests
import pymongo
from pymongo import MongoClient


# ## Reading CVS File and Converting to Data Frame

# In[2]:


# Established File Path
path = "data/world-happiness-report-2021.csv"

# Read World Happiness Data Using File Path
df = pd.read_csv(path)

df.head()


# In[3]:


# Inspected Data Frame
df.info()


# In[4]:


# Inspected Columns
df.columns


# ## Transform Data

# In[5]:


# Removed Various Columns 
df1 = df.drop(columns = [
                            "Standard error of ladder score", 
                            "upperwhisker",
                            "lowerwhisker",
                            "Ladder score in Dystopia",
                            "Explained by: Log GDP per capita",
                            "Explained by: Social support",
                            "Explained by: Healthy life expectancy",
                            "Explained by: Freedom to make life choices",
                            "Explained by: Generosity",
                            "Explained by: Perceptions of corruption",
                            "Dystopia + residual"
                            ]
                             )
df1.head()


# In[6]:


# Renamed Various Columns for Conciseness
df2 = df1.rename(columns={
                        "Country name": "Country", 
                        "Regional indicator": "Region", 
                        "Ladder score": "Score", 
                        "Logged GDP per capita": "GDP per Capita", 
                        "Social support": "Social Support",
                        "Healthy life expectancy": "Healthy Life Expectancy",
                        "Freedom to make life choices": "Freedom of Choice",
                        "Perceptions of corruption": "Perception of Corruption"
                        }
                        )

df2.head()


# In[7]:


# Counted Rows in Data Frame
rank_data = list(range(len(df2)))

# Added "Rank" to Columns with Ranking for Each Country
df2['Rank'] = rank_data

# Made "Rank" Begin at "1" Instead of "0"
df2.Rank += 1 

df2.head()


# In[8]:


# Reordered Columns
df3 = df2[
            ['Country', 
             'Region', 
             'Rank', 
             'Score', 
             'GDP per Capita', 
             'Social Support', 
             'Healthy Life Expectancy', 
             'Freedom of Choice',
             'Generosity', 
             'Perception of Corruption' 
            ]
            ]

df3.head(10)


# In[9]:


# Renamed rows in "Country"
df4 = df3.replace("United States", "United States of America")

df5 = df4.replace("Tanzania", "United Republic of Tanzania") 

df6 = df5.replace("Congo (Brazzaville)", "Republic of Congo")                   

df7 = df6.replace("Congo (Kinshasa)", "Democratic Republic of the Congo")

df8 = df7.replace("Hong Kong S.A.R. of China", "Hong Kong S.A.R.")

df9 = df8.replace("Palestinian Territories", "Palestine")

df10 = df9.replace("Taiwan Province of China", "Taiwan")

df11 = df10.replace("North Macedonia", "Macedonia")

df12 = df11.replace("Serbia", "Republic of Serbia")

df13 = df12.replace("North Cyprus", "Northern Cyprus")

# display
for country in df10["Country"]:
    print(country)


# In[10]:


# Printed entire dataframe to inspect if the entries in the "Region" column were correct
print(df13.to_string())


# In[11]:


# Changed countries to appropriate "Region".
df13.iloc[8,1] = 'AUS and NZ'  # New Zealand
df13.iloc[10,1] = 'AUS and NZ' # Australia
df13.iloc[13,1] = 'North America' # Canada
df13.iloc[18,1] = 'North America' # United States of America
df13.iloc[35,1] = 'North America' # Mexico
print(df13.to_string())


# In[12]:


# Grouped by Region and determined mean
region_df = df13.groupby(["Region"]).mean()


# In[13]:


# Created heatmap to determine correlations of regional averages 
sns.heatmap(region_df.corr());
plt.title('Region Heatmap')
plt.show()


# In[14]:


# Loaded data as json
url = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
resp = requests.get(url)
data = json.loads(resp.text)
#print(data['features'][0])

# Created lists to recreated database to convert geometry entries to objects
countries = []
iso_a3 = []
iso_a2 = []
geometry = []

for row in data["features"]:
    countries.append(row["properties"]["ADMIN"])
    iso_a3.append(row["properties"]["ISO_A3"])
    iso_a2.append(row["properties"]["ISO_A2"])
    geometry.append(row["geometry"])

geodata = pd.DataFrame({
    "ADMIN": countries,
    "ISO_A3": iso_a3,
    "ISO_A2": iso_a2,
    "geometry": geometry
})

geodata.info()


# In[15]:


# Renamed Various Columns for Conciseness
geodata1 = geodata.rename(columns={
                        "ADMIN": "Country", 
                        "geometry": "Geometry", 
                        }
                        )
geodata1.head()


# In[16]:


# Printed countries to determine discrepancies in country names between the two dataframes 
for country in geodata1["Country"]:
    print(country)


# In[17]:


# Merged world happiness dataset and geojson dataset, while including all countries' geometrical coordinates 
world_happiness_df = df13.merge(geodata1, on='Country', how='outer')
world_happiness_df.head()


# In[18]:


# Determined entries
world_happiness_df.info()


# In[19]:


# Determined which rows data fields were empty
world_happiness_df.isna()


# In[20]:


# Filled various null fields with "0"
world_happiness_df['Rank'] = world_happiness_df['Rank'].fillna(0)
world_happiness_df['Score'] = world_happiness_df['Score'].fillna(0)
world_happiness_df['GDP per Capita'] = world_happiness_df['GDP per Capita'].fillna(0)
world_happiness_df['Social Support'] = world_happiness_df['Social Support'].fillna(0)
world_happiness_df['Healthy Life Expectancy'] = world_happiness_df['Healthy Life Expectancy'].fillna(0)
world_happiness_df['Freedom of Choice'] = world_happiness_df['Freedom of Choice'].fillna(0)
world_happiness_df['Generosity'] = world_happiness_df['Generosity'].fillna(0)
world_happiness_df['Perception of Corruption'] = world_happiness_df['Perception of Corruption'].fillna(0)
world_happiness_df.isna()


# ## Imported Data Frame into MongoDB

# In[21]:


#Created MongoDB server and database
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
world_happiness_db = myclient["world_happiness"]


# In[22]:


#Created collection within database
world_happiness_col = world_happiness_db["world_happiness_data"]


# In[23]:


#Inserted dataframe into collection
world_happiness_df.set_index("Country")
data_dict = world_happiness_df.to_dict("records")
data_dict
world_happiness_col.insert_many(data_dict)

