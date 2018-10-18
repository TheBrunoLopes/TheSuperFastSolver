from pymongo import MongoClient
import os

MONGO_HOST = os.environ.get('MONGO_HOST', "localhost")
MONGO_PORT = os.environ.get('MONGO_PORT', "27017")
mongo = MongoClient('mongodb://{}:{}/functionsDB'.format(MONGO_HOST, MONGO_PORT), connect=False)
mongo.db.functions.create_index("name", unique=True)
