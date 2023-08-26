from flask import Flask, request, jsonify
import pandas as pd 
import numpy as np 
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import webbrowser
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


food = pd.read_csv("Books.csv")
ratings = pd.read_csv("filtered_data.csv")
restaurant=pd.read_csv("Restaurant.csv")
combined = pd.merge(ratings, food, on='Food_ID')

dataset = ratings.pivot_table(index='Food_ID',columns='User_ID',values='Rating')
dataset.fillna(0,inplace=True)
csr_dataset = csr_matrix(dataset.values)
dataset.reset_index(inplace=True)

model = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=5, n_jobs=-1)
model.fit(csr_dataset)


@app.route('/submit', methods=['POST'])
def handle_data():
    data = request.json
    ans = combined.loc[(combined.C_Type == data['cuisine']) & (combined.Veg_Non == data['vornv'])& (combined.Rating >= int(data['rating'])),['Name','C_Type','Veg_Non']]
    names = ans['Name'].tolist()
    x = np.array(names)
    ans1 = np.unique(x)
    data1 = {}
    for i in range(0, len(ans1)):
        data1[str(i)] = str(ans1[i])
    return jsonify(data1)

@app.route('/foodDescription', methods=['POST'])
def handle_foodDescription():
    data = request.json
    finallist=data['selectedOption']
    filtered_dat = food[food['Name'] ==finallist]
    dis_of_food=filtered_dat['Describe'].tolist()
    data1 = {}
    for i in range(0, len(dis_of_food)):
        data1[str(i)] = str(dis_of_food[i])
    
    return jsonify(data1)

@app.route('/click', methods=['POST'])
def handle_click():
    data = request.json
    finallist=data['selectedOption']
    similar = food_recommendation(finallist)
    data1 = {}
    for i in range(0, len(similar)):
        data1[str(i)] = str(similar[i])
    
    return jsonify(data1)

@app.route('/maps', methods=['POST'])
def handle_restauranats():
    data = request.json
    finallist=data['selectedOption']
    filtered_data = food[food['Name'] == finallist]
    restaurant_ids = filtered_data['Restaurant_IDs'].tolist()
    restaurant_uids = restaurant_ids[0].split(',')
    restaurant_uids = [int(id) for id in restaurant_uids]
    filtered_restaurants = restaurant[restaurant['Restaurant_id'].isin(restaurant_uids)]
    names = filtered_restaurants['Restaurant_name'].tolist()
    data1 = {}
    for i in range(0, len(names)):
        data1[str(i)] = str(names[i])
    
    return jsonify(data1)

@app.route('/restaurants', methods=['POST'])
def handle_maps():
    data = request.json
    restaurant_name= data['restaurant']
    temp = restaurant[restaurant['Restaurant_name']==restaurant_name]
    latitude = temp['Latitude'].tolist()[0]
    longitude = temp['Longitude'].tolist()[0]
    maps_url = f"https://www.google.com/maps/search/?api=1&query={latitude},{longitude}"
    webbrowser.open(maps_url)
    return {'mes':'success'}

def food_recommendation(Food_Name):
    n = 5
    FoodList = food[food['Name'].str.contains(Food_Name)]  
    if len(FoodList):        
        Foodi= FoodList.iloc[0]['Food_ID']
        Foodi = dataset[dataset['Food_ID'] == Foodi].index[0]
        distances , indices = model.kneighbors(csr_dataset[Foodi],n_neighbors=n+1)    
        Food_indices = sorted(list(zip(indices.squeeze().tolist(),distances.squeeze().tolist())),key=lambda x: x[1])[:0:-1]
        Recommendations = []
        for val in Food_indices:
            Foodi = dataset.iloc[val[0]]['Food_ID']
            i = food[food['Food_ID'] == Foodi].index
            Recommendations.append({'Name':food.iloc[i]['Name'].values[0],'Distance':val[1]})
        df = pd.DataFrame(Recommendations,index=range(1,n+1))
        return df['Name'].tolist()
    else:
        return "No Similar Foods."



if __name__ == '__main__':
    app.run(debug='run')