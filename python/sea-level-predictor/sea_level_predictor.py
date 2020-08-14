import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')

    # Create scatter plot
    plot_objects = plt.subplots(nrows=1, ncols=1, figsize=(20, 10))

    _, ((ax1)) = plot_objects

    ax1.set_xlabel('Year')
    ax1.set_ylabel('CSIRO Adjusted Sea Level')

    _ = ax1.scatter(
        df['Year'],
        df['CSIRO Adjusted Sea Level']
    )

    # Create first line of best fit
    x = df['Year']
    y = df['CSIRO Adjusted Sea Level']

    slope, intercept, _, _, _ = linregress(x, y)

    x2 = list(range(1880, 2050))
    y2 = [intercept + slope*year for year in x2]

    ax1.plot(x2, y2, 'r', label = 'Bests Fit Line 1')

    # Create second line of best fit
    xfuture = df[df['Year'] >= 2000] ['Year']
    yfuture = df[df['Year'] >= 2000] ['CSIRO Adjusted Sea Level']

    newfit = linregress(xfuture, yfuture)
    newslope = newfit.slope
    newintercept = newfit.intercept

    x3 = list(range(2000, 2050))
    y3 = [newintercept + newslope * xfuture for xfuture in x3]

    ax1.plot(x3, y3, 'r', label = 'Best Fit Line 2', color='green')

    # Add labels and title
    ax1.set_xlabel('Year')
    ax1.set_ylabel('Sea Level (inches)')
    ax1.set_title("Rise in Sea Level")

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()