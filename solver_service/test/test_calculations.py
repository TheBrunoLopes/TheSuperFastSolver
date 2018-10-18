from solver_service.business.utils.aritmetics import calculate_expression
from solver_service.business.utils.input_filtering import split_expression, is_expression_valid


def test_simple_addition():
    """
    Simple test, testing 1 + 2
    :return:
    """
    expression = split_expression("1 + 2")
    assert is_expression_valid(expression) is True
    assert calculate_expression(expression, {}) == 3


def test_multiple_precedence_operands():
    """
    This test, verifies that the precedence of operators is satisfied
    :return:
    """
    assert calculate_expression(split_expression("1 + 2 * 3 + 4 * 5"), {}) == 27
    assert calculate_expression(split_expression("5 * 5 + 3"), {}) == 28
    assert calculate_expression(split_expression("3 + 5 * 5"), {}) == 28
    assert calculate_expression(split_expression("4"), {}) == 4
    assert calculate_expression(split_expression("4 * 2 - 1"), {}) == 7
    assert calculate_expression(split_expression("1 - 4 * 2"), {}) == -7
    assert calculate_expression(split_expression("1 - 4 / 2"), {}) == -1
    assert calculate_expression(split_expression("4 / 2 - 1"), {}) == 1


def test_invalid_expressions():
    """
    In this unit test, we will assert if we are properly identifying invalid expressions
    ::Just to remember that the expression "is not True" is not equivalent to "False"
    :return:
    """
    assert is_expression_valid(split_expression("1+2")) is not True
    assert is_expression_valid(split_expression("1 (2")) is not True
    assert is_expression_valid(split_expression("1- (2")) is not True
    assert is_expression_valid(split_expression("1- -2")) is not True
    assert is_expression_valid(split_expression("1-x 2")) is not True
