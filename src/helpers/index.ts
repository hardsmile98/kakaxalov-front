function randomInteger (min: number, max: number): number {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

function formatNumber (num: number, options?: Intl.NumberFormatOptions): string {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, ...options })
}

function isDev (): boolean {
  return process.env.NODE_ENV === 'development'
}

export {
  randomInteger,
  formatNumber,
  isDev
}
