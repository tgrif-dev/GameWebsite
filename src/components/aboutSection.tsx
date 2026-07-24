import { Box, Heading, Text, SimpleGrid, Image, VStack, Container } from '@chakra-ui/react'
import { pageTopPadding, sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, labelStyles } from '../styles/section'

const modules = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const galleryImages = Object.keys(modules).sort().map((path) => modules[path])
const featureImage = galleryImages[galleryImages.length - 1]

const facts = [
  { label: 'Engine', value: 'Unity' },
  { label: 'Platform', value: 'Windows' },
  { label: 'Players', value: 'Single player' },
  { label: 'Team', value: 'Nine students' },
]

export default function AboutSection() {
  return (
    <>
      <Box w="full" bg="pageBg" pt={pageTopPadding} pb={sectionPadding}>
        <Container maxW="container.lg">
          <VStack gap={sectionHeaderGap} align="start" mb={sectionHeaderMargin}>
            <Text {...eyebrowStyles}>About the game</Text>
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              letterSpacing="0.12em"
              color="textPrimary"
            >
              LOST SOCIETY
            </Heading>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: featureImage ? 2 : 1 }}
            w="100%"
            gap={{ base: 10, md: 16 }}
          >
            <VStack align="start" gap={5}>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
                Lost Society is a puzzle game where every second counts. Compete against yourself and others to get 
                the best time possible! 
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
                The game adapts to you! Stall on a puzzle and receive a hint; keep moving and it stays out of your way. The aim is a run
                that stays difficult without ever getting stuck!.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
                Every completed run is timed and posted to the leaderboard. The top 40 runs can be viewed here
                on our website. Do you have what it takes?
              </Text>
            </VStack>

            {featureImage ? (
              <Box textAlign="center">
                <Image
                  src={featureImage}
                  alt="Lost Society gameplay"
                  objectFit="cover"
                  border="1px solid"
                  borderColor="hairline"
                  borderRadius="sm"
                  maxW={{ base: '100%', md: '460px' }}
                  mx="auto"
                />
              </Box>
            ) : null}
          </SimpleGrid>
        </Container>
      </Box>

      <Box
        w="full"
        bg="panelBg"
        borderTop="1px solid"
        borderColor="hairline"
        py={sectionPadding}
      >
        <Container maxW="container.lg">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 8, md: 6 }} mb={sectionHeaderMargin}>
            {facts.map((fact) => (
              <VStack key={fact.label} align="start" gap={2}>
                <Text {...labelStyles}>{fact.label}</Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="textPrimary">
                  {fact.value}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>

          <VStack align="start" gap={4} maxW="720px">
            <Text {...eyebrowStyles}>Where we are</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
              Lost Society is built in Unity by a team of nine as an eighteen month
              university project. The full game is now available!
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
              The devlog covers how it got here, including the parts that did not work
              the first time.
            </Text>
          </VStack>
        </Container>
      </Box>
    </>
  )
}