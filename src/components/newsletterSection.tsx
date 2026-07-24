import { useState } from 'react'
import { Box, Container, Heading, Text, Input, Button, Stack, VStack } from '@chakra-ui/react'
import { subscribe } from '../lib/api'
import { sectionPadding, sectionHeaderGap, eyebrowStyles } from '../styles/section'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (status === 'sending') return

    const trimmed = email.trim()
    if (!trimmed) {
      setStatus('error')
      setMessage('Enter an email address.')
      return
    }

    setStatus('sending')
    try {
      await subscribe(trimmed)
      setStatus('done')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <Box
      id="newsletter"
      bg="panelBg"
      borderTop="1px solid"
      borderColor="hairline"
      py={sectionPadding}
      w="100%"
    >
      <Container maxW="container.lg">
        <VStack
          gap={sectionHeaderGap}
          align={{ base: 'center', md: 'start' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Text {...eyebrowStyles}>Stay in the loop</Text>

          <Heading
            color="textPrimary"
            fontSize={{ base: '2xl', md: '4xl' }}
            letterSpacing="0.12em"
          >
            NEWSLETTER
          </Heading>

          <Text color="textMuted" fontSize="md" maxW="540px" lineHeight="1.8">
            Devlogs and Announcements, straight to your inbox.
          </Text>

          {status === 'done' ? (
            <Text fontFamily="mono" fontSize="md" letterSpacing="0.1em" color="accent" pt={2}>
              You have been added to the list. Watch your inbox!.
            </Text>
          ) : (
            <Box as="form" onSubmit={handleSubmit} w="100%" maxW="560px" pt={2}>
              <Stack direction={{ base: 'column', md: 'row' }} gap={3}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  bg="panelBgAlt"
                  color="textPrimary"
                  border="1px solid"
                  borderColor="hairline"
                  borderRadius="sm"
                  fontSize="md"
                  _placeholder={{ color: 'textSubtle' }}
                  _hover={{ borderColor: 'slate.600' }}
                  _focus={{ borderColor: 'accent', outline: 'none', boxShadow: 'none' }}
                  size="lg"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  size="lg"
                  px={10}
                  bg="accent"
                  color="accentText"
                  fontFamily="mono"
                  fontSize="sm"
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                  borderRadius="sm"
                  flexShrink={0}
                  loading={status === 'sending'}
                  transition="background-color 0.2s ease"
                  _hover={{ bg: 'accentHover' }}
                >
                  Sign up
                </Button>
              </Stack>

              {status === 'error' ? (
                <Text fontFamily="mono" color="red.300" fontSize="sm" mt={3} letterSpacing="0.1em">
                  {message}
                </Text>
              ) : null}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  )
}