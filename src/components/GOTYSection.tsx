import { Box, Heading, Image, VStack, SimpleGrid, Text, Container } from "@chakra-ui/react";
import { sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, cardBodySize } from '../styles/section'

const pillars = [
  {
    index: '01',
    image: '/GameImage1.png',
    title: 'Nothing repeats',
    body: 'Every run generates a new layout from scratch. No memorised routes, no solved-it-once shortcuts.',
  },
  {
    index: '02',
    image: '/TitleScreen.png',
    title: 'It watches you play',
    body: 'Clear puzzles quickly and it tightens the screws. Get stuck and it eases off. The difficulty meets you where you are.',
  },
  {
    index: '03',
    image: '/GameImage2.png',
    title: 'One more run',
    body: 'Every session ends with a score. Yours is the only one that matters, and it is always beatable.',
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
          {pillars.map((pillar) => (
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
              <Image
                src={pillar.image}
                alt={pillar.title}
                width="100%"
                aspectRatio={16 / 9}
                objectFit="cover"
              />

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