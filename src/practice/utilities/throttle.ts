// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

const throttle = <TFunc extends AnyFunction>(fn: TFunc, delay?: number) => {
  let isThrottled = false
  let timer: ReturnType<typeof setTimeout> | null = null

  const throttled = (...args: Parameters<TFunc>) => {
    if (isThrottled) return

    fn(...args)
    isThrottled = true

    timer = setTimeout(() => {
      isThrottled = false
    }, delay)
  }

  throttled.cancel = () => {
    isThrottled = false
    if (timer === null) return
    clearTimeout(timer)
    timer = null
  }

  return throttled
}
