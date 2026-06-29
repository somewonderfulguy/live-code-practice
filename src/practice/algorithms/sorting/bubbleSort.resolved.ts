export function bubbleSort(numbers: number[]): number[] {
  for (let end = numbers.length - 1; end > 0; end--) {
    let swapped = false

    for (let i = 0; i < end; i++) {
      if (numbers[i] > numbers[i + 1]) {
        const temp = numbers[i]
        numbers[i] = numbers[i + 1]
        numbers[i + 1] = temp
        swapped = true
      }
    }

    if (!swapped) {
      break
    }
  }

  return numbers
}
