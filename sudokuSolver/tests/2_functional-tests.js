/* eslint-disable no-undef */
/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/
const chai = require('chai');

const { assert } = chai;
let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });

  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', (done) => {
      const input = Solver.parsePuzzleString('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
      document.getElementById('text-input').value = input;
      Solver.solvepuzzle(input);
      Solver.popGrid(input);
      assert.equal(document.getElementById('I6').value, '5');
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', (done) => {
      const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      document.getElementById('text-input').value = input;
      Solver.popGrid(Solver.parsePuzzleString(input));
      document.getElementById('A2').value = '3';
      Solver.updateTextAreaFromGrid();
      assert.equal(
        document.getElementById('text-input').value,
        '135..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      );
      done();
    });
  });

  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku
    // grid and the text area
    test('Function clearInput()', (done) => {
      Solver.clear();
      assert.equal(document.getElementById('text-input').value, '');
      done();
    });

    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', (done) => {
      const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      document.getElementById('text-input').value = input;
      Solver.popGrid(Solver.parsePuzzleString(input));
      Solver.solve();
      assert.equal(
        document.getElementById('text-input').value,
        '135762984946381257728459613694517832812936745357824196473298561581673429269145378',
      );
      done();
    });
  });
});
