import data from './data.json' with { type: 'json' };
const map = [...data];

const BARRIER = '#';
const OPEN = '.';
const VISITED = 'X';

/**
 * @typedef {'left' | 'right' | 'down' | 'up'} Direction
 */

let cursor = {
  left: '<', 
  right: '>',
  down: 'v', 
  up: '^',
};

// Part 1
(() => {
  /** @type {Direction} */
  let direction = 'up';
  let total = 0;

  /** @type {[number, number]} */
  let guardLoc = null;
  let inbounds = true;

  // initial position
  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    let cursorIndex = findCursor(row, direction);
    if (cursorIndex > -1) {
      guardLoc = [i, cursorIndex];
    }
  }

  // move
  while (inbounds) {
    let [row, col] = guardLoc;
    map[row] = replaceAt(col, map[row], 'X');

    let [nextRow, nextCol] = getRowColIndices(direction, row, col);

    let nextSpot = map[nextRow]?.[nextCol];
    if (!nextSpot) {
      inbounds = false;
    } else {
      if (nextSpot === BARRIER) {
        direction = turnRight(direction);
        ([nextRow, nextCol] = getRowColIndices(direction, row, col));
        nextSpot = map[nextRow]?.[nextCol];
      }
      if (nextSpot === BARRIER) {
        console.log('WHATTTTT', nextRow, nextCol);
      }
      guardLoc = [nextRow, nextCol];
    }
  }

  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    total += (row.match(new RegExp(VISITED, 'g')) ?? []).length
  }

  map.forEach((m) => console.log(m));
  console.log('Day 6 Part 1: ', total);
})();

console.log('-----------------------');

// Part 2
(() => {
  let total = 0;

  console.log('Day 6 Part 2: ', total);
})();


/** 
 * @param {string} row
 * @param {keyof cursor} dir
 * @returns {number | null} index
 */
function findCursor(row, dir) {
  let cursorIndex = row.indexOf(cursor[dir]);
  return cursorIndex ?? null;
}

/**
 * Replace any characters with the replacement at the provided index
 * @param {number} index 
 * @param {string} input
 * @param {string} replacement 
 * @returns {string}
 */
function replaceAt(index, input, replacement) {
  let before = input.slice(0, index);
  let after = input.slice(index + 1);
  return before + replacement + after;
}

/**
 * @param {Direction} dir
 * @param {number} rowIndex
 * @param {number} colIndex
 * @returns {[number, number]}
 */
function getRowColIndices(dir, rowIndex, colIndex) {
  switch (dir) {
    case 'up': return [rowIndex - 1, colIndex];
    case 'right': return [rowIndex, colIndex + 1];
    case 'down': return [rowIndex + 1, colIndex];
    case 'left': return [rowIndex, colIndex - 1];
  }
}

/**
 * @param {Direction} dir 
 * @returns {Direction}
 */
function turnRight(dir) {
  if (dir === 'up') return 'right';
  if (dir === 'right') return 'down';
  if (dir === 'down') return 'left';
  if (dir === 'left') return 'up';
}

