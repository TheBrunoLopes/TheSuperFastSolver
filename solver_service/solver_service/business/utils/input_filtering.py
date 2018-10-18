import re

pattern_for_values = r'[\w\-_]+\Z'
pattern_for_operators = r'[\+\-\*\/]\Z'


def split_expression(expression):
    """
    Creates a list of the elements present on an expression separated by \s
    :param expression: The expression for the functions defined by the user
    :return: Returns a list of the elements from the expressions, e.g., "2 + 3 * f2" -> ["2","+","3","*","f2"]
    """
    return [element for element in re.split(r'\s', expression) if element != '']


def is_expression_valid(expression):
    """
    Validates if the function names follow the [\w\-_]+ syntax and the operators are [+-*/]
    :param expression: A list of strings containing all the elements of an expression
    :return: If is valid, returns True; else, it will return the invalid element
    """
    is_element_a_value = True
    for element in expression:
        if is_element_a_value:
            if re.match(pattern_for_values, element) is None:
                return element
            is_element_a_value = not is_element_a_value
        else:
            if re.match(pattern_for_operators, element) is None:
                return element
            is_element_a_value = not is_element_a_value
    return True


if __name__ == '__main__':
    exp = "1 + 2"
    eq = split_expression(exp)
    print(eq)
    print(is_expression_valid(eq))

