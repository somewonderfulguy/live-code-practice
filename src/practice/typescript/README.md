# TypeScript Practice

Practice the relationship between runtime values and compile-time guarantees.
Start with useful generic functions, then work through narrowing, literal
inference and reusable type transformations.

Each exercise has a practice file and a matching `.resolved.ts` reference.
Practice signatures are deliberately broad and type aliases begin as `unknown`:
writing the correct types is part of the exercise. Function bodies throw a
TODO error until implemented.

## Recommended Order

| Order | Practice file | Main idea |
| --- | --- | --- |
| 1 | [getProperty.ts](getProperty.ts) | Generics, `keyof`, indexed access |
| 2 | [pluck.ts](pluck.ts) | Array element inference and readonly inputs |
| 3 | [updateEntity.ts](updateEntity.ts) | Partial updates and inference boundaries |
| 4 | [narrowing.ts](narrowing.ts) | `unknown`, guards, discriminated unions, `never` |
| 5 | [literals.ts](literals.ts) | `as const`, `satisfies`, derived unions and event names |
| 6 | [mappedTypes.ts](mappedTypes.ts) | Keys, property modifiers, `Pick` and `Omit` |
| 7 | [conditionalTypes.ts](conditionalTypes.ts) | Union distribution, `infer`, functions and promises |
| 8 | [deepReadonly.ts](deepReadonly.ts) | Recursive types and tuple preservation |

For a short refresh, finish the first three and one narrowing exercise first.
Then apply the same typing skills to the data-transformation tasks in the
neighboring folder. Return to the more involved utility types afterward.

## Practice Loop and Commands

Run commands from the repository root. Use the project's Node.js/pnpm
environment and install its existing dependencies with `pnpm install` first.
These checks use the `typescript` dependency already declared by the project;
no additional package is required.

1. Read the contract below and implement the practice file.
2. Check that valid calls infer useful types and invalid calls are rejected.
3. Run the focused check, then explain your choices aloud.
4. Compare with the resolved file after your own attempt.
5. Reimplement it in a later session to check recall.

```bash
# Check your current exercise: compiler assertions, then runtime cases.
node src/practice/typescript/check.mjs practice getProperty

# Check one reference solution.
node src/practice/typescript/check.mjs reference getProperty

# Verify the complete answer key.
node src/practice/typescript/check.mjs reference

# List available exercise names.
node src/practice/typescript/check.mjs --help
```

Replace `getProperty` with a name from the table. Practice mode requires one
exercise name so unfinished work elsewhere does not flood the result.
Fresh starter files are expected to fail: broad return types and permissive
arguments do not satisfy the contracts yet. A successful reference check
validates the answer key; your progress is measured by **practice** checks.

The `checks/*.check.ts` files use type equality assertions and
`@ts-expect-error` invalid-use cases. They are compiled, not executed. An unused
`@ts-expect-error` means the implementation accepted something it should reject.
After type checks pass, the runner verifies runtime behavior for value-level
exercises. Utility types need compiler checks only. Keep runtime implementations
self-contained: the runner transpiles each exercise independently into a
temporary directory, without bundling imports from neighboring exercises.

The local configs enable strict checking, `exactOptionalPropertyTypes` and
`noUncheckedIndexedAccess`. An optional `email?: string` permits an absent
property but not an explicit `{ email: undefined }`; reading it still yields
`string | undefined`. Unused-local and unused-parameter checks are disabled for
scratch code and generic TODO placeholders. Historical files are outside these
checks. The existing application build/lint commands remain separate.

## 1. Get a Property

Implement `getProperty(object, key)`. The key must belong to the particular
object, and the return type must be that property's type.

```ts
const user: { id: number; name: string; email?: string } = { id: 1, name: 'Ada' }
getProperty(user, 'name')  // 'Ada'; inferred string
getProperty(user, 'email') // undefined; inferred string | undefined
getProperty(user, 'missing') // must be a compiler error
```

Accept readonly objects and string, numeric or symbol keys. Reject `null` and
invalid keys without casting everything to `any`. Explain how the key type is
connected to the object type. Runtime work is a single property lookup on an
ordinary data object.

## 2. Pluck Properties

Implement `pluck(items, key)`. Return a new array containing that property from
each item, preserving its value type. Accept readonly input arrays and retain
their order; leave the input untouched.

- `pluck([{ name: 'Ada' }, { name: 'Lin' }], 'name')` returns `['Ada', 'Lin']`.
- An empty typed array returns an empty array with the appropriate element type.
- For items typed with `email?: string`, the result is `(string | undefined)[]`.
- Invalid keys must be rejected. Readonly literal tuples should retain the
  union of their selected literal values.

Time: `O(n)` property reads. Additional space: `O(n)` for the result array.

## 3. Update a Plain Data Record

Implement `updateEntity(entity, patch)`: return a new shallow merged object,
preserve fields not mentioned in the patch, and preserve the entity's type.

```ts
const user = { id: 1, name: 'Ada' }
updateEntity(user, { name: 'Lin' }) // { id: 1, name: 'Lin' }
updateEntity(user, { name: 42 })    // must be a compiler error
updateEntity(user, { age: 30 })     // fresh object-literal patch must be rejected
```

Infer the entity shape from the first argument; the patch should not widen it.
Explain why `Partial` is useful and examine `NoInfer` when comparing the
reference. This exercise targets plain data records. Object spread does not
preserve a class instance's prototype, private state or accessor semantics.

The copy is shallow: nested objects retain their identities, and replacing a
nested object requires a complete value of that nested type. Fresh literals
receive excess-property checks; TypeScript is structurally typed, so this is
not an exact-object validator for arbitrary variables or network input.

