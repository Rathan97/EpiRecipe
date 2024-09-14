from opensearchpy import OpenSearch, helpers
import json

# Initialize OpenSearch client
es = OpenSearch(["http://localhost:9200"])

def load_json(file_path):
    """
    Generator function to yield JSON objects from a file, one per line.
    """
    with open(file_path, 'r') as file:
        for line in file:
            yield json.loads(line)

def bulk_insert(es, index_name, file_path):
    """
    Function to perform bulk ingestion of JSON data into OpenSearch.
    """
    actions = [
        {
            "_index": index_name,
            "_source": doc
        }
        for doc in load_json(file_path)
    ]
    # Perform the bulk operation
    helpers.bulk(es, actions)
    print(f"Data successfully ingested into index '{index_name}'.")

if __name__ == "__main__":
    # Path to your JSON file
    json_file_path = "C:\\Users\\srinu\\Downloads\\rathan\\assingnment\\epi_dataset_categories.json"  # Update with your file path
    
    # OpenSearch index name
    index_name = "recipes_d_index"
    
    # Call the bulk insert function
    bulk_insert(es, index_name, json_file_path)
