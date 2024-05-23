function randomInteger (min: number, max: number): number {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

function formatNumber (num: number, options?: Intl.NumberFormatOptions): string {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    ...options
  })
}

function declOfWords (n: number, forms: string[]) {
  return n % 10 === 1 && n % 100 !== 11
    ? forms[0]
    : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? forms[1]
      : forms[2]
}

function isDev (): boolean {
  return process.env.NODE_ENV === 'development'
}

export { randomInteger, formatNumber, isDev, declOfWords }
