import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Stack,
  Flex,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react'
import {
  createPost,
  sendTestEmail,
  broadcast,
  fetchAllPosts,
  setPostPublished,
  formatPostDate,
  type AdminPost,
} from '../lib/api'
import { pageTopPadding, sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, labelStyles } from '../styles/section'

const STORAGE_KEY = 'lostSocietyAdminKey'
const PAGE_SIZE = 10

const fieldStyles = {
  bg: 'panelBgAlt',
  color: 'textPrimary',
  border: '1px solid',
  borderColor: 'hairline',
  borderRadius: 'sm',
  fontSize: 'md',
  _placeholder: { color: 'textSubtle' },
  _hover: { borderColor: 'slate.600' },
  _focus: { borderColor: 'accent', outline: 'none', boxShadow: 'none' },
}

const primaryButtonStyles = {
  bg: 'accent',
  color: 'accentText',
  fontFamily: 'mono',
  fontSize: 'sm',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  borderRadius: 'sm',
  _hover: { bg: 'accentHover' },
}

const secondaryButtonStyles = {
  bg: 'transparent',
  color: 'textPrimary',
  border: '1px solid',
  borderColor: 'hairline',
  fontFamily: 'mono',
  fontSize: 'sm',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  borderRadius: 'sm',
  _hover: { borderColor: 'accent', color: 'accent' },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    _hover: { borderColor: 'hairline', color: 'textPrimary' },
  },
}

const panelStyles = {
  w: '100%',
  bg: 'panelBg',
  border: '1px solid',
  borderColor: 'hairline',
  borderRadius: 'sm',
  p: { base: 6, md: 8 },
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <VStack align="start" gap={2} w="100%">
      <Text {...labelStyles}>{label}</Text>
      {children}
    </VStack>
  )
}

function StatusTag({ live, pending }: { live: boolean; pending: boolean }) {
  const label = live ? 'Live' : 'Draft'
  const colour = pending ? 'orange.300' : live ? 'accent' : 'textSubtle'

  return (
    <Text
      fontFamily="mono"
      fontSize="xs"
      letterSpacing="0.16em"
      textTransform="uppercase"
      color={colour}
    >
      {pending ? `${label} pending` : label}
    </Text>
  )
}

