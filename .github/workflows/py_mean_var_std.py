name: Mean Variance Standard Deviation Calculator ci
on:
  push:
    paths:
      - 'python/mean-var-std/**'
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.8]
    steps:
    - uses: actions/checkout@v1
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v2
      with:
        python-version: ${{ matrix.python-version }}
   - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
    - name: Run python unit tests
      working-directory: ./python/time-calculator
      run: |
        python -m unittest test_module
