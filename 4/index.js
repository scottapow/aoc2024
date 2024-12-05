import rows from './data.json' with { type: 'json' };
const input = rows.map(row => row.split(''));
const WORD = 'XMAS';
// const letterMap = createLetterMap(input, WORD);

const directions = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

/**
 * @typedef {number} RowIndex
 * @typedef {number} ColIndex
 */

// Part 1
(() => {
  let total = 0;

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

  console.log('Day 4 Part 2: ', total);
})();