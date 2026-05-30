// Topic: Stack / strings
// Difficulty: Easy / Medium

// Реалізуй функцію validParentheses.
//
// Функція має перевірити, чи валідний рядок із дужками.
//
// Валідний рядок означає:
// - кожна відкрита дужка має відповідну закриту;
// - дужки закриваються у правильному порядку;
// - тип дужки має збігатися: (), [], {}.

// Rules
// Input contains only these characters:
// '(', ')', '[', ']', '{', '}'

// Expected complexity:
// Time: O(n)
// Space: O(n)

// Hint category
// Use a stack.

function validParentheses(str: string): boolean {
  const normalized = str.replace(/[^\(\)\[\]\{\}]/g, '')
}

validParentheses('()')
// true

validParentheses('()[]{}')
// true

validParentheses('(]')
// false

validParentheses('([)]')
// false

validParentheses('{[]}')
// true

validParentheses('((()))')
// true

validParentheses('((())')
// false

validParentheses(']')
// false

validParentheses('')
// true
