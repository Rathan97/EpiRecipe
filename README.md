
# Recipe Search Application

This project is a recipe search full-stack application built using React for the frontend, Flask for the backend API, and OpenSearch for searching recipes. The project allows users to search recipes by title, filter recipes by nutritional values (protein, fat, sodium), and rate recipes based on rating scores.


- Here is a Youtube Video on how to run and  accesss the application [Check it out](https://youtu.be/VHQkCnu89qU).

## Prerequisites

Before starting, ensure you have the following tools installed on your system:

- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/)
- [OpenSearch](https://opensearch.org/)
- [pip (Python package manager)](https://pip.pypa.io/en/stable/installation/)
- [npm (Node package manager)](https://www.npmjs.com/)

## Tools and Libraries Used

### Backend:
- **Flask**: Python web framework for building APIs
- **OpenSearch**: Search engine for indexing and querying recipes
- **OpenSearch-py**: Python client for interacting with OpenSearch
- **Pandas**: For data manipulation
- **Flask-CORS**: To handle CORS (Cross-Origin Resource Sharing) for API calls

### Frontend:
- **React**: JavaScript library for building the user interface
- **Axios**: HTTP client for making API requests from React to Flask

---
## Download and preprocess Dataset

1. We are using EpiRecipes Kaggle Dataset
2. Download from [here](https://www.kaggle.com/datasets/hugodarwood/epirecipes)
3. Preprocess the data, handle null values
4. Create a column named categories and add necessary ingredients in that categories column based on recipe title.
5. Convert the file into json for injecting into opensearch.
6. You can find the preprocessed json file in files folder.

   
## Step 1: Installing OpenSearch (Direct Installation)

To install OpenSearch directly on your system:

1. Download the latest OpenSearch for windows from the [OpenSearch official website](https://opensearch.org/docs/latest/install-and-configure/install-opensearch/windows/).

2. Extract the zip file:
3. set up OpenSearch follow this [Document](https://opensearch.org/docs/latest/install-and-configure/install-opensearch/windows/)

4. After Setup Start OpenSearch:
   ```bash
   ./bin/opensearch
   ```

5. Access OpenSearch by navigating to `http://localhost:9200` in your browser. You can check if OpenSearch is running by making a `curl` request:
   ```bash
   curl -X GET "localhost:9200/"
   ```

---

## Step 2: Installing and Setting Up Backend

1. Create a virtual environment for your Flask application:
   ```bash
    python3 -m venv venv
    source venv/bin/activate 
   ```

2. Install dependencies:
   ```bash
   pip install flask opensearch-py
   ```

3.Install CORS for Flask (since you'll be connecting it with the React frontend):
   ```bash
   pip install flask-cors
   ```

4. Flask server setup: Ensure that `app.py` contains the necessary routes for searching and filtering recipes using OpenSearch.

5. Run the Flask server:
   ```bash
   flask run
   ```
   or
 ```bash
     python app.py
   ```
---

## Step 3: Ingesting Data into OpenSearch

To ingest your dataset (converted into JSON format) into OpenSearch:

1. Convert your dataset into a JSON format. For example:
   ```json
   [
     {
       "title": "Recipe Name",
       "calories": 200,
       "categories": ["Vegetarian", "Breakfast"],
       "ingredients": ["Flour", "Sugar"],
       "rating": 4.5,
       "protein": 12,
       "fat": 5,
       "sodium": 500
     },
   
   ]
   ```

2. Create an index in OpenSearch:
   ```bash
   curl -X PUT "localhost:9200/recipe_index"
   ```

3. Ingest the JSON data into the `recipe_index` using the bulk API:
   ```bash
   curl -X POST "localhost:9200/recipe_index/_bulk" -H "Content-Type: application/json" --data-binary @your-json-file.json
   ```

   Alternatively, you can write a Python script to ingest the data programmatically using the `opensearch-py` library.

4. Or you can use the python scipt in located in files folder adjust the json file path
  

## Step 4: Installing and Setting Up Frontend

## Install React
1. Create a new React project:
   ```bash
    npx create-react-app recipe-app
    cd recipe-app
   ```

2. Install Axios for making API requests:
   ```bash
    npm install axios
   ```

3. Set up your React components and file structure like this
```bash
recipe-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
backend/
├── app.py
├── opensearch_service.py
├── requirements.txt
└── README.md
```

-Ensure you implemented your logic.
   

4. Start the React development server:
   ```bash
   npm start
   ```

---

## Step 5: Running the Application

1. Ensure that OpenSearch is running on `localhost:9200`.
2. Start the Flask backend:
   ```bash
   flask run
   ```
3. Start the React frontend:
   ```bash
   npm start
   ```

You should now be able to access the Recipe Search Application at `http://localhost:3000`.

---

## API Endpoints

### Search Recipe by Title
- **GET** `/search/title/`
- **Parameters**: `title`
- **Description**: This endpoint searches for recipes by their title.

### Filter Recipes
- **GET** `/filter/recipes/`
- **Parameters**: `category`, `protein`, `fat`, `sodium`, `rating`
- **Description**: This endpoint filters recipes based on categories and nutritional values (protein, fat, sodium, and rating).

---

## Conclusion

Weve successfully set up the Recipe Search Application with OpenSearch for backend indexing and React for frontend recipe display. This project allows users to search for recipes by title and apply various filters for a refined search experience.
