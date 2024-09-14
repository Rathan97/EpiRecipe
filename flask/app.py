from flask import Flask, request, jsonify
from flask_cors import CORS
from opensearchpy import OpenSearch
from OpenSearch_Service import OpenSearchService
service = OpenSearchService()

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# OpenSearch configuration
opensearch_client = OpenSearch(
    ['http://localhost:9200'],
      # Replace with actual OpenSearch credentials
    scheme="http",
    port=9200
)

@app.route('/search/title/', methods=['GET'])
def search_by_title():
    title = request.args.get('title', '')
    page = int(request.args.get('page', 1))
    size = int(request.args.get('size', 10))
    
    if title:
        query = {
            "query": {
                "match": {
                    "title": title
                }
            },
            "from": (page - 1) * size,
            "size": size
        }
        response = opensearch_client.search(index="recipes_index", body=query)
        recipes = [hit['_source'] for hit in response['hits']['hits']]
        return jsonify({'results': recipes, 'total': response['hits']['total']['value']})
    return jsonify({'error': 'No title provided'}), 400



@app.route('/search/recipes/', methods=['GET'])
def get_all_recipes():
    # Sample implementation; adapt for actual OpenSearch query
    response = opensearch_client.search(index="recipes_index", body={"query": {"match_all": {}}})
    recipes = [hit['_source'] for hit in response['hits']['hits']]
    return jsonify({'results': recipes})




@app.route('/filter/recipes/', methods=['GET'])
def filter_recipes():
    # Get filter parameters
    category = request.args.get('category', None)
    min_protein = request.args.get('min_protein', None)
    max_protein = request.args.get('max_protein', None)
    min_fat = request.args.get('min_fat', None)
    max_fat = request.args.get('max_fat', None)
    min_sodium = request.args.get('min_sodium', None)
    max_sodium = request.args.get('max_sodium', None)
    min_rating = request.args.get('min_rating', None)
    max_rating = request.args.get('max_rating', None)

    # Build the search query
    filters = []
    
    if category:
        filters.append({'term': {'categories': category}})
    if min_protein and max_protein:
        filters.append({'range': {'protein': {'gte': min_protein, 'lte': max_protein}}})
    if min_fat and max_fat:
        filters.append({'range': {'fat': {'gte': min_fat, 'lte': max_fat}}})
    if min_sodium and max_sodium:
        filters.append({'range': {'sodium': {'gte': min_sodium, 'lte': max_sodium}}})
    if min_rating and max_rating:
        filters.append({'range': {'rating': {'gte': min_rating, 'lte': max_rating}}})

    # Query OpenSearch with filters
    results = service.search_recipes_with_filters(filters)
    return jsonify({"results": results})


if __name__ == '__main__':
    app.run(debug=True)
