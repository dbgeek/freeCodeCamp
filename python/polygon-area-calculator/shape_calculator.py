class Rectangle:
  def __init__(self, width, height):
      """Inits SampleClass with blah."""
      self.height = height
      self.width = width

  def set_height(self, height):
    self.height = height

  def set_width(self, width):
    self.width = width

  def get_area(self):
    """Returns area (width * height)"""
    return self.width * self.height

  def get_perimeter(self):
    """Returns perimeter (2 * width + 2 * height)"""
    return (2 * self.width) + (2 * self.height)

  def get_diagonal(self):
    """Returns diagonal ((width ** 2 + height ** 2) ** .5)"""
    return ((self.width ** 2 + self.height ** 2) ** .5)

  def get_picture(self):
    """Returns a string that represents the shape using lines of "*".
    The number of lines should be equal to the height and the
    number of "*" in each line should be equal to the width.
    There should be a new line (\n) at the end of each line.
    If the width or height is larger than 50, this should
    return the string: "Too big for picture.".
    """
    if self.width > 50 or self.height > 50:
      return "Too big for picture."

    picture = []
    for _ in range(self.height):
      row = []
      for _ in range(self.width):
        row.append('*')
      picture.append(''.join(row) + '\n')

    return ''.join(picture)

  def get_amount_inside(self, object):
    """Takes another shape (square or rectangle) as an argument.
    Returns the number of times the passed in shape could fit inside
    the shape (with no rotations). For instance, a rectangle with a
    width of 4 and a height of 8 could fit in two squares with sides of 4.
    """
    h = self.height // object.height
    w = self.width // object.width

    return h * w

  def __str__(self):
    if self.width == self.height:
      return 'Square(side={})'.format(self.width)
    else:
      return 'Rectangle(width={}, height={})'.format(self.width, self.height)


class Square(Rectangle):

  def __init__(self, length):
      """Inits SampleClass with blah."""
      super().__init__(length, length)

  def set_height(self, height):
    self.height = height
    self.width = height

  def set_width(self, width):
    self.width = width
    self.height = width

  def set_side(self, length):
    """If an instance of a Square is represented as a string,
    it should look like: Square(side=9)
    """
    self.width = length
    self.height = length
