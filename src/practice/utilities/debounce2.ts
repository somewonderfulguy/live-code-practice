// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

export const debounce = <TFunction extends AnyFunction>(
  callback: TFunction,
  waitFor = 0
) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<TFunction>) => {
    if (timer !== null) clearTimeout(timer)

    timer = setTimeout(() => {
      callback(...args)
    }, waitFor)
  }

  debounced.cancel = () => {
    if (timer === null) return
    clearTimeout(timer)
    timer = null
  }

  return debounced
}
