import data from './data.json' with { type: 'json' };
const { sortPairs, updates } = data;

// Each number in the dataset (49 total) is compared with every other number (48 items)
// There are then 49 * 24 = 1176 items in sortPairs
// for each update there is, then, a corresponding pair for every number combination

// Part 1
(() => {
  let total = 0;

  // combine the updates number to create the expected sort pairs
  let updatesMap = updates.reduce((acc, order) => {
    acc[order] = [];
    return acc;
  }, /** @type {Record<string, Array<string>>} */({}));
  updates.forEach((order) => {
    let parts = order.split(',');
    parts.forEach((part, i) => {
      updatesMap[order] = updatesMap[order].concat(...(parts.slice(i + 1)).map(p => `${part}|${p}`))
    })
  })
  // check for a matching sort pairs for each order
  Object.entries(updatesMap).forEach(([order, updates]) => {
    let parts = order.split(',');
    if (updates.every(rule => sortPairs.includes(rule))) {
      // find the middle number and add it to the total
      total += Number(parts[Math.round((parts.length - 1)/2)]);
    }
  })

  console.log('Day 5 Part 1: ', total);
})();

console.log('-----------------------');

// Part 2
(() => {
  let total = 0;

  let ordered = makeMap(sortPairs);
  updates.forEach(update => {
    let pages = update.split(',');
    let reorder = createReordered(pages, ordered)
    if (!pages.every((page, pageIndex) => {
      // check if every other page is in the correct position 
      // (left if before, right if after): otherPageIndex < pageIndex
      return pages.every((otherPage, otherPageIndex) => {
        if (otherPage === page) return true;
        return (!ordered[page][otherPageIndex < pageIndex ? 'right' : 'left'].includes(otherPage)) 
      })
    })) {
      let newOrder = sortPages(pages, sortPairs);
      total += Number(newOrder[Math.round((newOrder.length - 1)/2)]);
    }
  })

  // console.log(ordered);
  console.log('Day 5 Part 2: ', total);
})();

/** 
 * topological sort. had to look this one up and step through slowly to understand
 * @param {Array<string>} updates 
 * @param {Array<string>} _sortPairs
 */
function sortPages(updates, _sortPairs) {
  let graph = new Map();
  let verticesCounts = new Map();

  for (let key of updates) {
    graph.set(key, []);
    verticesCounts.set(key, 0);
  }
  for (let [before, after] of _sortPairs.map(p => p.split('|'))) {
    if (updates.includes(before) && updates.includes(after)) {
      graph.get(before).push(after);
      verticesCounts.set(after, verticesCounts.get(after) + 1);
    }
  }

  let first = verticesCounts.entries().find(([k, v]) => v === 0)[0];
  let queue = [first];
  let orderedUpdates = [];
  while (queue.length > 0) {
    let page = queue.shift();
    orderedUpdates.push(page);
    for (let nextPage of graph.get(page)) {
      verticesCounts.set(nextPage, verticesCounts.get(nextPage) - 1);
      if (verticesCounts.get(nextPage) === 0) {
        queue.push(nextPage);
      }
    }
  }

  return orderedUpdates;
}

function createReordered(pages, ordered) {
  return function reorder(page, pageIndex) {
    // check if every other page is in the correct position 
    // (left if before, right if after): otherPageIndex < pageIndex
    return pages.every((otherPage, otherPageIndex) => {
      if (otherPage === page) return true;
      return (!ordered[page][otherPageIndex < pageIndex ? 'right' : 'left'].includes(otherPage)) 
    })
  }
}

// gonna leave this here as a monument of a failed attempt
/** @param {Array<string>} _sortPairs */
function makeMap(_sortPairs) {
  /** @type {Record<string, Record<'left'| 'right', Array<string>>>} */
  let map = {};
  _sortPairs.forEach(pair => {
    let [l, r] = pair.split('|');
    if (!map[l]) map[l] = {left: [], right: []}
    if (!map[r]) map[r] = {left: [], right: []}
    map[l].right.push(r)
    map[r].left.push(l)
  })
  return map
}