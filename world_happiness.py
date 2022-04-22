#!/usr/bin/env python
# coding: utf-8

# ## Dependencies

# In[68]:


#Imports 
import pandas as pd
from sqlalchemy import create_engine


# ## Reading CVS File and Converting to Data Frame

# In[69]:


# Established File Path
path = "data/world-happiness-report-2021.csv"

# Read World Happiness Data Using File Path
df = pd.read_csv(path)

df.head()


# In[70]:


#Inspected Data Frame
df.info()


# In[71]:


#Inspected Columns
df.columns


# ## Transform Data

# In[72]:


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


# In[73]:


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


# In[74]:


#Counted Rows in Data Frame
rank_data = list(range(len(df2)))

#Added "Rank" to Columns with Ranking for Each Country
df2['Rank'] = rank_data

#Made "Rank" Begin at "1" Instead of "0"
df2.Rank += 1 

df2.head()


# In[75]:


#Reordered Columns
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


# In[76]:



df4 = df3.set_index("Country")
df4.head(10)


# ## Imported Data Frame into pgAdmin4

# In[77]:


#Ensured pgAdmin4 was Running
#Created Database in pgAdmin4 named "world_happiness"
rds_connection_string = "postgres:postgres@localhost:5432/world_happiness"
engine = create_engine(f'postgresql://{rds_connection_string}')


# In[79]:


#Converted Data Frame to SQL
df4.to_sql(name='world_happiness_data', con=engine, if_exists='replace', index=True) 


# In[80]:


#Imported Database to pgAdmin4
engine.execute("""
ALTER TABLE world_happiness_data
ADD CONSTRAINT country_pk 
PRIMARY KEY ("Country");
""")

