import rows from './data.json' with { type: 'json' };
const WORD = 'XMAS';

/**
 * @typedef {number} RowIndex
 * @typedef {number} ColIndex
 */

// Part 1
(() => {
  let total = 0;

  const directions = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1],
  ];
  rows.forEach((row, rowIndex) => {
    row.split('').forEach((letter, colIndex) => {
      if (WORD[0] === letter) {
        directions.forEach(([x, y]) => {
          let nextLetter = rows[rowIndex + y]?.[colIndex + x];
          if (nextLetter) {
            if (WORD[1] === nextLetter) {
              if (WORD[2] === rows[rowIndex + (y * 2)]?.[colIndex + (x * 2)]) {
                if (WORD[3] === rows[rowIndex + (y * 3)]?.[colIndex + (x * 3)]) {
                  total++;
                }
              }
            }
          }
        })
      }
    })
  })

  console.log('Day 4 Part 1: ', total);
})();

console.log('-----------------------');

// Part 2
(() => {
  let total = 0;

  const directions = [
    [-1, -1], [1, -1],
    [-1, +1], [1, +1],
  ];
  rows.forEach((row, rowIndex) => {
    row.split('').forEach((letter, colIndex) => {
      if (letter === 'A') {
        let masses = 0;
        directions.forEach(([x, y]) => {
          if (rows[rowIndex + y]?.[colIndex + x] === 'M') {
            if (rows[rowIndex + (y * -1)]?.[colIndex + (x * -1)] === 'S') {
              masses++;
            }
           }
        });
        if (masses === 2) {
          total++;
        }
      }
    })
  })

  console.log('Day 4 Part 2: ', total);
})();