Time: `O(e + p)` over enumerable entity and patch properties. Space: `O(k)`
for the resulting object's properties. The original is unchanged.

## 4. Narrow Unknown Input and Model Request States

Implement these exports in `narrowing.ts`:

- `User`: a numeric `id`, string `name`, optional string `email`.
- `isUser(value)`: a boolean runtime check with a useful type-predicate signature.
- `parseUser(value)`: return the original object if valid; otherwise throw `Error`.
- `RequestState<T>` and `describeRequest(state)`, following the table below.

The guard accepts non-array objects with a finite numeric ID and string name.
Missing email is valid. If the email key exists, its value must be a string;
`{ email: undefined }` is invalid. Extra fields are allowed. IDs need not be
positive integers and names need not be nonempty; those are separate business
requirements. Test `null`, primitives, arrays, missing fields and `NaN`.

| `status` | Additional field | Description returned |
| --- | --- | --- |
| `idle` | none | `Idle` |
| `loading` | none | `Loading` |
| `success` | `data: T` | `Success` |
| `error` | `error: string` | `Error: ` followed by the error text |

Explain why a discriminated union is more precise than several optional fields.
Use an exhaustive switch. As a manual follow-up, temporarily add a `cancelled`
state and confirm that the missing branch becomes a compiler error. The
automated checks cover current state shapes and outputs; that future-change
experiment checks your exhaustiveness approach. Restore the original contract
afterward. Untrusted responses still need validation before being treated as
`RequestState<T>`.

## 5. Preserve Literal Types and Check Configuration

In `literals.ts`, define the following runtime data and derive types from it:

- `STATUS`: keys `Idle`, `Loading`, `Success`, `Error`, with corresponding
  lowercase string values `idle`, `loading`, `success`, `error`.
- `Status`: the union of those values, derived rather than repeated manually.
- `EventName`: `onIdle | onLoading | onSuccess | onError`, derived from `Status`.
- `Route`: `path` starts with `/`, `method` is `GET | POST`, `requiresAuth` is boolean.
- `routes.home`: path `/`, method `GET`, `requiresAuth: false`.
- `routes.profile`: path `/profile`, method `GET`, `requiresAuth: true`.

Validate route values with `satisfies` while preserving exact keys, methods and
paths. For this exercise, the resulting configuration is readonly in the type
system. Explain the difference between an annotation, an assertion and
`satisfies`, including how contextual typing can affect inference.

`as const` preserves literal values and adds readonly properties; it does not
freeze the runtime object. A string-literal union has no runtime object; an
`as const` object provides values from which a union can be derived. Regular
enums also produce runtime code, with different output and API choices. The
original enum experiment is preserved in [attempts/legacy/enum.ts](attempts/legacy/enum.ts).

## 6. Transform Keys with Mapped Types

Mapped types iterate over a key set. `keyof T` supplies keys, and indexed access
connects each key to its property type. Implement:

- `MyPartial<T>`: make top-level properties optional.
- `MyRequired<T>`: remove top-level optionality.
- `MyReadonly<T>`: make top-level properties readonly.
- `MyPick<T, K>`: keep selected keys; reject invalid keys.
- `MyOmit<T, K>`: remove selected keys; missing keys are harmless, as in built-in `Omit`.
- `ValueOf<T>`: obtain the union of property values, including `undefined` from optional properties.

Preserve existing readonly/optional modifiers unless the utility explicitly
changes them. These transformations are shallow: a readonly property can still
refer to a mutable object. Try numeric and symbol keys as well as strings.

## 7. Conditional Types and Inference

Conditional types choose a branch according to assignability. A condition on a
naked type parameter distributes over union members; `infer` captures part of
a matching type. Implement:

- `MyExclude<T, U>` and `MyExtract<T, U>`: filter union members.
- `MyNonNullable<T>`: match the built-in utility, including `unknown` becoming
  the non-nullish `{}` type. Here `{}` also includes non-nullish primitives.
- `ArrayItem<T>`: union of mutable/readonly array or tuple element types;
  empty tuples and non-array input produce `never`.
- `FirstArrayItem<T>`: guaranteed head of a nonempty tuple. Empty tuples,
  optional-only tuples and ordinary arrays produce `never` in this exercise.
- `MyReturnType<T>` and `FnParams<T>`: function result and parameter tuple;
  constrain input to callable types. Overloads use the last signature.
- `UnwrapPromise<T>`: unwrap one `Promise` layer; preserve non-Promise values.
- `AsyncReturnType<T>`: match `Awaited<ReturnType<T>>`, including synchronous
  results, unions and nested promise-like values.

Explain why the array-element union and tuple-head types differ. The older
`ArrayItemInfer` experiment extracted a tuple head; the new exercises give the
two operations distinct names. Compare one-level unwrapping with recursive
`Awaited`. These are compiler exercises, with no runtime implementation.

## 8. Recursive Readonly Types

Implement `DeepReadonly<T>` for primitives, callable values, plain objects,
arrays and tuples, including readonly inputs. Preserve tuple positions,
optional/rest elements and property optionality. Treat callable values as
atomic, preserving their signatures and return types.

`Date`, `Map`, `Set`, class instances and other richer built-ins are outside
this exercise's contract. Readonly types restrict operations through that
type; they do not freeze an object or stop mutation through another mutable
alias. Explain why recursive mapped types need careful array, tuple and
function handling.

## Earlier Work

All nine previous files are preserved byte-for-byte in
[attempts/legacy](attempts/legacy). They include overlapping worksheets,
unfinished aliases, reference experiments and deliberate errors. Use them to
compare earlier reasoning after attempting the focused exercises.

## Further Reading

- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Narrowing and discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript 5.4: NoInfer](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html#the-noinfer-utility-type)
