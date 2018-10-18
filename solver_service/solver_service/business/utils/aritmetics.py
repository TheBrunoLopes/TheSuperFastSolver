from solver_service.crud.function_operations import find_one_function


def simple_operation(operation_type, value_a, value_b, functions_solved):
    """
    A function that performs the +,-,*,/ operations on two elements and returns the result. If those two values
    are not numbers, we can assume they are functions and we calculate that as well.
    This function behaves like a switch/case observed in many other languages
    :param operation_type: str, can be one of these values: '+', '-', '*', '/'
    :param value_a: can be a function name (str) or number
    :param value_b: can be a function name (str) or number
    :param functions_solved: A dictionary with resolved functions. Used to check if we have an infinity loop and to check
    if we already solved a specific function and get that value instead of calculating it again.
    :return: The result of an operation
    """
    return {
        '+': resolve_value(value_b, functions_solved) + resolve_value(value_a, functions_solved),
        '-': resolve_value(value_b, functions_solved) - resolve_value(value_a, functions_solved),
        '*': resolve_value(value_b, functions_solved) * resolve_value(value_a, functions_solved),
        '/': resolve_value(value_b, functions_solved) / resolve_value(value_a, functions_solved)
    }[operation_type]


# This algorithm is similar to the Shunting-yard_algorithm
# https://en.wikipedia.org/wiki/Shunting-yard_algorithm
# On a side note: I did something similar a few years ago for a Compilers course.
# The main difference was that we had more operators like ['%', '(', ')'] and I used a binary tree of elements instead.
# For our the Valispace challenge using a binary tree would also work but it was not needed.
def calculate_expression(expression, functions_solved):
    """
    Given an expression, calculates it and returns the result
    :param expression: A list of strings containing all the elements of an expression
    :param functions_solved: A dictionary with resolved functions. Used to check if we have an infinity loop and to check
    if we already solved a specific function and get that value instead of calculating it again.
    :return: A float value with the result of the calculation
    """
    output_stack = []
    operand_stack = []
    is_element_an_operand = False
    for element in expression:
        if is_element_an_operand:
            operand_stack.append(element)
        else:
            output_stack.append(element)
            if len(operand_stack) > 0 and (operand_stack[-1] == '*' or operand_stack[-1] == '/'):
                operand = operand_stack.pop()
                output_stack.append(simple_operation(operand, output_stack.pop(), output_stack.pop(), functions_solved))
        is_element_an_operand = not is_element_an_operand
    while len(operand_stack) != 0:
        operand = operand_stack.pop()
        output_stack.append(simple_operation(operand, output_stack.pop(), output_stack.pop(), functions_solved))
    return resolve_value(output_stack[0], functions_solved)


def resolve_value(value, functions_solved):
    """
    Calculates a value, it could be a number (e.g., '2') or the name of a function which will need to be retrieved
    :param functions_solved: A dictionary with resolved functions. Used to check if we have an infinity loop and to check
    if we already solved a specific function and get that value instead of calculating it again.
    :param value: str value with the element
    :return: A number with the resolved value or a string stating the name of the function that could not be resolved
    """
    try:
        return float(value)
    except ValueError:
        if value in functions_solved:
            if functions_solved.get(value, None) is True:
                raise ValueError("Infinity Loop", value)
            return functions_solved.get(value, None)
        else:
            functions_solved[value] = True
        # This function goes to the database to resolve an unseen function
        _function = find_one_function(value)
        if _function is None:
            raise ValueError("Function does not exist", value)
        result = calculate_expression(_function['expression'], functions_solved)
        functions_solved[value] = result
        return result
