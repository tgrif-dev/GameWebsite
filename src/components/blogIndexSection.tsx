import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Link,
  Spinner,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { fetchPosts, formatPostDate, type PostSummary } from '../lib/api'
import { pageTopPadding, sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, cardBodySize } from '../styles/section'

function Tag({ label }: { label: string }) {
  return (
    <Box
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
      {label}
    </Box>
  )
}

function PostCard({ post }: { post: PostSummary }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(post.coverImage) && !imageFailed

  return (
    <Link
      href={`/blog/${post.slug}`}
      _hover={{ textDecoration: 'none' }}
      display="block"
      h="100%"
    >
      <Box
        bg="panelBg"
        border="1px solid"
        borderColor="hairline"
        borderRadius="sm"
        overflow="hidden"
        h="100%"
        transition="border-color 0.3s ease, background-color 0.3s ease"
        _hover={{ borderColor: 'accent', bg: 'panelBgAlt' }}
      >
        {showImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            width="100%"
            aspectRatio={16 / 9}
            objectFit="cover"
            onError={() => setImageFailed(true)}
          />
        ) : null}

        <VStack align="start" gap={3} p={{ base: 6, md: 7 }}>
          <Text
            fontFamily="mono"
            fontSize="sm"
            color="accent"
            letterSpacing="0.16em"
            textTransform="uppercase"
          >
            {formatPostDate(post.publishedAt)}
          </Text>
          <Heading fontSize={{ base: 'lg', md: 'xl' }} color="textPrimary">
            {post.title}
          </Heading>
          <Text fontSize={cardBodySize} color="textMuted" lineHeight="1.8">
            {post.excerpt}
          </Text>
          {post.tags?.length ? (
            <HStack gap={2} pt={2} wrap="wrap">
              {post.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </HStack>
          ) : null}
        </VStack>
      </Box>
    </Link>
  )
}

export default function BlogIndexSection() {
  const [posts, setPosts] = useState<PostSummary[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetchPosts(controller.signal)
      .then(setPosts)
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError('The blog could not be loaded. Refresh to try again.')
      })
    return () => controller.abort()
  }, [])

  return (
    <Box bg="pageBg" pt={pageTopPadding} pb={sectionPadding} w="100%" minH="60vh">
      <Container maxW="container.lg">
        <Flex direction="column" gap={sectionHeaderGap} mb={sectionHeaderMargin}>
          <Text {...eyebrowStyles}>From the team</Text>
          <Heading
            color="textPrimary"
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="0.12em"
          >
            DEVLOG
          </Heading>
          <Text color="textMuted" fontSize={{ base: 'md', md: 'lg' }} maxW="620px" lineHeight="1.8">
            Progress updates, announcements, and the problems we hit along the way.
          </Text>
        </Flex>

        {error ? (
          <Text fontFamily="mono" fontSize="md" color="red.300" letterSpacing="0.1em">
            {error}
          </Text>
        ) : posts === null ? (
          <Flex justify="center" py={16}>
            <Spinner color="accent" size="lg" />
          </Flex>
        ) : posts.length === 0 ? (
          <Box
            bg="panelBg"
            border="1px solid"
            borderColor="hairline"
            borderRadius="sm"
            p={{ base: 8, md: 12 }}
          >
            <Heading color="textPrimary" fontSize="xl" mb={3}>
              No posts yet
            </Heading>
            <Text color="textMuted" fontSize="md" lineHeight="1.8">
              The first devlog is on its way. Sign up to the newsletter and it will
              land in your inbox.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}