// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

export const debounce = <TFunction extends AnyFunction>(
  callback: TFunction,
  waitFor?: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<TFunction>) => {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), waitFor)
  }

  debounced.cancel = () => {
    if (timeout === null) return
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
