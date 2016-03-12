import random


def generate_new_color():
    return '#%06X' % random.randint(0, 256 ** 3 - 1)
