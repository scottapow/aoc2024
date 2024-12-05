import data from './data.json' with { type: 'json' };

(() => {
  let total = 0;
  let dedeuped1 = data.list1.sort();
  let dedeuped2 = data.list2.sort();
  for (let i = 0; i < dedeuped1.length; i++) {
    const one = dedeuped1[i];
    const two = dedeuped2[i];
    const difference = two - one;
    total += Math.abs(difference);
  }
  console.log('Day 1 Part 1: ', total);
})();

console.log('-----------------------');

(() => {
  let total = 0;
  let frequencyMap = data.list2.reduce((acc, cur) => {
    if (cur.toString() in acc) {
      acc[cur] = acc[cur] += 1
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, /** @type {Record<string, number>} */({}));

  for (const num of data.list1) {
    if (num.toString() in frequencyMap) {
      total += frequencyMap[num] * num;
    }
  }

  console.log('Day 1 Part 2: ', total);
})();