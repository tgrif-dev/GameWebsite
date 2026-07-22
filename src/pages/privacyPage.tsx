import { Box, Container, Heading, Text, VStack, Link } from '@chakra-ui/react'
import { pageOffset, pageTopPadding, sectionPadding, sectionHeaderGap, eyebrowStyles } from '../styles/section'

export default function PrivacyPage() {
  return (
    <Box pt={pageOffset} bg="pageBg" w="100%" minH="70vh">
      <Box pt={pageTopPadding} pb={sectionPadding}>
        <Container maxW="container.md">
          <VStack align="start" gap={sectionHeaderGap}>
            <Text {...eyebrowStyles}>The short version</Text>
            <Heading
              color="textPrimary"
              fontSize={{ base: '3xl', md: '5xl' }}
              letterSpacing="0.12em"
            >
              PRIVACY
            </Heading>
          </VStack>

          <VStack align="start" gap={5} pt={8}>
            <Text color="textMuted" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.9">
              If you sign up to the newsletter, we store your email address and nothing
              else. No name, no tracking, no analytics, no third-party advertising.
            </Text>

            <Text color="textMuted" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.9">
              The address is held in a MongoDB Atlas database and used only to send
              devlog updates and release news through Resend, our email provider. We do
              not sell it, share it, or use it for anything else.
            </Text>

            <Text color="textMuted" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.9">
              You can ask us to remove your address at any time and we will delete it.
            </Text>

            <Text color="textMuted" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.9">
              Lost Society is a student team project at Aston University. This site is
              not a commercial service.
            </Text>

            <Link
              href="/"
              fontFamily="mono"
              fontSize="md"
              letterSpacing="0.14em"
              color="textSubtle"
              pt={4}
              _hover={{ color: 'accent', textDecoration: 'none' }}
            >
              Back to the home page
            </Link>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}