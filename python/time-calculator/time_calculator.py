def add_time(start, duration, startDay=None):
  weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  period = start.split(' ')[1]
  hour = int(start.split(' ')[0].split(':')[0])
  minute = int(start.split(' ')[0].split(':')[1])

  durationHour = int(duration.split(':')[0])
  durationMinute = int(duration.split(':')[1])

  if period == 'PM':
    hour += 12
  hour += int((minute + durationMinute) / 60)
  minute = (minute + durationMinute) % 60
  hour += durationHour
  days = int(hour / 24)
  hour = hour % 24
  if hour >= 12:
    period = 'PM'
  else:
    period = 'AM'
  hour = hour % 12

  if hour == 0:
    hour += 12
  new_time = "{}:{:0>2} {}".format(hour, minute, period)

  if not startDay == None:
    dayText = weekDays[(weekDays.index(startDay.lower()) + days) % 7]
    new_time += ', {}'.format(dayText.capitalize())
  if days > 1:
    new_time += ' ({} days later)'.format(days)
  if days == 1:
    new_time += ' (next day)'

  return new_time