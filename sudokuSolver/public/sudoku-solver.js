import { puzzlesAndSolutions } from './puzzle-strings.js';

function validNum(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    const squareCol = 3 * Math.floor(col / 3) + Math.floor(i / 3);
    const squareRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    if (board[row][i] === num || board[i][col] === num || board[squareRow][squareCol] === num) {
      return false;
    }
  }
  return true;
}

function solvepuzzle(puzzel) {
  const board = puzzel;
  if (!puzzel.flat().includes('')) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const num = +board[i][j];
        board[i][j] = '';
        if (!validNum(board, i, j, num)) {
          return false;
        }
        board[i][j] = num;
      }
    }
    return true;
  }
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // find first unsset cell
      if (!board[row][col]) {
        for (let num = 1; num < 10; num++) {
          if (validNum(board, row, col, num)) {
            board[row][col] = num;
            if (solvepuzzle(board)) {
              return true;
            }
            board[row][col] = '';
          }
        }
        return false;
      }
    }
  }
  return true;
}

function RandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const getRandomInt = RandomInt(5);

function parsePuzzleString(str) {
  const puzzleString = str;
  const grid = puzzleString.split('').reduce((prevVal, curVal, idx) => {
    const row = Math.floor(idx / 9);
    const reminder = idx % 9;
    if (reminder === 0) {
      prevVal.push([curVal === '.' ? '' : +curVal]);
    } else {
      prevVal[row].push(curVal === '.' ? '' : +curVal);
    }
    return prevVal;
  }, []);
  return grid;
}

function validatePuzzleString(str) {
  const validateRegExp = /^([1-9]|\.){81}$/;
  if (validateRegExp.test(str)) {
    document.getElementById('error-msg').innerHTML = '';
    return true;
  }
  document.getElementById('error-msg').innerHTML = 'Error: Expected puzzle to be 81 characters long.';
  return false;
}

function generateID(rowNum, colNum) {
  const RowChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  return `${RowChar[rowNum]}${colNum}`;
}

function popGrid(grid) {
  grid.forEach((i, rowIdx) => {
    i.forEach((cellValue, colIdx) => {
      const cell = document.getElementById(generateID(rowIdx, colIdx + 1));
      if (cellValue) {
        cell.value = cellValue;
      } else {
        cell.value = '';
      }
    });
  });
}

const textArea = document.getElementById('text-input');

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  console.log('load');
  const [puzzelString] = puzzlesAndSolutions[getRandomInt];
  textArea.value = puzzelString;
  const grid = parsePuzzleString(textArea.value);
  if (validatePuzzleString(textArea.value)) {
    console.log('valid puzzelstr');
  } else {
    console.log('not valid puzzelstr');
  }
  popGrid(grid);
});

function validateInput(chr) {
  const regExp = /^([1-9])$/g;
  return regExp.test(chr.toString(8));
}

function updateTextAreaFromGrid() {
  const gridValues = [];
  const t = document.getElementById('tbl');
  const c = t.getElementsByTagName('tr');
  for (let i = 0; i < c.length; i++) {
    const cc = c[i].getElementsByTagName('td');
    for (let j = 0; j < cc.length; j++) {
      const { value: value1 } = cc[j].getElementsByTagName('input')[0];
      gridValues.push(value1 || '.');
    }
  }
  textArea.value = gridValues.join('');
}

function updateValue(e) {
  console.log('trigger update value');
  const { value } = e.srcElement;
  if (!validateInput(value)) {
    e.srcElement.value = '';
    document.getElementById('error-msg').innerHTML = 'Error: Expected input to be [1-9].';
    return;
  }
  document.getElementById('error-msg').innerHTML = '';
  updateTextAreaFromGrid();
}

document.getElementById('sudoku-grid').addEventListener('input', updateValue, false);
function updateGridFromTextInput() {
  if (validatePuzzleString(textArea.value)) {
    const grid = parsePuzzleString(textArea.value);
    popGrid(grid);
  }
}

document.getElementById('text-input').addEventListener('input', updateGridFromTextInput, false);
function solve() {
  const board = parsePuzzleString(textArea.value);
  if (!solvepuzzle(board)) {
    console.log('No Solution');
  }
  popGrid(board);
  textArea.value = board.flat().join('');
}

document.getElementById('solve-button').addEventListener('click', solve);

function clear() {
  textArea.value = '';
}

document.getElementById('clear-button').addEventListener('click', clear);

/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    parsePuzzleString,
    generateID,
    validatePuzzleString,
    validateInput,
    solvepuzzle,
    popGrid,
    solve,
    clear,
    updateTextAreaFromGrid,
  };
} catch (e) {}
