export default function appendOrdinalSuffix(int: number) {
  if (!Number.isInteger(int)) {
    throw new Error(
      '@function appendOrdinalSuffix() received a non-interger number'
    );
  }

  if ([11, 12, 13].indexOf(int) > -1) {
    return `${int}th`;
  }

  const finalDigit = int
    .toString()
    .split('')
    .pop();

  if (finalDigit === '1') return `${int}st`;
  if (finalDigit === '2') return `${int}nd`;
  if (finalDigit === '3') return `${int}rd`;

  return `${int}th`;
}
