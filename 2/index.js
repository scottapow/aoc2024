const data = require('./data.json');

(() => {
  let total = 0;

  data.forEach(row => {
    const numbers = row.split(' ').map(parseFloat);
    

    /** @type {'up' | 'down'} */
    let direction = numbers[0] > numbers.slice(1).reduce((a, n, _, ns) => a + n/ns.length, 0) ? 'down' : 'up';
    let problemIndices = [];

    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];
      if (i === 0) continue;

      const difference = direction === 'up' 
        ? number - numbers[i - 1]  // ascending
        : numbers[i - 1] - number; // descending
      
      if (difference < 1 || difference > 3) {
        problemIndices.push(i);
        safe = false;
      }
    }

    if (!problemIndices.length) total += 1;
  })

  console.log('Day 1 Part 1: ', total);
})();

console.log('-----------------------');