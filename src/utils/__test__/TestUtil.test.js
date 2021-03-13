import { limitText, fractionText, integerText } from '../TextUtil';

it('limitText with text higher than parameter function', () => {
  const text = 'Text bigger than 25 characters';
  const formatedText = limitText(text, 25);
  expect(formatedText).toBe('Text bigger than 25 chara...');
});

it('limitText with text smaller than parameter function', () => {
  const text = 'Text';
  const formatedText = limitText(text, 25);
  expect(formatedText).toBe(text);
});

it('fractionText', () => {
  expect(fractionText(1)).toBe(null);
  expect(fractionText(1.25)).toBe('1/4');
  expect(fractionText(1.5)).toBe('1/2');
  expect(fractionText(1.75)).toBe('3/4');
});

it('integerText must return integer value for decimal parameter', () => {
  const decimalValue = 1.5;
  const integerValue = integerText(decimalValue);
  expect(integerValue).toBe(1);
});
