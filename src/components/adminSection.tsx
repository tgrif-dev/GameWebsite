import { useState, useEffect } from 'react'
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
} from '@chakra-ui/react'
import { createPost, sendTestEmail, broadcast } from '../lib/api'
import { pageTopPadding, sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, labelStyles } from '../styles/section'

const STORAGE_KEY = 'lostSocietyAdminKey'

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
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <VStack align="start" gap={2} w="100%">
      <Text {...labelStyles}>{label}</Text>
      {children}
    </VStack>
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

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) setAdminKey(stored)
  }, [])

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
      return `Created ${created} as a draft. Publish it in Atlas.`
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

            <Box
              w="100%"
              bg="panelBg"
              border="1px solid"
              borderColor="hairline"
              borderRadius="sm"
              p={{ base: 6, md: 8 }}
            >
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

            <Box
              w="100%"
              bg="panelBg"
              border="1px solid"
              borderColor="hairline"
              borderRadius="sm"
              p={{ base: 6, md: 8 }}
            >
              <Heading fontSize="xl" color="textPrimary" mb={3} letterSpacing="0.08em">
                Send
              </Heading>

              <Text color="textMuted" fontSize="md" mb={6} lineHeight="1.8">
                Test emails work on drafts. Broadcast only works once the post is
                published in Atlas.
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