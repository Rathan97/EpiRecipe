# opensearch_service.py
from opensearchpy import OpenSearch

class OpenSearchService:
    def __init__(self):
        self.client = OpenSearch(
            hosts=[{'host': 'localhost', 'port': 9200}],
            http_auth=('user', 'password'),  # if authentication is needed
            use_ssl=False,  # set to True if using SSL
            verify_certs=False
        )

    def search_recipes(self, title='', filters={}):
        query = {
            'bool': {
                'must': [{'match': {'title': title}}],
                'filter': []
            }
        }
        
        for key, value in filters.items():
            if value:
                query['bool']['filter'].append({'term': {key: value}})
        
        response = self.client.search(index="recipes", body={"query": query})
        return response['hits']['hits']
    

    def search_recipes_with_filters(self, filters):
        query = {
            "bool": {
                "filter": filters
            }
        }
        
        response = self.client.search(index="recipes_index", body={"query": query})
        return [hit['_source'] for hit in response['hits']['hits']]
