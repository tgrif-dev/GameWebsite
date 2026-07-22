import { Box, Heading, Text, SimpleGrid, Image, VStack, Container } from '@chakra-ui/react'
import { pageTopPadding, sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, labelStyles } from '../styles/section'

const facts = [
  { label: 'Engine', value: 'Unity' },
  { label: 'Platform', value: 'Windows' },
  { label: 'Players', value: 'Single player' },
  { label: 'Team', value: 'Five students' },
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

          <SimpleGrid columns={{ base: 1, md: 2 }} w="100%" gap={{ base: 10, md: 16 }}>
            <VStack align="start" gap={5}>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
                Lost Society is a puzzle game about picking through what a civilisation
                left behind. Each run drops you into a layout the game builds on the
                spot, so there is nothing to memorise and no route to reuse.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
                The difficulty is not fixed. Solve things quickly and the game raises
                the pressure. Stall on a puzzle and it quietly gives ground. The aim is
                a run that stays hard without becoming a wall.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
                Every run ends with a score. That number is the reason to start another
                one.
              </Text>
            </VStack>

            <Box textAlign="center">
              <Image
                src="InversionTitle.png"
                alt="Lost Society key art"
                objectFit="cover"
                border="1px solid"
                borderColor="hairline"
                borderRadius="sm"
                maxW={{ base: '100%', md: '420px' }}
                mx="auto"
              />
            </Box>
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
              Lost Society is built in Unity by a team of five as an eighteen month
              university project. The playable build is finished and we are working
              through the last round of polish and testing before release.
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