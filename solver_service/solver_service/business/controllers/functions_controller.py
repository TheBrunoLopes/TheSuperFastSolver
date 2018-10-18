from solver_service.business.utils.input_filtering import split_expression, is_expression_valid
from solver_service.crud.function_operations import find_all_functions, insert_function, find_one_function, \
    delete_one_function, find_one_function_and_replace
from pymongo.errors import DuplicateKeyError


def post_function(body):
    """
    Creates the function object in the database
    :param body: Receives the function object: {name:str,expression:str}
    :return: (message:str, status_code:int)
    """
    if body.get('name', None) is None or body.get('name', None) == "":
        return "Missing name attribute", 400
    if body.get('expression', None) is None or body.get('expression', None) == "":
        return "Missing expression attribute", 400

    expression = split_expression(body.get("expression"))
    is_exp_valid = is_expression_valid(expression)
    if is_exp_valid is True:
        try:
            body['expression'] = expression
            return str(insert_function(body)), 201
        except DuplicateKeyError:
            return "Duplicated key error", 400
    else:
        return "Invalid element: "+is_exp_valid, 400


def get_functions():
    """
    Function that returns a list of all function objects
    :return: [{name:str, expression:list}, {..}, ...]
    """
    return find_all_functions()


def get_function(name):
    """
    Retrieves a function object by its name
    :param name: name of the function
    :return: ({name:str, expression:list}, status_code:int)
    """
    result = find_one_function(name)
    if result is None:
        return "Not Found", 404
    return result, 200


def update_function(body):
    """
    Validates and updates an object entirely based on the name attribute
    :param body: {name:str, expression:str}
    :return: (message:str, status_code:int)
    """
    if body.get('expression', None) is None or body.get('expression', None) == "":
        return "Missing expression attribute", 400
    expression = split_expression(body.get("expression"))
    is_exp_valid = is_expression_valid(expression)
    if is_exp_valid is True:
        body['expression'] = expression
        result = find_one_function_and_replace(body)
        if result is None:
            return "Name not found", 404
        return None, 204
    return "Invalid element: " + is_exp_valid, 400


def delete_function(name):
    """
    Deletes a function object based on its name
    :param name: name of the function
    :return: (message:str, status_code:int)
    """
    result = delete_one_function(name)
    if result == 1:
        return "Deleted", 200
    return "Name not found", 404