export default function AdminSection() {
  const [adminKey, setAdminKey] = useState('')
  const [keyInput, setKeyInput] = useState('')
  const [message, setMessage] = useState<{ tone: 'ok' | 'bad'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [tags, setTags] = useState('')
  const [body, setBody] = useState('')

  const [emailTarget, setEmailTarget] = useState('')
  const [toolSlug, setToolSlug] = useState('')

  const [posts, setPosts] = useState<AdminPost[] | null>(null)
  const [staged, setStaged] = useState<Record<string, boolean>>({})
  const [page, setPage] = useState(0)

  const loadPosts = useCallback(async (key: string) => {
    try {
      const all = await fetchAllPosts(key)
      setPosts(all)
      setStaged({})
    } catch {
      setPosts([])
    }
  }, [])

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) setAdminKey(stored)
  }, [])

  useEffect(() => {
    if (adminKey) loadPosts(adminKey)
  }, [adminKey, loadPosts])

  const unlock = () => {
    const trimmed = keyInput.trim()
    if (!trimmed) return
    sessionStorage.setItem(STORAGE_KEY, trimmed)
    setAdminKey(trimmed)
    setKeyInput('')
    setMessage(null)
  }

  const lock = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    setAdminKey('')
    setPosts(null)
    setStaged({})
    setMessage(null)
  }

  const run = async (action: () => Promise<string>) => {
    setBusy(true)
    setMessage(null)
    try {
      const text = await action()
      setMessage({ tone: 'ok', text })
    } catch (err) {
      setMessage({ tone: 'bad', text: err instanceof Error ? err.message : 'Failed.' })
    } finally {
      setBusy(false)
    }
  }

  const submitPost = () =>
    run(async () => {
      const created = await createPost(
        {
          slug: slug.trim(),
          title: title.trim(),
          excerpt: excerpt.trim(),
          coverImage: coverImage.trim(),
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          body,
        },
        adminKey
      )
      setToolSlug(created)
      await loadPosts(adminKey)
      return `Created ${created} as a draft.`
    })

  const submitTestEmail = () =>
    run(async () => {
      await sendTestEmail(emailTarget.trim(), toolSlug.trim(), adminKey)
      return `Test email sent to ${emailTarget.trim()}.`
    })

  const submitBroadcast = () =>
    run(async () => {
      const sent = await broadcast(toolSlug.trim(), adminKey)
      return `Broadcast sent to ${sent} subscriber${sent === 1 ? '' : 's'}.`
    })

  const toggle = (post: AdminPost) => {
    setStaged((current) => {
      const next = { ...current }
      if (post.slug in next) {
        delete next[post.slug]
      } else {
        next[post.slug] = !post.published
      }
      return next
    })
  }

  const stagedCount = Object.keys(staged).length

  const applyChanges = () =>
    run(async () => {
      const changes = Object.entries(staged)
      for (const [postSlug, published] of changes) {
        await setPostPublished(postSlug, published, adminKey)
      }
      await loadPosts(adminKey)
      return `${changes.length} post${changes.length === 1 ? '' : 's'} updated.`
    })

  const pageCount = posts ? Math.max(1, Math.ceil(posts.length / PAGE_SIZE)) : 1
  const visible = posts ? posts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE) : []

  return (
    <Box bg="pageBg" w="100%" pt={pageTopPadding} pb={sectionPadding} minH="70vh">
      <Container maxW="container.md">
        <VStack gap={sectionHeaderGap} align="start" mb={sectionHeaderMargin}>
          <Text {...eyebrowStyles}>Internal</Text>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="0.12em"
            color="textPrimary"
          >
            ADMIN
          </Heading>
        </VStack>

        {!adminKey ? (
          <VStack align="start" gap={4} maxW="480px">
            <Text color="textMuted" fontSize="md" lineHeight="1.8">
              Enter the admin key. It is held in this tab only and cleared when you
              close it.
            </Text>
            <Input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') unlock()
              }}
              placeholder="Admin key"
              size="lg"
              aria-label="Admin key"
              {...fieldStyles}
            />
            <Button size="lg" px={10} onClick={unlock} {...primaryButtonStyles}>
              Unlock
            </Button>
          </VStack>
        ) : (
          <VStack align="start" gap={8} w="100%">
            <HStack justify="space-between" w="100%">
              <Text {...labelStyles}>Unlocked</Text>
              <Button size="sm" px={6} onClick={lock} {...secondaryButtonStyles}>
                Lock
              </Button>
            </HStack>

            {message ? (
              <Box
                w="100%"
                border="1px solid"
                borderColor={message.tone === 'ok' ? 'accent' : 'red.400'}
                borderRadius="sm"
                bg="panelBg"
                p={4}
              >
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  letterSpacing="0.1em"
                  color={message.tone === 'ok' ? 'accent' : 'red.300'}
                >
                  {message.text}
                </Text>
              </Box>
            ) : null}

            <Box {...panelStyles}>
              <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
                <Heading fontSize="xl" color="textPrimary" letterSpacing="0.08em">
                  Posts
                </Heading>
                <Button
                  size="sm"
                  px={6}
                  onClick={() => loadPosts(adminKey)}
                  {...secondaryButtonStyles}
                >
                  Refresh
                </Button>
              </Flex>

              {posts === null ? (
                <Flex justify="center" py={10}>
                  <Spinner color="accent" />
                </Flex>
              ) : posts.length === 0 ? (
                <Text color="textMuted" fontSize="md" lineHeight="1.8">
                  No posts found.
                </Text>
              ) : (
                <>
                  <VStack gap={0} align="stretch" w="100%">
                    {visible.map((post) => {
                      const pending = post.slug in staged
                      const effective = pending ? staged[post.slug] : post.published

                      return (
                        <SimpleGrid
                          key={post.slug}
                          columns={{ base: 1, md: 2 }}
                          gap={3}
                          py={4}
                          borderTop="1px solid"
                          borderColor="hairline"
                          alignItems="center"
                        >
                          <VStack align="start" gap={1}>
                            <Text fontSize="md" color="textPrimary">
                              {post.title}
                            </Text>
                            <Text
                              fontFamily="mono"
                              fontSize="xs"
                              color="textSubtle"
                              letterSpacing="0.12em"
                            >
                              {post.slug} · {formatPostDate(post.publishedAt)}
                            </Text>
                          </VStack>

                          <HStack justify={{ base: 'start', md: 'end' }} gap={4}>
                            <StatusTag live={effective} pending={pending} />
                            <Button
                              size="sm"
                              px={6}
                              onClick={() => toggle(post)}
                              {...secondaryButtonStyles}
                            >
                              {effective ? 'Unpublish' : 'Publish'}
                            </Button>
                          </HStack>
                        </SimpleGrid>
                      )
                    })}
                  </VStack>

                  {pageCount > 1 ? (
                    <HStack justify="end" gap={3} mt={6}>
                      <Button
                        size="sm"
                        px={5}
                        disabled={page === 0}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        {...secondaryButtonStyles}
                      >
                        Previous
                      </Button>
                      <Text
                        fontFamily="mono"
                        fontSize="sm"
                        color="textSubtle"
                        letterSpacing="0.12em"
                      >
                        {page + 1} / {pageCount}
                      </Text>
                      <Button
                        size="sm"
                        px={5}
                        disabled={page >= pageCount - 1}
                        onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                        {...secondaryButtonStyles}
                      >
                        Next
                      </Button>
                    </HStack>
                  ) : null}

                  {stagedCount > 0 ? (
                    <Flex
                      mt={8}
                      pt={6}
                      borderTop="1px solid"
                      borderColor="hairline"
                      justify="space-between"
                      align="center"
                      wrap="wrap"
                      gap={4}
                    >
                      <Text
                        fontFamily="mono"
                        fontSize="sm"
                        color="orange.300"
                        letterSpacing="0.12em"
                      >
                        {stagedCount} change{stagedCount === 1 ? '' : 's'} pending
                      </Text>
                      <HStack gap={3}>
                        <Button
                          size="sm"
                          px={6}
                          onClick={() => setStaged({})}
                          {...secondaryButtonStyles}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          px={6}
                          loading={busy}
                          onClick={applyChanges}
                          {...primaryButtonStyles}
                        >
                          Confirm
                        </Button>
                      </HStack>
                    </Flex>
                  ) : null}
                </>
              )}
            </Box>

            <Box {...panelStyles}>
              <Heading fontSize="xl" color="textPrimary" mb={6} letterSpacing="0.08em">
                New post
              </Heading>

              <VStack gap={5} w="100%">
                <Field label="Slug">
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="devlog-04-lighting"
                    {...fieldStyles}
                  />
                </Field>

                <Field label="Title">
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Devlog 04: Lighting"
                    {...fieldStyles}
                  />
                </Field>

                <Field label="Excerpt">
                  <Input
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="One line that shows on the card and in the email preview."
                    {...fieldStyles}
                  />
                </Field>

                <Field label="Cover image URL">
                  <Input
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://..."
                    {...fieldStyles}
                  />
                </Field>

                <Field label="Tags, comma separated">
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Devlog, Announcement"
                    {...fieldStyles}
                  />
                </Field>

                <Field label="Body, markdown">
                  <Textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="## Heading&#10;&#10;Paragraph text."
                    rows={16}
                    fontFamily="mono"
                    lineHeight="1.7"
                    {...fieldStyles}
                  />
                </Field>

                <Button
                  size="lg"
                  px={10}
                  alignSelf="start"
                  loading={busy}
                  onClick={submitPost}
                  {...primaryButtonStyles}
                >
                  Create draft
                </Button>
              </VStack>
            </Box>

            <Box {...panelStyles}>
              <Heading fontSize="xl" color="textPrimary" mb={3} letterSpacing="0.08em">
                Send
              </Heading>

              <Text color="textMuted" fontSize="md" mb={6} lineHeight="1.8">
                Test emails work on drafts. Broadcast only works once the post is
                published.
              </Text>

              <VStack gap={5} w="100%">
                <Field label="Post slug">
                  <Input
                    value={toolSlug}
                    onChange={(e) => setToolSlug(e.target.value)}
                    placeholder="devlog-04-lighting"
                    {...fieldStyles}
                  />
                </Field>

                <Field label="Test email address">
                  <Input
                    type="email"
                    value={emailTarget}
                    onChange={(e) => setEmailTarget(e.target.value)}
                    placeholder="you@example.com"
                    {...fieldStyles}
                  />
                </Field>

                <Stack direction={{ base: 'column', sm: 'row' }} gap={3} alignSelf="start">
                  <Button
                    size="lg"
                    px={10}
                    loading={busy}
                    onClick={submitTestEmail}
                    {...secondaryButtonStyles}
                  >
                    Send test
                  </Button>
                  <Button
                    size="lg"
                    px={10}
                    loading={busy}
                    onClick={submitBroadcast}
                    {...primaryButtonStyles}
                  >
                    Broadcast
                  </Button>
                </Stack>
              </VStack>
            </Box>
          </VStack>
        )}
      </Container>
    </Box>
  )
}