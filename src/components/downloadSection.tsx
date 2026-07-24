import { Box, Container, Heading, Text, Button, VStack, SimpleGrid } from '@chakra-ui/react'
import { pageTopPadding, sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, labelStyles } from '../styles/section'

const DOWNLOAD_URL = ''

export default function DownloadSection() {
  const available = DOWNLOAD_URL !== ''

  return (
    <Box bg="pageBg" w="100%" pt={pageTopPadding} pb={sectionPadding}>
      <Container maxW="container.lg">
        <VStack gap={sectionHeaderGap} align="start" mb={sectionHeaderMargin}>
          <Text {...eyebrowStyles}>Windows build</Text>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="0.12em"
            color="textPrimary"
          >
            DOWNLOAD
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" maxW="640px" lineHeight="1.9">
            Lost Society runs on Windows as a standalone build. No installer and no
            account required, just unzip it and run.
          </Text>
        </VStack>

        {available ? (
          <Button
            as="a"
            size="lg"
            px={12}
            bg="accent"
            color="accentText"
            fontFamily="mono"
            fontSize="sm"
            letterSpacing="0.14em"
            textTransform="uppercase"
            borderRadius="sm"
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{ bg: 'accentHover', transform: 'translateY(-2px)' }}
            {...{ href: DOWNLOAD_URL }}
          >
            Download for Windows
          </Button>
        ) : (
          <VStack align="start" gap={4}>
            <Button
              size="lg"
              px={12}
              bg="panelBgAlt"
              color="textSubtle"
              border="1px solid"
              borderColor="hairline"
              fontFamily="mono"
              fontSize="sm"
              letterSpacing="0.14em"
              textTransform="uppercase"
              borderRadius="sm"
              disabled
            >
              Download for Windows
            </Button>
            <Text fontFamily="mono" fontSize="sm" color="textSubtle" letterSpacing="0.12em">
              The build goes live here on release
            </Text>
          </VStack>
        )}

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, md: 16 }} w="100%" pt={sectionHeaderMargin}>
          <VStack align="start" gap={3}>
            <Text {...labelStyles}>How to play</Text>
            <Text fontSize="md" color="textMuted" lineHeight="1.9">
              Every run generates a fresh set of puzzles, so no two sessions are the
              same. The game adjusts as you go, easing off when you are stuck and
              pushing harder when you are not.
              again.
            </Text>
          </VStack>

          <VStack align="start" gap={3}>
            <Text {...labelStyles}>Before you start</Text>
            <Text fontSize="md" color="textMuted" lineHeight="1.9">
              Windows may warn you about an unrecognised publisher, since the build is
              not code signed. Check the minimum requirements below before downloading.
            </Text>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}