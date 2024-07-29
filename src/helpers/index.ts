import { useLocale } from 'hooks';

/* eslint-disable no-nested-ternary */
function randomInteger(min: number, max: number): number {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  if (typeof num !== 'number') {
    return num;
  }

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

function formatTimer(seconds: number, locale: ReturnType<typeof useLocale>['locale'], options?: { withDay: boolean }): string {
  if (seconds < 0) {
    return `${options?.withDay ? `0${locale('d')}` : ''} 0${locale('h')} 00${locale('m')}`;
  }

  if (options?.withDay) {
    const days = Math.floor((seconds) / (60 * 60 * 24));

    const hours = Math.floor((seconds / (60 * 60)) - (24 * days));

    const minutes = Math.ceil(seconds / 60) - (hours * 60 + days * 24 * 60);

    let timer = '';

    timer += days > 0 ? `${days}${locale('d')} ` : '';
    timer += hours > 0 ? `${hours}${locale('h')} ` : '';
    timer += minutes > 0 ? `${minutes}${locale('m')} ` : '';

    return timer;
  }

  const hours = Math.floor((seconds / (60 * 60)));

  const minutes = Math.ceil(seconds / 60) - hours * 60;

  const timer = `${hours > 0 ? hours : 0}${locale('h')} ${minutes > 0 ? minutes.toString().padStart(2, '0') : '00'}${locale('m')}`;

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

export * from './extends.hidden';
