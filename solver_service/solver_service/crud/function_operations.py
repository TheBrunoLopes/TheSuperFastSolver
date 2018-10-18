from solver_service.crud import mongo
from solver_service.crud.utils.conversion_types import bson_to_json


def insert_function(_function):
    return mongo.db.functions.insert_one(_function).inserted_id


def find_all_functions():
    return bson_to_json(list(mongo.db.functions.find({}, {'_id': False})))


def find_one_function(_function):
    if type(_function) is str:
        _function = {'name': _function}
    return bson_to_json(mongo.db.functions.find_one(_function, {'_id': False}))


def find_one_function_and_replace(_function):
    return bson_to_json(mongo.db.functions.find_one_and_replace(
        {'name': _function['name']}, _function))


def delete_one_function(_function):
    if type(_function) is str:
        _function = {'name': _function}
    return mongo.db.functions.delete_one(_function).deleted_count


if __name__ == '__main__':
    from pymongo import MongoClient
    import os

    MONGO_HOST = os.environ.get('MONGO_HOST', "localhost")
    MONGO_PORT = os.environ.get('MONGO_PORT', "27017")
    mongo = MongoClient('mongodb://{}:{}/functionsDB'.format(MONGO_HOST, MONGO_PORT))
    mongo.db.functions.create_index("name", unique=True)

