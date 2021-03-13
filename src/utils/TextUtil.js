export const limitText = (text, limit = 25) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

export const fractionText = (value) => {
  const decimalValue = value % 1;
  let fractionText;
  switch (decimalValue) {
    case 0.75:
      fractionText = '3/4';
      break;
    case 0.5:
      fractionText = '1/2';
      break;
    case 0.25:
      fractionText = '1/4';
      break;
    default:
      fractionText = '.' + decimalValue;
  }
  return decimalValue > 0 ? `${fractionText}` : null;
};

export const integerText = (value) => {
  const decimalValue = value % 1;
  return value - decimalValue;
};
