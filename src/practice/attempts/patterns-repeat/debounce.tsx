import { useEffect, useMemo, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

export const debounce = <TFunction extends AnyFunction>(
  fn: TFunction,
  delay?: number
) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<TFunction>) => {
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }

  debounced.cancel = () => {
    if (timer === null) return
    clearTimeout(timer)
    timer = null
  }

  return debounced
}

export const useDebounce = <TValue,>(value: TValue, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<TValue>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value))
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export const FunComponent = () => {
  const [value, setValueRaw] = useState('harry')
  const setValue = useMemo(() => debounce(setValueRaw, 500), [])

  return (
    <>
      <div>{value}</div>
      <div>
        <input
          defaultValue={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  )
}

export const NotFunComponent = () => {
  const [value, setValue] = useState('harry')
  const debouncedValue = useDebounce(value, 500)

  return (
    <>
      <div>{debouncedValue}</div>
      <div>
        <input
          defaultValue={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  )
}
