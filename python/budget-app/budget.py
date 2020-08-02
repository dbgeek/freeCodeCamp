class Category:
  """It should be able to instantiate objects based on different budget
  categories like food, clothing, and entertainment. When objects are created,
  they are passed in the name of the category.

  Attributes:
    category: A string of category of the category class
    ledger: A list of al leger
    totalSpent: An float that hold how muck we has spend
  """

  def __init__(self, category):
    """Inits SampleClass with blah."""
    self.category = category
    self.ledger = []
    self.totalSpent = 0

  def deposit(self, amount, description=""):
    """A deposit method that accepts an amount and description.
    If no description is given, it should default to an empty string.
    The method should append an object to the ledger list in the form
    of {"amount": amount, "description": description}.
    """
    self.ledger.append({
      'amount': amount,
      'description': description
    })

  def withdraw(self, deposit, description=""):
    """A withdraw method that is similar to the deposit method, but the
    amount passed in should be stored in the ledger as a negative number.
    If there are not enough funds, nothing should be added to the ledger.
    This method should return True if the withdrawal took place, and False otherwise.
    """

    if not self.check_funds(deposit):
      return False

    self.ledger.append({
      'amount': deposit * -1,
      'description': description
    })
    self.totalSpent += deposit
    return True

  def get_balance(self):
    """A get_balance method that returns the current balance of the budget category
    based on the deposits and withdrawals that have occurred.
    """
    return sum(item['amount'] for item in self.ledger)

  def transfer(self, amount, destCategory):
    """A transfer method that accepts an amount and another budget category as arguments.
    The method should add a withdrawal with the amount and the description
    "Transfer to [Destination Budget Category]". The method should then add a deposit to
    the other budget category with the amount and the description "Transfer from
    [Source Budget Category]". If there are not enough funds, nothing should be
    added to either ledger
    """

    if not self.check_funds(amount):
      return False

    self.withdraw(amount, 'Transfer to {}'.format(destCategory.category))
    destCategory.deposit(amount, 'Transfer from {}'.format(self.category))

    return True

  def check_funds(self, amount):
    """A check_funds method that accepts an amount as an argument.
    It returns False if the amount is less than the balance of the budget category and
    returns True otherwise. This method should be used by both the withdraw method
    and transfer method.
    """
    return amount <= self.get_balance()

  def __str__(self):
    """When the budget object is printed it should display:
    * A title line of 30 characters where the name of the category is centered in a line of `*` characters.
    * A list of the items in the ledger. Each line should show the description and amount.
      The first 23 characters of the description should be displayed, then the amount.
      The amount should be right aligned, contain two decimal places, and display a maximum of 7 characters.
    * A line displaying the category total.
    """
    strings = []
    strings.append('{:*^30s}'.format(self.category))
    for posting in self.ledger:
      strings.append('{:<23}{:7.2f}'.format(posting['description'][:23] , posting['amount']))
    strings.append('Total: {}'.format(self.get_balance()))
    return "\n".join(strings)

def create_spend_chart(categories):
  total = sum([category.totalSpent for category in categories])
  totalPerCategory = [int((category.totalSpent/total) * 100 // 10 * 10) for category in categories]

  rows = []
  for i in range(100, -10, -10):
    row = ['{:>3}|'.format(i)]
    for spending in totalPerCategory:
      if i <= spending:
        row.append('o')
      else:
        row.append(' ')
    rows.append(row)

  result = 'Percentage spent by category\n'
  format_list = ['{:>3}' for item in range(len(totalPerCategory) - 1)]
  s = '{}{:>2}' + ''.join(format_list) + '  \n'
  for row in rows:
    result += s.format(*row)
  result += '{:4}{:-<{}}\n'.format(' ', '', len(totalPerCategory) * 2 + 4)

  maxCategoryLength = max([len(i.category) for i in categories])
  verticalCategoryFormatList = ['{:<3}' for item in range(len(totalPerCategory))]
  verticalCategoryFormatString = '     ' + ''.join(verticalCategoryFormatList) + '\n'
  for i in range(0, maxCategoryLength, 1):
    row = []
    for j in categories:
      if i <= len(j.category) - 1 :
        row.append(j.category[i])
      else:
        row.append(' ')
    result += verticalCategoryFormatString.format(*row)
  return result[:-1]
