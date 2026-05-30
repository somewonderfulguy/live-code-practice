import { useEffect, useMemo, useState } from 'react'

import { debounce } from '../../utilities/debounce'

// [x] make debounce work
// [x] usePosts
// [ ] getPosts
// [ ] render posts

// postTypes.ts
type Post = {
  id: number
  title: string
  body: string
}

// postMocks.ts
const posts: Post[] = [
  {
    id: 0,
    title: 'pottah',
    body: 'the boy who lived'
  },
  {
    id: 1,
    title: 'granger',
    body: 'the smart one'
  },
  {
    id: 2,
    title: 'ronaldo weasley',
    body: 'huh'
  }
]

// postApi.ts
const searchPosts = (search: string) => {
  return new Promise<Post[]>((res) => {
    console.log('fetching...')
    const filtered = posts.filter(
      ({ title, body }) => title.includes(search) || body.includes(search)
    )
    setTimeout(() => res(filtered), 1000)
  })
}

// postQueries.ts
const usePosts = (value: string) => {
  const [posts, setPosts] = useState<Post[]>([]) // TODO: add type
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)
    searchPosts(value)
      .then(setPosts)
      .finally(() => setIsLoading(false))
  }, [value])

  return { data: posts, isLoading }
}

export const FunComponent = () => {
  const [value, setValueRaw] = useState('harry')
  const setValue = useMemo(() => debounce(setValueRaw, 500), [])
  useEffect(() => setValue.cancel, [setValue])

  const { data: posts, isLoading } = usePosts(value)

  return (
    <>
      <div>{value}</div>
      <div>
        <input
          defaultValue={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div>
        {isLoading ? (
          <span>Czekamy...</span>
        ) : (
          <div>{JSON.stringify(posts, undefined, 2)}</div>
        )}
      </div>
    </>
  )
}

function App() {
  return <FunComponent />
}

export default App
