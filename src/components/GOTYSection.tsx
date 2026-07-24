import { Box, Heading, Image, VStack, SimpleGrid, Text, Container } from "@chakra-ui/react";
import { sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, cardBodySize } from '../styles/section'

const modules = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const galleryImages = Object.keys(modules).sort().map((path) => modules[path])

const pillars = [
  {
    index: '01',
    title: 'Each room is different',
    body: 'A tomb, a library, a classroom and more. Each one holds a set of puzzles standing between you and the next door.',
  },
  {
    index: '02',
    title: 'It watches you play',
    body: 'Stall on a puzzle and a hint appears.',
  },
  {
    index: '03',
    title: 'One more run',
    body: 'Every completed run is timed and posted to the leaderboard, and it is always beatable.',
  },
]

export default function GameOfTheYearSection() {
  return (
    <Box
      bg="pageBg"
      borderTop="1px solid"
      borderColor="hairline"
      py={sectionPadding}
      w="100%"
    >
      <Container maxW="container.xl">
        <VStack gap={sectionHeaderGap} mb={sectionHeaderMargin} textAlign="center">
          <Text {...eyebrowStyles}>What you are getting into</Text>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="0.12em"
            color="textPrimary"
          >
            THREE THINGS
          </Heading>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 8, md: 6 }} w="100%">
          {pillars.map((pillar, i) => (
            <Box
              key={pillar.index}
              bg="panelBg"
              border="1px solid"
              borderColor="hairline"
              borderRadius="sm"
              overflow="hidden"
              transition="border-color 0.3s ease, background-color 0.3s ease"
              _hover={{ borderColor: 'accent', bg: 'panelBgAlt' }}
            >
              {galleryImages[i] ? (
                <Image
                  src={galleryImages[i]}
                  alt={pillar.title}
                  width="100%"
                  aspectRatio={16 / 9}
                  objectFit="cover"
                />
              ) : null}

              <VStack align="start" gap={3} p={{ base: 6, md: 8 }}>
                <Text fontFamily="mono" fontSize="sm" letterSpacing="0.2em" color="accent">
                  {pillar.index}
                </Text>
                <Heading fontSize={{ base: 'lg', md: 'xl' }} color="textPrimary">
                  {pillar.title}
                </Heading>
                <Text fontSize={cardBodySize} color="textMuted" lineHeight="1.8">
                  {pillar.body}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}