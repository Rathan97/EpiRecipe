from opensearchpy import OpenSearch
import json

# Create an OpenSearch client
client = OpenSearch([{'host': 'localhost', 'port': 9200}])

# # Function to create an index with mapping
# def create_index(index_name):
#     # Define the mapping for the index
#     mapping = {
#         "mappings": {
#             "properties": {
#                 "title": {"type": "text"},
#                 "directions": {"type": "text"},
#                 "ingredients": {"type": "text"},
#                 "sodium": {"type": "float"},
#                 "date": {"type": "date"},
#                 "calories": {"type": "float"},
#                 "categories": {"type": "keyword"},
#                 "desc": {"type": "text"},
#                 "protein": {"type": "float"},
#                 "fat": {"type": "float"},
#                 "rating": {"type": "float"}
#             }
#         }
#     }
#     # Create the index
#     if not client.indices.exists(index_name):
#         client.indices.create(index=index_name, body=mapping)

# # Function to index data from a JSON file
# def index_json_data(file_path, index_name):
#     with open(file_path, 'r') as file:
#         data = json.load(file)
#         for i, doc in enumerate(data):
#             client.index(index=index_name, id=i, body=doc)

# Function to search data in the index
def search_recipes(query, index_name):
    response = client.search(
        index=index_name,
        body={
            "query": {
                "match": {
                    "categories": query
                }
            }
        }
    )
    return response

# Main execution
def main():
    index_name = 'recipes_d_index'
    json_file_path = 'C:\\Users\\srinu\\Downloads\\rathan\assingnment\full_format_recipes.json'
    
    # Create index with mapping
    # create_index(index_name)
    
    # # Index JSON data
    # index_json_data(json_file_path, index_name)
    
    # Perform a test search
    search_query = 'Tomato, Garlic'
    results = search_recipes(search_query, index_name)
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
