def arithmetic_arranger(problems, displayAnsware=False):
  expressions = []
  for problem in problems:
    expression = problem.split(' ')
    obj = {
      'number1': expression[0],
      'operator': expression[1],
      'number2': expression[2],
      'colLen': max([len(expression[0]), len(expression[2])]),
    }
    expressions.append(obj)
  for opr in expressions:
    if opr['number1'].isdecimal() and opr['number2'].isdecimal():
      if opr['operator'] == '-':
        opr['result'] = int(opr['number1']) - int(opr['number2'])
      else:
        opr['result'] = int(opr['number1']) + int(opr['number2'])
    else:
      return "Error: Numbers must only contain digits."
    if opr['operator'] not in ['+', '-']:
      return "Error: Operator must be '+' or '-'."
    if len(opr['number1']) > 4 or len(opr['number2']) > 4:
      return "Error: Numbers cannot be more than four digits."
  if len(expressions) > 5:
    return "Error: Too many problems."

  rows = {
    'row1': [],
    'row2': [],
    'row3': [],
    'row4': []
  }

  for expression in expressions:
    rows['row1'].append('{:>{}}'.format(expression['number1'], expression['colLen'] + 2))
    rows['row2'].append('{}{:>{}}'.format(expression['operator'], expression['number2'], expression['colLen'] + 1))
    rows['row3'].append('-' * (expression['colLen'] + 2))
    rows['row4'].append('{:>{}}'.format(expression['result'], expression['colLen'] + 2))

  result = '    '.join(rows['row1']) + '\n' + '    '.join(rows['row2']) + '\n' + '    '.join(rows['row3'])
  if displayAnsware:
    result += '\n' + '    '.join(rows['row4'])
  return result
