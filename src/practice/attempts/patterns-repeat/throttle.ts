// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

const throttle = <TFunc extends AnyFunction>(func: TFunc, delay?: number) => {
  let isThrottled = false
  let timer: ReturnType<typeof setTimeout> | null = null
  let pendingArgs: Parameters<TFunc> | null = null

  const throttled = (...args: Parameters<TFunc>) => {
    if (isThrottled) return

    isThrottled = true
    pendingArgs = args
    func(pendingArgs)

    setTimeout(() => {
      isThrottled = false
      pendingArgs = null
    }, delay)
  }

  throttled.cancel = () => {
    isThrottled = false
    pendingArgs = null
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  throttled.flush = () => {
    if (pendingArgs) func(pendingArgs)
    throttled.cancel()
  }

  return throttled
}

type ThrottleOptions = {
  leading?: boolean
  trailing?: boolean
}

function throttleLeading<TFunc extends AnyFunction>(
  fn: TFunc,
  wait: number,
  options: ThrottleOptions = {}
) {
  const { leading = true, trailing = true } = options

  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<TFunc> | null = null

  const throttled = (...args: Parameters<TFunc>) => {
    if (!timer) {
      if (leading) {
        fn(...args)
      } else if (trailing) {
        lastArgs = args
      }

      timer = setTimeout(() => {
        timer = null

        if (trailing && lastArgs) {
          fn(...lastArgs)
          lastArgs = null
        }
      }, wait)

      return
    }

    if (trailing) {
      lastArgs = args
    }
  }

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    lastArgs = null
  }

  return throttled
}
