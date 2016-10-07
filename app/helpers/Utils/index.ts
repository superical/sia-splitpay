export function classNamesConcat(...classNames: string[]): string {
  return classNames.reduce((state, cur) => {
    return state.concat(` ${cur}`);
  })
}

export function moneyFormatter(amt: number): string {
  return Number((amt).toFixed(2)).toLocaleString(undefined, {minimumFractionDigits: 2})
}