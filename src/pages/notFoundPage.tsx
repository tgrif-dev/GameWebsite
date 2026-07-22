import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { pageOffset, pageTopPadding, sectionPadding, sectionHeaderGap, eyebrowStyles } from '../styles/section'

export default function NotFoundPage() {
  return (
    <Box pt={pageOffset} bg="pageBg" w="100%" minH="70vh">
      <Box pt={pageTopPadding} pb={sectionPadding}>
        <Container maxW="container.md">
          <VStack gap={sectionHeaderGap} align="start">
            <Text {...eyebrowStyles}>404</Text>
            <Heading
              color="textPrimary"
              fontSize={{ base: '3xl', md: '5xl' }}
              letterSpacing="0.12em"
            >
              NOT FOUND
            </Heading>
          </VStack>

          <VStack gap={6} align="start" pt={8}>
            <Text color="textMuted" fontSize={{ base: 'md', md: 'lg' }} maxW="600px" lineHeight="1.9">
              This page does not exist. The link may be out of date, but the devlog and
              everything else are still where you left them.
            </Text>

            <Button
              as="a"
              size="lg"
              px={10}
              bg="accent"
              color="accentText"
              fontFamily="mono"
              fontSize="sm"
              letterSpacing="0.14em"
              textTransform="uppercase"
              borderRadius="sm"
              transition="background-color 0.2s ease"
              _hover={{ bg: 'accentHover' }}
              {...{ href: '/' }}
            >
              Back to the home page
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}