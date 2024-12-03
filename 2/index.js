const data = require('./data.json');

(() => {
  let total = 0;

  data.forEach(row => {
    const numbers = row.split(' ').map(parseFloat);
    console.log(numbers)
    /** @type {'up' | 'down'} */
    let direction;
    let safe = true;
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];
      if (i === 0) continue;

      // for the second number, set the direction
      if (i === 1) {
        if (number === numbers[0]) {
          safe = false;
          break;
        }
        if (number > numbers[0]) {
          direction = 'up';
        } else {
          direction = 'down';
        }
      }

      const difference = direction === 'up' 
        ? number - numbers[i - 1]  // ascending
        : numbers[i - 1] - number; // descending
      
      if (difference < 1 || difference > 3) {
        safe = false;
        break;
      }
    }

    if (safe) total += 1;
  })

  console.log('Day 1 Part 1: ', total);
})();

console.log('-----------------------');