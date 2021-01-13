export const formatNumber = (value: string, pattern: string) => {
  if (!value) {
    return '';
  }
  let i = 0;
  const v = value.toString().replace(/\D/g, '');
  return v.length === pattern.split('').filter((e) => e === '#').length
    ? pattern.replace(/#/g, () => v[i++])
    : value;
};

export const strToNumbers = (str: string) => str.replace(/\D/g, '');
