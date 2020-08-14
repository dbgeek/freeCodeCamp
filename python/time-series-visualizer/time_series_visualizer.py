import datetime
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = df = pd.read_csv('fcc-forum-pageviews.csv', index_col=0, parse_dates=[0])

# Clean data
df = df.loc[
    (df['value'] >= df['value'].quantile(0.025)) &
    (df['value'] <= df['value'].quantile(0.975))
]


def draw_line_plot():
    # Draw line plot
    start_date = df.index[0].strftime("%-m/%Y")
    end_date = df.index[-1].strftime("%-m/%Y")

    fig, ax1 = plt.subplots(figsize=(15, 5))

    plt.plot(df.index, df["value"], color="red")

    ax1.set_ylabel('Page Views')
    ax1.set_xlabel('Date')
    ax1.set_title("Daily freeCodeCamp Forum Page Views {}-{}".format(start_date, end_date))


    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig

def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = df.copy()
    df_bar = df_bar.groupby(pd.Grouper(freq='M')).mean()
    df_bar['YEAR'] = df_bar.index.strftime("%Y")
    df_bar['MONTH'] = df_bar.index.strftime("%B")
    months_sorted =[datetime.date(2000, m, 1).strftime('%B') for m in range(1, 13)]

    # Draw bar plot

    fig, ax1 = plt.subplots(figsize=(10, 10))
    sns.barplot(x="YEAR", y="value", hue="MONTH",
                data=df_bar, palette="bright", hue_order=months_sorted)

    ax1.legend(loc='upper left', title='Months')
    ax1.set_ylabel('Average Page Views')
    ax1.set_xlabel('Years')
    ax1.set_xticklabels(ax1.get_xticklabels(), rotation=90)

    # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig

def draw_box_plot():
    # Prepare data for box plots (this part is done!)
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box['year'] = [d.year for d in df_box.date]
    df_box['month'] = [d.strftime('%b') for d in df_box.date]
    months_sorted =[datetime.date(2000, m, 1).strftime('%b') for m in range(1, 13)]

    # Draw box plots (using Seaborn)
    plot_objects = plt.subplots(nrows=1, ncols=2, figsize=(25, 10))

    fig, ((ax1, ax2)) = plot_objects
    sns.boxplot(x="year", y="value", data=df_box, ax=ax1)
    sns.boxplot(x="month", y="value", data=df_box, ax=ax2, order=months_sorted)

    ax1.set_ylabel('Page Views')
    ax1.set_xlabel('Year')

    ax2.set_ylabel('Page Views')
    ax2.set_xlabel('Month')

    ax1.set_title("Year-wise Box Plot (Trend)")
    ax2.set_title("Month-wise Box Plot (Seasonality)")

    # Save image and return fig (don't change this part)
    fig.savefig('box_plot.png')
    return fig
