const data = require('./data.json');

(() => {
  let total = 0;
  let dedeuped1 = data.list1.sort();
  let dedeuped2 = data.list2.sort();
  for (let i = 0; i < dedeuped1.length; i++) {
    const one = dedeuped1[i];
    const two = dedeuped2[i];
    const difference = two - one;
    const toAdd = (difference < 0 ? Math.abs(difference) : difference)
    console.log(one, two)
    total += toAdd;
  }
  console.log(total);
})();