import data from './data.json' with { type: 'json' };
const { sortPairs, orders } = data;

// Each number in the dataset (49 total) is compared with every other number (48 items)
// There are then 49 * 24 = 1176 items in sortPairs
// for each update there is, then, a corresponding pair for every number combination

// Part 1
(() => {
  let total = 0;

  // combine the orders number to create the expected sort pairs
  let updatesMap = orders.reduce((acc, order) => {
    acc[order] = [];
    return acc;
  }, /** @type {Record<string, Array<string>>} */({}));
  orders.forEach((order) => {
    let parts = order.split(',');
    parts.forEach((part, i) => {
      updatesMap[order] = updatesMap[order].concat(...(parts.slice(i + 1)).map(p => `${part}|${p}`))
    })
  })
  // check for a matching sort pairs for each order
  Object.entries(updatesMap).forEach(([order, updates]) => {
    if (updates.every(rule => sortPairs.includes(rule))) {
      // find the middle number and add it to the total
      let parts = order.split(',');
      total += Number(parts[Math.round((parts.length - 1)/2)]);
    }
  })

  console.log('Day 5 Part 1: ', total);
})();

console.log('-----------------------');

// Part 2
(() => {
  let total = 0;

  console.log('Day 5 Part 2: ', total);
})();