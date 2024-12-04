const data = require('./data.json');

// Part 1
(() => {
  let total = 0;

  data.forEach(row => {
    const numbers = row.split(' ').map(parseFloat);
    /** @type {'up' | 'down'} */
    let direction = numbers[0] > numbers.slice(1).reduce((a, n, _, ns) => a + n/ns.length, 0) ? 'down' : 'up';
    let problemIndices = checkSafety(numbers, direction);
    if (!problemIndices.length) total += 1;
  })

  console.log('Day 2 Part 1: ', total);
})();

console.log('-----------------------');

// Part 2
(() => {
  let total = 0;

  data.forEach(row => {
    const numbers = row.split(' ').map(parseFloat);
    /** @type {'up' | 'down'} */
    let direction = numbers[0] > numbers.slice(1).reduce((a, n, _, ns) => a + n/ns.length, 0) ? 'down' : 'up';
    let problemIndices = checkSafety(numbers, direction);

    if (!problemIndices.length) {
      total += 1;
      return;
    }

    for (const i of problemIndices) {
      let faultToleratedProblemIndices = checkSafety(numbers.toSpliced(i, 1), direction);
      if (!faultToleratedProblemIndices.length) {
        total += 1;
        break;
      }
    }
  })

  console.log('Day 2 Part 2: ', total);
})();

/**
 * @param {Array<number>} numbers 
 * @param {'up' | 'down'} direction 
 * @returns {Array<number>} indices
 */
function checkSafety(numbers, direction) {
  let problemIndices = [];

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    if (i === (numbers.length - 1)) continue;

    const difference = direction === 'up' 
      ? numbers[i + 1] - number  // ascending
      : number - numbers[i + 1]; // descending
    
    if (difference < 1 || difference > 3) {
      problemIndices.push(i, i+1);
      safe = false;
    }
  }

  return [...new Set(problemIndices)];
}