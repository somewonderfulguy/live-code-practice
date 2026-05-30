type Category = {
  id: string
  name: string
  children?: Category[]
}

const categories: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    children: [
      {
        id: 'react',
        name: 'React',
        children: [{ id: 'nextjs', name: 'Next.js' }]
      },
      { id: 'vue', name: 'Vue' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    children: [{ id: 'node', name: 'Node.js' }]
  }
]

type FlatCategory = {
  id: string
  name: string
  parentId: string | null
  depth: number
  path: string[]
}

function flattenCategories(categories: Category[]): FlatCategory[] {}

const result = flattenCategories(categories)

console.log(result)
