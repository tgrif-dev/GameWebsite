import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Link,
  Spinner,
  Flex,
  VStack,
  HStack,
  List,
} from '@chakra-ui/react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { fetchPost, formatPostDate, NotFoundError, type Post } from '../lib/api'
import { pageTopPadding, sectionPadding } from '../styles/section'

function SafeImage({
  src,
  alt,
  ...rest
}: {
  src?: string
  alt?: string
  [key: string]: unknown
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return null

  return <Image src={src} alt={alt ?? ''} onError={() => setFailed(true)} {...rest} />
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <Heading color="textPrimary" fontSize={{ base: '2xl', md: '4xl' }} letterSpacing="0.05em" mt={12} mb={5}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading color="textPrimary" fontSize={{ base: 'xl', md: '3xl' }} letterSpacing="0.05em" mt={10} mb={4}>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading color="textPrimary" fontSize={{ base: 'lg', md: '2xl' }} mt={8} mb={3}>
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <Text color="textMuted" fontSize={{ base: 'md', md: 'lg' }} mb={6} lineHeight="1.9">
      {children}
    </Text>
  ),
  a: ({ href, children }) => (
    <Link href={href} color="accent" textDecoration="underline" _hover={{ color: 'accentHover' }}>
      {children}
    </Link>
  ),
  strong: ({ children }) => (
    <Text as="strong" color="textPrimary" fontWeight="700">
      {children}
    </Text>
  ),
  em: ({ children }) => (
    <Text as="em" fontStyle="italic">
      {children}
    </Text>
  ),
  ul: ({ children }) => (
    <List.Root color="textMuted" pl={6} mb={6} gap={3}>
      {children}
    </List.Root>
  ),
  ol: ({ children }) => (
    <List.Root as="ol" color="textMuted" pl={6} mb={6} gap={3}>
      {children}
    </List.Root>
  ),
  li: ({ children }) => (
    <List.Item fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.9">
      {children}
    </List.Item>
  ),
  img: ({ src, alt }) => (
    <SafeImage
      src={typeof src === 'string' ? src : undefined}
      alt={alt ?? ''}
      border="1px solid"
      borderColor="hairline"
      borderRadius="sm"
      my={8}
      w="100%"
    />
  ),
}

function slugFromPath(): string {
  const parts = window.location.pathname.split('/').filter(Boolean)
  return decodeURIComponent(parts[parts.length - 1] ?? '')
}

export default function BlogPostSection({ slug }: { slug?: string }) {
  const resolvedSlug = slug ?? slugFromPath()
  const [post, setPost] = useState<Post | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'error'>(
    'loading'
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchPost(resolvedSlug, controller.signal)
      .then((data) => {
        setPost(data)
        setStatus('ready')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setStatus(err instanceof NotFoundError ? 'missing' : 'error')
      })
    return () => controller.abort()
  }, [resolvedSlug])

  return (
    <Box bg="pageBg" pt={pageTopPadding} pb={sectionPadding} w="100%" minH="60vh">
      <Container maxW="container.md">
        <Link
          href="/blog"
          fontFamily="mono"
          fontSize="sm"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="textSubtle"
          _hover={{ color: 'accent', textDecoration: 'none' }}
        >
          Back to the devlog
        </Link>

        {status === 'loading' ? (
          <Flex justify="center" py={20}>
            <Spinner color="accent" size="lg" />
          </Flex>
        ) : status === 'missing' ? (
          <VStack align="start" gap={4} pt={12}>
            <Heading color="textPrimary" fontSize="3xl" letterSpacing="0.08em">
              That post is not here
            </Heading>
            <Text color="textMuted" fontSize="md" lineHeight="1.8">
              It may have been moved or is not published yet.
            </Text>
          </VStack>
        ) : status === 'error' || !post ? (
          <VStack align="start" gap={4} pt={12}>
            <Heading color="textPrimary" fontSize="3xl" letterSpacing="0.08em">
              The post could not be loaded
            </Heading>
            <Text color="textMuted" fontSize="md" lineHeight="1.8">
              Refresh the page to try again.
            </Text>
          </VStack>
        ) : (
          <Box pt={10}>
            <Text
              fontFamily="mono"
              fontSize="sm"
              color="accent"
              letterSpacing="0.18em"
              textTransform="uppercase"
              mb={4}
            >
              {formatPostDate(post.publishedAt)}
            </Text>

            <Heading
              color="textPrimary"
              fontSize={{ base: '3xl', md: '5xl' }}
              letterSpacing="0.08em"
              lineHeight="1.2"
              mb={5}
            >
              {post.title}
            </Heading>

            {post.tags?.length ? (
              <HStack gap={2} mb={10} wrap="wrap">
                {post.tags.map((tag) => (
                  <Box
                    key={tag}
                    px={3}
                    py={1}
                    border="1px solid"
                    borderColor="hairline"
                    color="textSubtle"
                    borderRadius="sm"
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                  >
                    {tag}
                  </Box>
                ))}
              </HStack>
            ) : null}

            <SafeImage
              src={post.coverImage}
              alt={post.title}
              w="100%"
              aspectRatio={16 / 9}
              objectFit="cover"
              border="1px solid"
              borderColor="hairline"
              borderRadius="sm"
              mb={12}
            />

            <ReactMarkdown components={markdownComponents}>{post.body}</ReactMarkdown>
          </Box>
        )}
      </Container>
    </Box>
  )
}