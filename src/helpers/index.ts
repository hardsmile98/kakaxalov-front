/* eslint-disable no-nested-ternary */
function randomInteger(min: number, max: number): number {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 3,
    ...options,
  });
}

function declOfWords(n: number, forms: string[]) {
  return n % 10 === 1 && n % 100 !== 11
    ? forms[0]
    : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? forms[1]
      : forms[2];
}

function formatTimer(seconds: number): string {
  if (seconds < 0) {
    return '0 ч 00 м';
  }

  const hours = Math.floor((seconds / (60 * 60)));
  const minutes = Math.ceil(seconds / 60) - hours * 60;

  const timer = `${hours > 0 ? hours : 0} ч ${minutes > 0 ? minutes.toString().padStart(2, '0') : '00'} м`;

  return timer;
}

function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export {
  randomInteger,
  formatNumber,
  isDev,
  declOfWords,
  formatTimer,
};
