import numpy as np

def calculate(list):
  if len(list) != 9:
    raise ValueError('List must contain nine numbers.')
  arr = np.array(list).reshape(3, 3)
  obj = {}

  obj['mean'] = [arr.mean(axis=0).tolist(), arr.mean(axis=1).tolist(), arr.mean()]
  obj['variance'] = [arr.var(axis=0).tolist(), arr.var(axis=1).tolist(), arr.var()]
  obj['standard deviation'] = [arr.std(axis=0).tolist(), arr.std(axis=1).tolist(), arr.std()]
  obj['max'] = [arr.max(axis=0).tolist(), arr.max(axis=1).tolist(), arr.max()]
  obj['min'] = [arr.min(axis=0).tolist(), arr.min(axis=1).tolist(), arr.min()]
  obj['sum'] = [arr.sum(axis=0).tolist(), arr.sum(axis=1).tolist(), arr.sum()]

  return obj