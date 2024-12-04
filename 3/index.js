import fs from 'fs';

const data = fs.readFileSync(new URL('data.txt', import.meta.url), 'utf-8');

let sequence = ['m', 'u', 'l', '(', '#', ',', '#', ')'];
let cmdSequence = ['d', 'o', '(n', ')\'', 't', '(', ')'];

const CAPTURE_PATTERN = /mul\((?<one>\d{1,3}),(?<two>\d{1,3})\)/gm;

// Part 1
(() => {
  let total = 0;
  let capture = '';
  let wantNext = sequence[0];
  for (let i = 0; i < data.length; i++) {
    const char = data[i];

    // check if the character matches the next possible character
    if (wantNext.includes(char.replace(/\d/, '#'))) {
      // if match wantNext: add to capture
      capture = capture + char;
    } else {
      // else: clear capture, set wantNext to sequence[0], continue;
      capture = '';
      wantNext = sequence[0];
      // after clear, check if the sequence is starting over with 'm'
      if (char === wantNext) {
        capture += char;
      } else {
        continue;
      }
    }

    // check for completion
    const checkResult = CAPTURE_PATTERN.exec(capture);
    if (checkResult !== null) {
      // if capture complete: validate and parse with regex, add to total, clear capture, set wantNext to sequence[0], continue;
      total += Number(checkResult.groups.one) * Number(checkResult.groups.two);
      capture = '';
      wantNext = sequence[0];
      continue;
    } else {
      // updated the next wanted character set
      let lastChar = capture[capture.length - 1];
      if (['m', 'u', 'l', '(', ','].includes(lastChar)) {
        wantNext = sequence[sequence.indexOf(char) + 1];
        continue;
      }
      // lastChar is a number
      let secondToLast = capture.charAt(capture.length - 2).replace(/\d/, '#');
      let thirdToLast = capture.charAt(capture.length - 3).replace(/\d/, '#');
      let fourthToLast = capture.charAt(capture.length - 4).replace(/\d/, '#');

      if (secondToLast === '(') wantNext = '#,';
      if (secondToLast === ',') wantNext = '#)';
      if (secondToLast === '#') {
        if (thirdToLast === '(') wantNext = '#,';
        if (thirdToLast === ',') wantNext = '#)';
        if (thirdToLast === '#') {
          if (fourthToLast === '(') wantNext = ',';
          if (fourthToLast === ',') wantNext = ')';
        }
      }
    }
  }

  console.log('Day 3 Part 1: ', total);
})();

console.log('-----------------------');

const DO = 'do()';
const DONT = `don't()`;

// Part 2
(() => {
  let total = 0;
  let capture = '';
  let wantNext = `${sequence[0]}${DO[0]}`;
  let on = true;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];

    // check if the character matches the next possible character
    if (wantNext.includes(char.replace(/\d/, '#'))) {
      // if match wantNext: add to capture
      capture = capture + char;
    } else {
      // else: clear capture, set wantNext to sequence[0], continue;
      capture = '';
      wantNext = `${sequence[0]}${DO[0]}`;
      // after clear, check if the sequence is starting over with 'm'
      if (char === wantNext) {
        capture += char;
      } else {
        continue;
      }
    }

    // check for completion
    const mulResult = CAPTURE_PATTERN.exec(capture);
    if (mulResult !== null) {
      // if capture complete: validate and parse with regex, add to total, clear capture, set wantNext to sequence[0], continue;
      if (on) {
        total += Number(mulResult.groups.one) * Number(mulResult.groups.two);
      }
      capture = '';
      wantNext = `${sequence[0]}${DO[0]}`;
      continue;
    } 
    if (capture === DO) {
      on = true
      capture = '';
      wantNext = `${sequence[0]}${DO[0]}`;
      continue;
    }
    if (capture === DONT) {
      on = false;
      capture = '';
      wantNext = `${sequence[0]}${DO[0]}`;
      continue;
    }

    let secondToLast = capture.charAt(capture.length - 2).replace(/\d/, '#');
    let thirdToLast = capture.charAt(capture.length - 3).replace(/\d/, '#');
    let fourthToLast = capture.charAt(capture.length - 4).replace(/\d/, '#');

    const trackingDo = DO.includes(capture);
    const trackingDont = DONT.includes(capture) 
    if (trackingDo || trackingDont) {
      wantNext = cmdSequence[cmdSequence.findIndex(c => c.includes(char)) + 1];
    } else {
      // updated the next wanted character set
      if (['m', 'u', 'l', '(', ','].includes(char)) {
        wantNext = sequence[sequence.indexOf(char) + 1];
        continue;
      }

      // lastChar is a number
      if (secondToLast === '(') wantNext = '#,';
      if (secondToLast === ',') wantNext = '#)';
      if (secondToLast === '#') {
        if (thirdToLast === '(') wantNext = '#,';
        if (thirdToLast === ',') wantNext = '#)';
        if (thirdToLast === '#') {
          if (fourthToLast === '(') wantNext = ',';
          if (fourthToLast === ',') wantNext = ')';
        }
      }
    }
  }

  console.log('Day 3 Part 2: ', total);
})();