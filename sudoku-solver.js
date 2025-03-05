const SATInstance = require('sat-solver-js');
const sat = new SATInstance();

function varName(i, j, d) {
  return `X${i}${j}${d}`;
}

// Each cell gets at least one digit.
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    let clause = [];
    for (let d = 1; d <= 9; d++) {
      clause.push(varName(i, j, d));
    }
    sat.parseClause(clause.join(' '));
  }
}

// Each cell gets at most one digit (pairwise constraints).
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    for (let d1 = 1; d1 <= 9; d1++) {
      for (let d2 = d1 + 1; d2 <= 9; d2++) {
        sat.parseClause(`~${varName(i, j, d1)} ~${varName(i, j, d2)}`);
      }
    }
  }
}

// Each digit appears at most once in each row.
for (let i = 1; i <= 9; i++) {
  for (let d = 1; d <= 9; d++) {
    for (let j1 = 1; j1 <= 9; j1++) {
      for (let j2 = j1 + 1; j2 <= 9; j2++) {
        sat.parseClause(`~${varName(i, j1, d)} ~${varName(i, j2, d)}`);
      }
    }
  }
}

// Each digit appears at most once in each column.
for (let j = 1; j <= 9; j++) {
  for (let d = 1; d <= 9; d++) {
    for (let i1 = 1; i1 <= 9; i1++) {
      for (let i2 = i1 + 1; i2 <= 9; i2++) {
        sat.parseClause(`~${varName(i1, j, d)} ~${varName(i2, j, d)}`);
      }
    }
  }
}

// Each digit appears at most once in each 3x3 block.
for (let blockRow = 0; blockRow < 3; blockRow++) {
  for (let blockCol = 0; blockCol < 3; blockCol++) {
    for (let d = 1; d <= 9; d++) {
      let cells = [];
      // Collect all cells in this 3x3 block.
      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
          const row = blockRow * 3 + i;
          const col = blockCol * 3 + j;
          cells.push({ row, col });
        }
      }
      // Add pairwise constraints for cells within the same block.
      for (let a = 0; a < cells.length; a++) {
        for (let b = a + 1; b < cells.length; b++) {
          const cellA = cells[a];
          const cellB = cells[b];
          sat.parseClause(`~${varName(cellA.row, cellA.col, d)} ~${varName(cellB.row, cellB.col, d)}`);
        }
      }
    }
  }
}

//"Givens" from a Sudoku puzzle.
// Each given is in the form [row, col, digit].
// Example Puzzle
const givens = [
  [1, 1, 5], [1, 2, 3], [1, 5, 7],
  [2, 1, 6], [2, 4, 1], [2, 5, 9], [2, 6, 5],
  [3, 2, 9], [3, 3, 8], [3, 8, 6],
  [4, 1, 8], [4, 5, 6], [4, 9, 3],
  [5, 1, 4], [5, 4, 8], [5, 6, 3], [5, 9, 1],
  [6, 1, 7], [6, 5, 2], [6, 9, 6],
  [7, 2, 6], [7, 7, 2], [7, 8, 8],
  [8, 4, 4], [8, 5, 1], [8, 6, 9], [8, 9, 5],
  [9, 5, 8], [9, 8, 7], [9, 9, 9]
];

for (const [i, j, d] of givens) {
  // A given cell is forced to that digit.
  sat.parseClause(varName(i, j, d));
}

const solutions = sat.solutions();

if (solutions.length === 0) {
  console.log("No solution found.");
} else {
  const sol = solutions[0];
  console.log("Sudoku solution:");
  console.log(sol);

  function printSudoku(solutionStr) {
    const literals = solutionStr.split(', ').filter(lit => !lit.startsWith('~'));

    // grid filled with zeros.
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    literals.forEach(lit => {
      const s = lit.substring(1); // remove the "X" prefix, e.g., "115"
      const row = parseInt(s[0], 10) - 1;
      const col = parseInt(s[1], 10) - 1;
      const digit = parseInt(s[2], 10);
      grid[row][col] = digit;
    });

    console.log("Sudoku Grid:");
    grid.forEach(row => {
      console.log(row.join(" "));
    });
  }
  printSudoku(sol);
}
