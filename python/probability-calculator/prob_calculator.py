import copy
import random
# Consider using the modules imported above.

class Hat:
  def __init__(self, **kwargs):
    self.contents = []

    for k, v in kwargs.items():
      for _ in range(v):
        self.contents.append(k)

  def draw(self, num):
    if num > len(self.contents):
      drawn_balls = [i for i in self.contents]
      self.contents.clear()
      return drawn_balls

    idx_drawn_balls = random.sample(range(len(self.contents)), k=num)
    drawn_balls = [self.contents[i] for i in idx_drawn_balls]

    self.contents = [self.contents[i] for i in range(len(self.contents)) if not i in idx_drawn_balls]

    return drawn_balls


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    success_cnt = 0

    for _ in range(num_experiments):
        copy_hat = copy.deepcopy(hat)
        drawn_balls = copy_hat.draw(num_balls_drawn)

        for color, number in expected_balls.items():
            if drawn_balls.count(color) < number:
                break
        else:
            success_cnt += 1

    return success_cnt / num_experiments
