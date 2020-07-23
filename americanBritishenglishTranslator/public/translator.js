import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/

function getTransateInputText() {
  return document.querySelector('#text-input').value;
}

/**
 * Function that swap an object key with value.
 * @param {Object} obj object that key value should be swapped.
 * @returns {Object} return new object where key values has been swaped.
 */
function swapObjKeyVal(obj) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[obj[key]] = key;
  });
  return newObj;
}

/**
 * Funcation that translate British to American.
 * @param {string} str String that should be translate from British to American.
 * @returns {string}
 */
function translateBritishToAmerican(str) {
  const changes = [];
  let sentence = str;

  const britishOnlyKeys = Object.keys(britishOnly);
  for (let i = 0; i < britishOnlyKeys.length - 1; i++) {
    const key = britishOnlyKeys[i];
    // Look before should start of line or space
    // the word that we search for
    // look behind after blankspace or end of line or . and end of line
    const testBritshOnly = new RegExp(`(?<=(^|\\s))${key}(?=(\\s|.$|$))`, 'i');
    if (testBritshOnly.test(sentence)) {
      sentence = sentence.replace(testBritshOnly, britishOnly[key.toLowerCase()]);
      changes.push(britishOnly[key.toLowerCase()]);
    }
  }

  const britishToAmericanTitles = swapObjKeyVal(americanToBritishTitles);
  const britishToAmericanSpelling = swapObjKeyVal(americanToBritishSpelling); // {};

  const words = sentence.split(' ').map((word) => {
    const timeRegExp = /^([0-9]){2}(\.)([0-9]){2}$/;
    if (timeRegExp.test(word)) {
      changes.push(word.replace('.', ':'));
      return word.replace('.', ':');
    }
    if (word.toLocaleLowerCase() in britishToAmericanTitles) {
      const result = britishToAmericanTitles[word.toLocaleLowerCase()]
        .replace(/(^\w)/, (m) => m.toUpperCase());
      changes.push(result);
      return result;
    }
    if (word.toLocaleLowerCase() in britishToAmericanSpelling) {
      changes.push(britishToAmericanSpelling[word.toLocaleLowerCase()]);
      return britishToAmericanSpelling[word.toLocaleLowerCase()];
    }
    return word;
  });
  return {
    text: words.join(' '),
    translated: changes,
  };
}

/**
 * Funcation that translate American to British.
 * @param {string} str String that should be translate from American to British.
 * @returns {string} String translated to British.
 */
function translateAmericanToBritish(str) {
  const changes = [];
  let sentence = str;

  const americanOnlyKeys = Object.keys(americanOnly);
  for (let i = 0; i < americanOnlyKeys.length - 1; i++) {
    const key = americanOnlyKeys[i];
    // Look before should start of line or space
    // the word that we search for
    // look behind after blankspace or end of line or . and end of line
    const testAmericanOnly = new RegExp(`(?<=(^|\\s))${key}(?=(\\s|.$|$))`, 'i');
    if (testAmericanOnly.test(sentence)) {
      sentence = sentence.replace(testAmericanOnly, americanOnly[key.toLowerCase()]);
      changes.push(americanOnly[key.toLowerCase()]);
    }
  }

  const words = sentence.split(' ').map((word) => {
    const timeRegExp = /^([0-9]){2}:([0-9]){2}$/;
    if (timeRegExp.test(word)) {
      changes.push(word.replace(':', '.'));
      return word.replace(':', '.');
    }
    if (word in americanToBritishSpelling) {
      changes.push(americanToBritishSpelling[word]);
      return americanToBritishSpelling[word];
    }
    if (word.toLowerCase() in americanToBritishTitles) {
      const result = americanToBritishTitles[word.toLowerCase()]
        .replace(/(^\w)/, (m) => m.toUpperCase());
      changes.push(result);
      return result;
    }
    return word;
  });
  return {
    text: words.join(' '),
    translated: changes,
  };
}

/**
 * Function transalteOnClick do the translation from what are set in the input.
 */
function transalteOnClick() {
  const input = getTransateInputText();
  if (input.length === 0) {
    document.querySelector('#error-msg').innerHTML = 'Error: No text to translate.';
    document.querySelector('#translated-sentence').innerHTML = '';
    return;
  }
  document.querySelector('#error-msg').innerHTML = '';
  const localSelected = document.querySelector('#locale-select').value;
  const translatedSentenceDiv = document.querySelector('#translated-sentence');
  if (localSelected === 'british-to-american') {
    const translated = translateBritishToAmerican(input);
    if (translated.translated.length === 0) {
      document.querySelector('#translated-sentence').innerHTML = 'Everything looks good to me!';
    } else {
      translatedSentenceDiv.innerHTML = '';
      let txt = translated.text;
      translated.translated.forEach((el) => {
        const left = txt.indexOf(el);
        const right = txt.indexOf(el) + el.length;
        const leftText = txt.substr(0, left);
        const rightText = txt.substr(right);
        txt = rightText;
        translatedSentenceDiv.append(leftText);
        const span = document.createElement('span');
        span.classList.add('highlight');
        span.innerHTML = el;
        translatedSentenceDiv.appendChild(span);
      });
      translatedSentenceDiv.append(txt);
    }
  } else {
    const translated = translateAmericanToBritish(input);
    if (translated.translated.length === 0) {
      document.querySelector('#translated-sentence').innerHTML = 'Everything looks good to me!';
    } else {
      translatedSentenceDiv.innerHTML = '';
      let txt = translated.text;
      translated.translated.forEach((el) => {
        const left = txt.indexOf(el);
        const right = txt.indexOf(el) + el.length;
        const leftText = txt.substr(0, left);
        const rightText = txt.substr(right);
        txt = rightText;
        translatedSentenceDiv.append(leftText);
        const span = document.createElement('span');
        span.classList.add('highlight');
        span.innerHTML = el;
        translatedSentenceDiv.appendChild(span);
      });
      translatedSentenceDiv.append(txt);
    }
  }
}

/**
 * function set the fields to ''
 */
function clearOnClick() {
  document.querySelector('#translated-sentence').textContent = '';
  document.querySelector('#error-msg').textContent = '';
  document.querySelector('#text-input').value = '';
}

/**
 * When html document loaded we register some events for the translate and clear button
 */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('translate-btn').addEventListener('click', transalteOnClick);
  document.getElementById('clear-btn').addEventListener('click', clearOnClick);
});

export {
  clearOnClick,
  translateAmericanToBritish,
  translateBritishToAmerican,
  transalteOnClick,
};
