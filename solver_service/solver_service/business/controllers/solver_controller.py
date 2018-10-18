from solver_service.business.utils.aritmetics import calculate_expression
from solver_service.business.utils.input_filtering import split_expression, is_expression_valid


def solve_function(body):
    """
    Solves a given expression
    :param body: Receives an object containing the 'expression' attribute
    :return: If the request is valid, a float with the result is returned.
            Else, we return the error message and the status code
    """
    expression = split_expression(body.get("expression"))
    is_exp_valid = is_expression_valid(expression)
    if is_exp_valid is not True:
        return "Invalid element: " + is_exp_valid, 400
    try:
        result = calculate_expression(expression, {})
    except ValueError as err:
        return err.args[0]+" : "+err.args[1], 400
    return result, 200
