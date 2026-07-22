export const API_BASE =
  import.meta.env.VITE_API_BASE ?? 'https://game-website-nine-blond.vercel.app'

export type PostSummary = {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  tags: string[]
  publishedAt: string
}

export type Post = PostSummary & {
  body: string
}

export type AdminPost = PostSummary & {
  published: boolean
}

export type NewPost = {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  tags: string[]
  body: string
}

export type LeaderboardEntry = {
  rank: number
  name: string
  time: number
}

export type LeaderboardResponse = {
  entries: LeaderboardEntry[]
  total: number
}

export class NotFoundError extends Error {}

export async function fetchPosts(signal?: AbortSignal): Promise<PostSummary[]> {
  const res = await fetch(`${API_BASE}/api/posts/posts`, { signal })
  if (!res.ok) throw new Error(`Posts request failed (${res.status})`)
  const data = await res.json()
  return Array.isArray(data) ? data : []
}

export async function fetchPost(slug: string, signal?: AbortSignal): Promise<Post> {
  const res = await fetch(
    `${API_BASE}/api/posts/posts?slug=${encodeURIComponent(slug)}`,
    { signal }
  )
  if (res.status === 404) throw new NotFoundError('Post not found')
  if (!res.ok) throw new Error(`Post request failed (${res.status})`)
  return res.json()
}

export async function fetchAllPosts(
  adminKey: string,
  signal?: AbortSignal
): Promise<AdminPost[]> {
  const res = await fetch(`${API_BASE}/api/posts/posts?all=1`, {
    headers: { 'X-Admin-Key': adminKey },
    signal,
  })

  if (res.status === 401) throw new Error('Admin key rejected.')
  if (!res.ok) throw new Error(`Posts request failed (${res.status})`)

  const data = await res.json()
  return Array.isArray(data) ? data : []
}

export async function setPostPublished(
  slug: string,
  published: boolean,
  adminKey: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/posts/posts`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': adminKey,
    },
    body: JSON.stringify({ slug, published }),
  })

  if (res.status === 401) throw new Error('Admin key rejected.')
  if (res.status === 404) throw new Error(`Post ${slug} not found.`)
  if (!res.ok) throw new Error(`Update failed (${res.status})`)
}

export async function subscribe(email: string, signal?: AbortSignal): Promise<void> {
  const res = await fetch(`${API_BASE}/api/subscribe/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    signal,
  })
  if (res.status === 400) throw new Error('Enter an email address.')
  if (!res.ok) throw new Error('Something went wrong. Try again in a moment.')
}

export async function createPost(post: NewPost, adminKey: string): Promise<string> {
  const res = await fetch(`${API_BASE}/api/posts/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': adminKey,
    },
    body: JSON.stringify(post),
  })

  if (res.status === 401) throw new Error('Admin key rejected.')
  if (res.status === 409) throw new Error('That slug already exists.')
  if (res.status === 400) throw new Error('Slug, title and body are all required.')
  if (!res.ok) throw new Error(`Create failed (${res.status})`)

  const data = await res.json()
  return data.slug
}

export async function sendTestEmail(
  email: string,
  slug: string,
  adminKey: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/test-email/test-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': adminKey,
    },
    body: JSON.stringify({ email, slug }),
  })

  if (res.status === 401) throw new Error('Admin key rejected.')
  if (!res.ok) throw new Error(`Test email failed (${res.status})`)
}

export async function broadcast(slug: string, adminKey: string): Promise<number> {
  const res = await fetch(`${API_BASE}/api/broadcast/broadcast`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': adminKey,
    },
    body: JSON.stringify({ slug }),
  })

  if (res.status === 401) throw new Error('Admin key rejected.')
  if (!res.ok) throw new Error(`Broadcast failed (${res.status})`)

  const data = await res.json()
  return data.sent ?? 0
}

export async function fetchLeaderboard(
  signal?: AbortSignal
): Promise<LeaderboardResponse> {
  const res = await fetch(`${API_BASE}/api/leaderboard/leaderboard`, { signal })
  if (!res.ok) throw new Error(`Leaderboard request failed (${res.status})`)
  const data = await res.json()
  return { entries: data.entries ?? [], total: data.total ?? 0 }
}

export function formatTime(seconds: number): string {
  return `${seconds.toFixed(2)}s`
}

export function formatPostDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}