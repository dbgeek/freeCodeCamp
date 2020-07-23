/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');

const {assert} = chai;

let Translator;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    Translator = require('../public/translator.js');
  });

  suite('Function ____()', () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    // document.querySelector('#locale-select').value = 'british-to-american';

    test("Translation appended to the `translated-sentence` `div`", done => {
      const input = 'Mangoes are my favorite fruit.';
      const output = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
      document.querySelector('#text-input').value = input;
      Translator.transalteOnClick();

      assert.equal(document.querySelector('#translated-sentence').innerHTML, output);
      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      const input = 'Mangoes are my favourite fruit.';
      const output = 'Everything looks good to me!';
      document.querySelector('#text-input').value = input;
      Translator.transalteOnClick();

      assert.equal(document.querySelector('#translated-sentence').innerHTML, output);
      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {const input = 'Mangoes are my favourite fruit.';
      const output = 'Error: No text to translate.';
      document.querySelector('#text-input').value = '';
      Translator.transalteOnClick();

      assert.equal(document.querySelector('#error-msg').innerHTML, output);
      done();
    });
  });

  suite('Function ____()', () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      Translator.clearOnClick();
      assert.strictEqual(document.querySelector('#text-input').value, '');
      assert.strictEqual(document.querySelector('#translated-sentence').textContent, '');
      assert.strictEqual(document.querySelector('#error-msg').textContent, '');
      done();
    });
  });
});
